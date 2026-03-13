"""
╔══════════════════════════════════════════════════════════╗
║         GIT AUTO-COMMIT WATCHER  v1.0                   ║
║         Watches files & auto-commits on every change    ║
║         Windows Compatible | Python 3.8+                ║
╚══════════════════════════════════════════════════════════╝

SETUP:
  1. pip install watchdog gitpython colorama
  2. Edit CONFIG section below
  3. Run: python auto_commit_watcher.py
  4. Optional: run as background service with pythonw auto_commit_watcher.py
"""

import os
import sys
import time
import subprocess
import hashlib
import logging
import argparse
from pathlib import Path
from datetime import datetime
from collections import defaultdict
from threading import Timer, Lock

# ── Try imports ──────────────────────────────────────────────────────────────
try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
except ImportError:
    print("[ERROR] Missing 'watchdog'. Run:  pip install watchdog")
    sys.exit(1)

try:
    from colorama import Fore, Style, init as colorama_init
    colorama_init(autoreset=True)
    HAS_COLOR = True
except ImportError:
    HAS_COLOR = False
    class Fore:
        GREEN = CYAN = YELLOW = RED = MAGENTA = WHITE = BLUE = ""
    class Style:
        BRIGHT = RESET_ALL = DIM = ""

# ╔══════════════════════════════════════════════════════════╗
# ║                      CONFIG                             ║
# ╚══════════════════════════════════════════════════════════╝
CONFIG = {
    # ── Path to your Git repo (use raw string or forward slashes) ──
    # Example: "C:/Users/YourName/Projects/MyProject"
    # Leave as "." to use the current directory
    "REPO_PATH": ".",

    # ── Seconds to wait after last change before committing ──
    # (debounce: avoids committing 50 times while saving)
    "DEBOUNCE_SECONDS": 5,

    # ── Auto-push to remote after every commit? ──
    "AUTO_PUSH": False,
    "PUSH_BRANCH": "main",         # branch to push to
    "PUSH_REMOTE": "origin",       # remote name

    # ── Commit message style ──
    # Options: "smart" | "timestamp" | "filelist"
    # smart     → "feat: update app.py, styles.css (+2 more)"
    # timestamp → "auto-commit: 2025-01-14 14:32:01"
    # filelist  → "changed: app.py | routes.py | models.py"
    "COMMIT_MESSAGE_STYLE": "smart",

    # ── File patterns to IGNORE (in addition to .gitignore) ──
    "IGNORE_PATTERNS": [
        "*.pyc", "__pycache__", ".git", "*.log",
        "*.tmp", "*.swp", "*.swo", "~*",
        "node_modules", ".env", "*.db",
        "Thumbs.db", "desktop.ini", ".DS_Store",
        "*.egg-info", "dist/", "build/", ".venv",
    ],

    # ── Only watch these extensions (empty = watch ALL) ──
    # Example: [".py", ".js", ".html", ".css", ".ts"]
    "WATCH_EXTENSIONS": [],

    # ── Log file path (set to "" to disable file logging) ──
    "LOG_FILE": "auto_commit.log",

    # ── Show desktop notification on commit? (Windows) ──
    "DESKTOP_NOTIFY": True,

    # ── Minimum file size change to trigger commit (bytes) ──
    # 0 = commit on ANY change including single character
    "MIN_CHANGE_BYTES": 0,
}
# ╚══════════════════════════════════════════════════════════╝


# ── Logging Setup ─────────────────────────────────────────────────────────────
def setup_logging(log_file: str) -> logging.Logger:
    logger = logging.getLogger("AutoCommit")
    logger.setLevel(logging.DEBUG)
    fmt = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s", "%Y-%m-%d %H:%M:%S")

    ch = logging.StreamHandler()
    ch.setLevel(logging.DEBUG)
    ch.setFormatter(fmt)
    logger.addHandler(ch)

    if log_file:
        fh = logging.FileHandler(log_file, encoding="utf-8")
        fh.setLevel(logging.INFO)
        fh.setFormatter(fmt)
        logger.addHandler(fh)

    return logger


logger = setup_logging(CONFIG["LOG_FILE"])


# ── Helpers ───────────────────────────────────────────────────────────────────
def banner():
    print(f"""
{Fore.CYAN}{Style.BRIGHT}
  ╔═══════════════════════════════════════════════╗
  ║   🔄  GIT AUTO-COMMIT WATCHER  v1.0          ║
  ║   Watching your files — committing changes   ║
  ╚═══════════════════════════════════════════════╝
{Style.RESET_ALL}""")


