import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router";
import {
  LayoutDashboard,
  Database,
  FolderTree,
  Globe,
  CreditCard,
  Server,
  BarChart3,
  Menu,
  X,
  Zap,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { path: "/", label: "Architecture", icon: LayoutDashboard, color: "#6366f1" },
  { path: "/schema", label: "Database Schema", icon: Database, color: "#8b5cf6" },
  { path: "/structure", label: "Folder Structure", icon: FolderTree, color: "#a855f7" },
  { path: "/api", label: "REST API", icon: Globe, color: "#d946ef" },
  { path: "/billing", label: "Billing Flow", icon: CreditCard, color: "#ec4899" },
  { path: "/scaling", label: "Scaling Strategy", icon: Server, color: "#f43f5e" },
  { path: "/dashboard", label: "Admin Dashboard", icon: BarChart3, color: "#f97316" },
];

export function Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0f0f18] border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white tracking-tight">SchedulePro</h1>
              <p className="text-[11px] text-white/40 tracking-widest uppercase">Architecture</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 relative ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                <item.icon
                  className="w-[18px] h-[18px] shrink-0"
                  style={{ color: isActive ? item.color : undefined }}
                />
                <span className="flex-1">{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-white/30" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4">
            <p className="text-xs text-indigo-300/80">Tech Stack</p>
            <p className="text-[11px] text-white/40 mt-1">
              Next.js · NestJS · PostgreSQL · Redis · Docker
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-4 px-6 py-4 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-sm lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-white/60 hover:text-white">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="text-sm text-white/60">SchedulePro Architecture</span>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
