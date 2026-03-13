"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  HandCoins,
  ClipboardCheck,
  Building2,
  Users,
  BarChart3,
  ChevronLeft,
  Menu,
  LogOut,
  PackageCheck,
  X,
import { AppRole } from "@lib/supabase/database.types";
} from "lucide-react";
const sidebarSectionsByRole: Record<AppRole, Array<{ section: string; items: Array<{ label: string; href: string; icon: any }> }>> = {
  ADMIN: [
    {
      section: "Main",
      items: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Vehicles", href: "/dashboard/vehicles", icon: Car },
        { label: "Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
      ],
    },
    {
      section: "Requests",
      items: [
        { label: "Sell Requests", href: "/dashboard/sell-requests", icon: HandCoins },
        { label: "Orders", href: "/dashboard/orders", icon: PackageCheck },
        { label: "Inspections", href: "/dashboard/inspections", icon: ClipboardCheck },
      ],
    },
    {
      section: "Management",
      items: [
        { label: "Branches", href: "/dashboard/branches", icon: Building2 },
        { label: "Staff", href: "/dashboard/staff", icon: Users },
        { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
      ],
    },
  ],
  STAFF: [
    {
      section: "Main",
      items: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Vehicles", href: "/dashboard/vehicles", icon: Car },
        { label: "Inquiries", href: "/dashboard/inquiries", icon: MessageSquare },
      ],
    },
    {
      section: "Operations",
      items: [
        { label: "Sell Requests", href: "/dashboard/sell-requests", icon: HandCoins },
        { label: "Orders", href: "/dashboard/orders", icon: PackageCheck },
        { label: "Inspections", href: "/dashboard/inspections", icon: ClipboardCheck },
      ],
    },
  ],
  BUYER: [
    {
      section: "My Account",
      items: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "My Orders", href: "/dashboard/orders", icon: PackageCheck },
      ],
    },
  ],
  SELLER: [
    {
      section: "My Account",
      items: [
        { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { label: "Sell Requests", href: "/dashboard/sell-requests", icon: HandCoins },
      ],
    },
  ],
};

interface DashboardSidebarProps {
  role: AppRole;
  fullName: string | null;
}

export default function DashboardSidebar({ role, fullName }: DashboardSidebarProps) {
  const sidebarSections = sidebarSectionsByRole[role];
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className='lg:hidden fixed top-[78px] left-4 z-40 bg-white p-2 rounded-lg shadow-md border border-[var(--border-default)]'
        aria-label='Open sidebar'
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/40 z-40'
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          dashboard-sidebar
          ${collapsed ? "w-[72px]" : "w-[260px]"}
          transition-all duration-200
          fixed top-[68px] left-0 h-[calc(100vh-68px)] z-50
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className='flex flex-col h-full'>
          {/* Mobile close */}
          <div className='lg:hidden flex justify-end p-3'>
            <button onClick={() => setMobileOpen(false)} aria-label='Close sidebar'>
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className='flex-1 overflow-y-auto px-3 py-4 space-y-6'>
            <div className='px-3 pb-3 border-b border-[var(--border-default)]'>
              {!collapsed && (
                <>
                  <p className='text-xs uppercase tracking-wider text-text-brand-muted'>Signed in as</p>
                  <p className='text-sm font-semibold text-text-brand-primary mt-1'>{fullName || "User"}</p>
                  <p className='text-xs text-text-brand-muted mt-1'>{role}</p>
                </>
              )}
            </div>

            {sidebarSections.map((section) => (
              <div key={section.section}>
                {!collapsed && (
                  <p className='text-xs font-semibold text-text-brand-muted uppercase tracking-wider px-3 mb-2'>
                    {section.section}
                  </p>
                )}
                <ul className='space-y-1'>
                  {section.items.map((item) => {
                    const isActive = pathname === item.href ||
                      (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                            ${isActive
                              ? "bg-brand-accent text-white font-medium"
                              : "text-text-brand-secondary hover:bg-surface-muted"
                            }
                            ${collapsed ? "justify-center" : ""}
                          `}
                          title={collapsed ? item.label : undefined}
                        >
                          <item.icon size={18} className='flex-shrink-0' />
                          {!collapsed && <span>{item.label}</span>}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className='border-t border-[var(--border-default)] p-3 space-y-2'>
            {/* Collapse toggle - desktop only */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className='hidden lg:flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-text-brand-muted hover:bg-surface-muted transition-colors'
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft size={18} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
              {!collapsed && <span>Collapse</span>}
            </button>

            {/* Logout */}
            <form action='/auth/logout' method='post'>
              <button className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors ${collapsed ? "justify-center" : ""}`}>
                <LogOut size={18} />
                {!collapsed && <span>Logout</span>}
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