def should_ignore(path: str, patterns: list) -> bool:
    """Check if a file path matches any ignore pattern."""
    import fnmatch
    path_obj = Path(path)
    name = path_obj.name

    for pattern in patterns:
        # Check full path and filename
        if fnmatch.fnmatch(name, pattern):
            return True
        if fnmatch.fnmatch(str(path_obj), pattern):
            return True
        # Check if any parent folder matches
        for part in path_obj.parts:
            if fnmatch.fnmatch(part, pattern):
                return True
    return False


def has_watched_extension(path: str, extensions: list) -> bool:
    """If extensions list is empty, watch all. Otherwise filter."""
    if not extensions:
        return True
    return Path(path).suffix.lower() in [e.lower() for e in extensions]


def git_run(args: list, cwd: str) -> tuple:
    """Run a git command. Returns (stdout, stderr, returncode)."""
    try:
        result = subprocess.run(
            ["git"] + args,
            cwd=cwd,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace"
        )
        return result.stdout.strip(), result.stderr.strip(), result.returncode
    except FileNotFoundError:
        return "", "Git not found. Is Git installed and in PATH?", 1
    except Exception as e:
        return "", str(e), 1


def is_git_repo(path: str) -> bool:
    _, _, code = git_run(["rev-parse", "--is-inside-work-tree"], path)
    return code == 0


def get_staged_files(repo_path: str) -> list:
    stdout, _, _ = git_run(["diff", "--cached", "--name-only"], repo_path)
    return [f for f in stdout.splitlines() if f]


def get_changed_files(repo_path: str) -> list:
    stdout, _, _ = git_run(["status", "--porcelain"], repo_path)
    files = []
    for line in stdout.splitlines():
        if line.strip():
            # Status format: "XY filename"
            files.append(line[3:].strip())
    return files


def build_commit_message(changed_files: list, style: str) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    if style == "timestamp":
        return f"auto-commit: {now}"

    if style == "filelist":
        names = [Path(f).name for f in changed_files[:8]]
        msg = " | ".join(names)
        if len(changed_files) > 8:
            msg += f" (+{len(changed_files) - 8} more)"
        return f"changed: {msg}"

    # "smart" style — detect change type
    if style == "smart":
        exts = [Path(f).suffix.lower() for f in changed_files]
        names = [Path(f).name for f in changed_files]

        # Detect type prefix
        if any(e in [".py"] for e in exts):
            prefix = "feat"
        elif any(e in [".css", ".scss", ".sass"] for e in exts):
            prefix = "style"
        elif any(e in [".md", ".txt", ".rst"] for e in exts):
            prefix = "docs"
        elif any(e in [".json", ".yaml", ".yml", ".toml", ".ini", ".env"] for e in exts):
            prefix = "config"
        elif any(e in [".html", ".jsx", ".tsx", ".vue"] for e in exts):
            prefix = "ui"
        elif any(e in [".test.py", ".spec.js", "_test.go"] for e in [f.lower() for f in names]):
            prefix = "test"
        else:
            prefix = "update"

        primary = names[:2]
        label = ", ".join(primary)
        extra = len(changed_files) - len(primary)
        if extra > 0:
            label += f" (+{extra} more)"

        return f"{prefix}: {label} [{now}]"

    return f"auto-commit: {now}"


def notify_windows(title: str, message: str):
    """Show a Windows toast notification (no extra libs needed)."""
    try:
        script = f"""
        Add-Type -AssemblyName System.Windows.Forms
        $notify = New-Object System.Windows.Forms.NotifyIcon
        $notify.Icon = [System.Drawing.SystemIcons]::Information
        $notify.Visible = $true
        $notify.ShowBalloonTip(3000, '{title}', '{message}', [System.Windows.Forms.ToolTipIcon]::Info)
        Start-Sleep -Seconds 4
        $notify.Dispose()
        """
        subprocess.Popen(
            ["powershell", "-WindowStyle", "Hidden", "-Command", script],
            creationflags=subprocess.CREATE_NO_WINDOW if hasattr(subprocess, 'CREATE_NO_WINDOW') else 0
        )
    except Exception:
        pass  # Notifications are optional, never crash


