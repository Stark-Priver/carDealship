# 🔄 Git Auto-Commit Watcher

Automatically watches your project files and commits every change to Git — no manual `git add` or `git commit` needed.

---

## ⚡ Quick Start (Windows)

### Step 1 — Install Python dependencies
Open CMD or PowerShell in this folder and run:
```
pip install watchdog colorama
```

### Step 2 — Configure the script
Open `auto_commit_watcher.py` in any editor and find the **CONFIG** section at the top:

```python
CONFIG = {
    "REPO_PATH": ".",          # ← Change to your project folder path
    "DEBOUNCE_SECONDS": 5,     # ← Wait 5s after last change before committing
    "AUTO_PUSH": False,        # ← Set True to auto-push to GitHub
    "PUSH_BRANCH": "main",     # ← Your branch name
    "PUSH_REMOTE": "origin",   # ← Your remote name
    "COMMIT_MESSAGE_STYLE": "smart",  # smart | timestamp | filelist
}
```

### Step 3 — Run it

**Option A: Double-click** `START_WATCHER.bat`

**Option B: Command line**
```
python auto_commit_watcher.py
```

**Option C: Watch a specific folder**
```
python auto_commit_watcher.py --path "C:/Users/You/Projects/GeoClass"
```

**Option D: Run silently in background** (no window)
```
pythonw auto_commit_watcher.py
```

---

## 🎛️ Command Line Options

| Flag | Description | Example |
|------|-------------|---------|
| `--path` | Path to your git repo | `--path "C:/Projects/App"` |
| `--push` | Enable auto-push | `--push` |
| `--delay` | Debounce seconds | `--delay 10` |
| `--style` | Commit message style | `--style timestamp` |

---

## 💬 Commit Message Styles

| Style | Example Output |
|-------|----------------|
| `smart` | `feat: app.py, routes.py (+1 more) [2025-01-14 14:32]` |
| `timestamp` | `auto-commit: 2025-01-14 14:32:01` |
| `filelist` | `changed: app.py \| models.py \| styles.css` |

---

## 🔕 Ignoring Files

By default it ignores: `*.pyc`, `__pycache__`, `.git`, `node_modules`, `.env`, `*.log`, etc.

To add more, edit `IGNORE_PATTERNS` in CONFIG:
```python
"IGNORE_PATTERNS": [
    "*.pyc", "__pycache__", ".git",
    "my_secret_folder",   # ← add yours here
],
```

Or just add them to your `.gitignore` — the watcher respects it.

---

## 🚀 Auto-Push to GitHub

To push every commit automatically to GitHub:
```python
"AUTO_PUSH": True,
"PUSH_BRANCH": "main",
"PUSH_REMOTE": "origin",
```

Make sure you have SSH or HTTPS credentials saved so Git doesn't ask for a password.

---

## 🪟 Run on Windows Startup (Optional)

1. Press `Win + R` → type `shell:startup` → Enter
2. Create a shortcut to `START_WATCHER.bat` in that folder
3. Now it runs automatically every time you start Windows

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| `Git not found` | Install Git from https://git-scm.com |
| `Not a git repository` | Run `git init` in your project folder first |
| `Git user not configured` | Run `git config --global user.name "Name"` and `git config --global user.email "email"` |
| `Nothing to commit` | File might be in `.gitignore` or `IGNORE_PATTERNS` |
| `Push failed` | Check your GitHub credentials / internet connection |

---

## 📋 Requirements

- Python 3.8+
- Git installed and in PATH
- `watchdog` package  (`pip install watchdog`)
- `colorama` package  (`pip install colorama`) — optional, for colors