# ── Auto Committer ────────────────────────────────────────────────────────────
class AutoCommitter:
    def __init__(self, config: dict):
        self.repo_path = str(Path(config["REPO_PATH"]).resolve())
        self.debounce  = config["DEBOUNCE_SECONDS"]
        self.auto_push = config["AUTO_PUSH"]
        self.push_branch = config["PUSH_BRANCH"]
        self.push_remote = config["PUSH_REMOTE"]
        self.msg_style = config["COMMIT_MESSAGE_STYLE"]
        self.notify    = config["DESKTOP_NOTIFY"]

        self._timer: Timer | None = None
        self._lock  = Lock()
        self._pending_files: set = set()
        self.commit_count = 0

    def schedule(self, filepath: str):
        """Called on every file change. Debounces then commits."""
        with self._lock:
            self._pending_files.add(filepath)
            if self._timer:
                self._timer.cancel()
            self._timer = Timer(self.debounce, self._do_commit)
            self._timer.daemon = True
            self._timer.start()

        rel = os.path.relpath(filepath, self.repo_path)
        print(f"  {Fore.YELLOW}⏳ Queued:{Style.RESET_ALL} {rel}  "
              f"{Fore.WHITE}{Style.DIM}(committing in {self.debounce}s){Style.RESET_ALL}")

    def _do_commit(self):
        with self._lock:
            pending = list(self._pending_files)
            self._pending_files.clear()

        try:
            # 1. git add -A
            _, err, code = git_run(["add", "-A"], self.repo_path)
            if code != 0:
                logger.error(f"git add failed: {err}")
                return

            # 2. Check if there's actually something staged
            changed = get_changed_files(self.repo_path)
            staged  = get_staged_files(self.repo_path)

            if not staged:
                print(f"  {Fore.WHITE}{Style.DIM}↩  Nothing new to commit (files may be ignored){Style.RESET_ALL}")
                return

            # 3. Build commit message
            msg = build_commit_message(pending or staged, self.msg_style)

            # 4. git commit
            _, err, code = git_run(["commit", "-m", msg], self.repo_path)
            if code != 0:
                if "nothing to commit" in err.lower():
                    print(f"  {Fore.WHITE}{Style.DIM}↩  Nothing to commit{Style.RESET_ALL}")
                else:
                    logger.error(f"git commit failed: {err}")
                return

            self.commit_count += 1
            ts = datetime.now().strftime("%H:%M:%S")

            print(f"\n  {Fore.GREEN}{Style.BRIGHT}✅ COMMITTED #{self.commit_count}{Style.RESET_ALL}  "
                  f"{Fore.WHITE}[{ts}]{Style.RESET_ALL}")
            print(f"  {Fore.CYAN}📝 {msg}{Style.RESET_ALL}")
            print(f"  {Fore.WHITE}{Style.DIM}Files: {', '.join([Path(f).name for f in staged[:5]])}"
                  f"{'...' if len(staged) > 5 else ''}{Style.RESET_ALL}\n")

            logger.info(f"Committed #{self.commit_count}: {msg} | Files: {staged}")

            # 5. Optional push
            if self.auto_push:
                self._push()

            # 6. Desktop notification
            if self.notify:
                files_str = ", ".join([Path(f).name for f in staged[:3]])
                notify_windows("GeoClass AutoCommit ✅", f"Committed: {files_str}")

        except Exception as e:
            logger.error(f"Unexpected commit error: {e}")

    def _push(self):
        print(f"  {Fore.MAGENTA}🚀 Pushing to {self.push_remote}/{self.push_branch}...{Style.RESET_ALL}")
        stdout, err, code = git_run(
            ["push", self.push_remote, self.push_branch], self.repo_path
        )
        if code == 0:
            print(f"  {Fore.GREEN}✅ Pushed successfully{Style.RESET_ALL}")
            logger.info(f"Pushed to {self.push_remote}/{self.push_branch}")
        else:
            print(f"  {Fore.RED}❌ Push failed: {err}{Style.RESET_ALL}")
            logger.error(f"Push failed: {err}")


# ── File System Event Handler ─────────────────────────────────────────────────
class ChangeHandler(FileSystemEventHandler):
    def __init__(self, committer: AutoCommitter, config: dict):
        self.committer   = committer
        self.ignore      = config["IGNORE_PATTERNS"]
        self.extensions  = config["WATCH_EXTENSIONS"]
        self.repo_path   = committer.repo_path

    def _should_process(self, path: str) -> bool:
        if should_ignore(path, self.ignore):
            return False
        if not has_watched_extension(path, self.extensions):
            return False
        return True

    def on_modified(self, event):
        if not event.is_directory and self._should_process(event.src_path):
            rel = os.path.relpath(event.src_path, self.repo_path)
            print(f"  {Fore.BLUE}✏️  Modified:{Style.RESET_ALL} {rel}")
            self.committer.schedule(event.src_path)

    def on_created(self, event):
        if not event.is_directory and self._should_process(event.src_path):
            rel = os.path.relpath(event.src_path, self.repo_path)
            print(f"  {Fore.GREEN}➕ Created: {Style.RESET_ALL} {rel}")
            self.committer.schedule(event.src_path)

    def on_deleted(self, event):
        if not event.is_directory and self._should_process(event.src_path):
            rel = os.path.relpath(event.src_path, self.repo_path)
            print(f"  {Fore.RED}🗑️  Deleted: {Style.RESET_ALL} {rel}")
            self.committer.schedule(event.src_path)

    def on_moved(self, event):
        if not event.is_directory and self._should_process(event.dest_path):
            src = os.path.relpath(event.src_path, self.repo_path)
            dst = os.path.relpath(event.dest_path, self.repo_path)
            print(f"  {Fore.YELLOW}📦 Renamed: {Style.RESET_ALL} {src} → {dst}")
            self.committer.schedule(event.dest_path)


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Git Auto-Commit File Watcher")
    parser.add_argument("--path",    type=str, help="Path to git repo (overrides CONFIG)")
    parser.add_argument("--push",    action="store_true", help="Enable auto-push")
    parser.add_argument("--delay",   type=int, help="Debounce delay in seconds")
    parser.add_argument("--style",   type=str, choices=["smart","timestamp","filelist"],
                        help="Commit message style")
    args = parser.parse_args()

    # Override config with CLI args
    if args.path:   CONFIG["REPO_PATH"]           = args.path
    if args.push:   CONFIG["AUTO_PUSH"]            = True
    if args.delay:  CONFIG["DEBOUNCE_SECONDS"]     = args.delay
    if args.style:  CONFIG["COMMIT_MESSAGE_STYLE"] = args.style

    banner()

    repo_path = str(Path(CONFIG["REPO_PATH"]).resolve())

    # Validate repo
    if not os.path.isdir(repo_path):
        print(f"{Fore.RED}❌ Directory not found: {repo_path}{Style.RESET_ALL}")
        sys.exit(1)

    if not is_git_repo(repo_path):
        print(f"{Fore.RED}❌ Not a Git repository: {repo_path}{Style.RESET_ALL}")
        print(f"{Fore.YELLOW}   Run 'git init' in that folder first.{Style.RESET_ALL}")
        sys.exit(1)

    # Check git user config
    name,  _, _ = git_run(["config", "user.name"],  repo_path)
    email, _, _ = git_run(["config", "user.email"], repo_path)
    if not name or not email:
        print(f"{Fore.YELLOW}⚠️  Git user not configured. Run:{Style.RESET_ALL}")
        print(f"   git config --global user.name  \"Your Name\"")
        print(f"   git config --global user.email \"you@email.com\"")
        sys.exit(1)

    print(f"  {Fore.GREEN}📁 Watching:{Style.RESET_ALL}  {repo_path}")
    print(f"  {Fore.GREEN}👤 Git user:{Style.RESET_ALL}  {name} <{email}>")
    print(f"  {Fore.GREEN}⏱️  Debounce:{Style.RESET_ALL}  {CONFIG['DEBOUNCE_SECONDS']}s after last change")
    print(f"  {Fore.GREEN}💬 Msg style:{Style.RESET_ALL} {CONFIG['COMMIT_MESSAGE_STYLE']}")
    print(f"  {Fore.GREEN}🚀 Auto-push:{Style.RESET_ALL} {'Yes → ' + CONFIG['PUSH_REMOTE'] + '/' + CONFIG['PUSH_BRANCH'] if CONFIG['AUTO_PUSH'] else 'No'}")

    if CONFIG["WATCH_EXTENSIONS"]:
        print(f"  {Fore.GREEN}📎 Extensions:{Style.RESET_ALL} {', '.join(CONFIG['WATCH_EXTENSIONS'])}")
    else:
        print(f"  {Fore.GREEN}📎 Extensions:{Style.RESET_ALL} All files")

    print(f"\n  {Fore.CYAN}{Style.BRIGHT}👁️  Watcher is ACTIVE — Edit any file to auto-commit{Style.RESET_ALL}")
    print(f"  {Fore.WHITE}{Style.DIM}Press Ctrl+C to stop{Style.RESET_ALL}\n")
    print("  " + "─" * 52)

    committer = AutoCommitter(CONFIG)
    handler   = ChangeHandler(committer, CONFIG)
    observer  = Observer()
    observer.schedule(handler, repo_path, recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print(f"\n\n  {Fore.YELLOW}👋 Watcher stopped.{Style.RESET_ALL}")
        print(f"  {Fore.CYAN}📊 Total commits made this session: {committer.commit_count}{Style.RESET_ALL}\n")

    observer.join()


if __name__ == "__main__":
    main()
