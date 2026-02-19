import { useState } from "react";
import { motion } from "motion/react";
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  ChevronRight,
  ChevronDown,
  Monitor,
  Server,
} from "lucide-react";

interface TreeNode {
  name: string;
  type: "file" | "folder";
  description?: string;
  children?: TreeNode[];
  ext?: string;
}

const frontendTree: TreeNode = {
  name: "schedule-planner-web/",
  type: "folder",
  description: "Next.js 14 frontend application",
  children: [
    {
      name: "src/",
      type: "folder",
      children: [
        {
          name: "app/",
          type: "folder",
          description: "App Router pages & layouts",
          children: [
            { name: "(auth)/", type: "folder", description: "Auth route group", children: [
              { name: "login/page.tsx", type: "file", ext: "tsx" },
              { name: "register/page.tsx", type: "file", ext: "tsx" },
              { name: "forgot-password/page.tsx", type: "file", ext: "tsx" },
            ]},
            { name: "(dashboard)/", type: "folder", description: "Protected dashboard routes", children: [
              { name: "layout.tsx", type: "file", ext: "tsx", description: "Dashboard shell with sidebar" },
              { name: "[workspaceSlug]/", type: "folder", description: "Workspace-scoped routes", children: [
                { name: "page.tsx", type: "file", ext: "tsx", description: "Workspace overview" },
                { name: "calendar/", type: "folder", children: [
                  { name: "page.tsx", type: "file", ext: "tsx", description: "Calendar views (day/week/month)" },
                ]},
                { name: "tasks/", type: "folder", children: [
                  { name: "page.tsx", type: "file", ext: "tsx", description: "Task list view" },
                  { name: "[taskId]/page.tsx", type: "file", ext: "tsx", description: "Task detail" },
                ]},
                { name: "team/", type: "folder", children: [
                  { name: "page.tsx", type: "file", ext: "tsx", description: "Team management" },
                  { name: "invite/page.tsx", type: "file", ext: "tsx" },
                ]},
                { name: "settings/", type: "folder", children: [
                  { name: "page.tsx", type: "file", ext: "tsx", description: "Workspace settings" },
                  { name: "billing/page.tsx", type: "file", ext: "tsx", description: "Subscription management" },
                ]},
              ]},
            ]},
            { name: "admin/", type: "folder", description: "Platform admin dashboard", children: [
              { name: "page.tsx", type: "file", ext: "tsx", description: "MRR, churn, users" },
              { name: "workspaces/page.tsx", type: "file", ext: "tsx" },
              { name: "billing/page.tsx", type: "file", ext: "tsx" },
            ]},
            { name: "api/", type: "folder", description: "Next.js API routes (BFF)", children: [
              { name: "webhooks/stripe/route.ts", type: "file", ext: "ts" },
            ]},
            { name: "layout.tsx", type: "file", ext: "tsx", description: "Root layout" },
            { name: "page.tsx", type: "file", ext: "tsx", description: "Landing page" },
          ],
        },
        {
          name: "components/",
          type: "folder",
          description: "Reusable UI components",
          children: [
            { name: "ui/", type: "folder", description: "Base UI primitives (shadcn/ui)", children: [
              { name: "button.tsx", type: "file", ext: "tsx" },
              { name: "dialog.tsx", type: "file", ext: "tsx" },
              { name: "dropdown-menu.tsx", type: "file", ext: "tsx" },
              { name: "calendar.tsx", type: "file", ext: "tsx" },
              { name: "...", type: "file", ext: "", description: "40+ components" },
            ]},
            { name: "calendar/", type: "folder", description: "Calendar-specific components", children: [
              { name: "DayView.tsx", type: "file", ext: "tsx" },
              { name: "WeekView.tsx", type: "file", ext: "tsx" },
              { name: "MonthView.tsx", type: "file", ext: "tsx" },
              { name: "EventCard.tsx", type: "file", ext: "tsx" },
              { name: "DragOverlay.tsx", type: "file", ext: "tsx" },
              { name: "RecurrenceDialog.tsx", type: "file", ext: "tsx" },
            ]},
            { name: "workspace/", type: "folder", children: [
              { name: "WorkspaceSwitcher.tsx", type: "file", ext: "tsx" },
              { name: "MemberList.tsx", type: "file", ext: "tsx" },
              { name: "InviteModal.tsx", type: "file", ext: "tsx" },
            ]},
            { name: "billing/", type: "folder", children: [
              { name: "PlanCard.tsx", type: "file", ext: "tsx" },
              { name: "UpgradeModal.tsx", type: "file", ext: "tsx" },
              { name: "InvoiceTable.tsx", type: "file", ext: "tsx" },
            ]},
          ],
        },
        {
          name: "hooks/",
          type: "folder",
          description: "Custom React hooks",
          children: [
            { name: "useAuth.ts", type: "file", ext: "ts" },
            { name: "useWorkspace.ts", type: "file", ext: "ts" },
            { name: "useCalendar.ts", type: "file", ext: "ts" },
            { name: "useTasks.ts", type: "file", ext: "ts" },
            { name: "useRealtime.ts", type: "file", ext: "ts" },
            { name: "useFeatureGate.ts", type: "file", ext: "ts" },
            { name: "useSubscription.ts", type: "file", ext: "ts" },
          ],
        },
        {
          name: "lib/",
          type: "folder",
          children: [
            { name: "api.ts", type: "file", ext: "ts", description: "Axios instance + interceptors" },
            { name: "socket.ts", type: "file", ext: "ts", description: "Socket.io client setup" },
            { name: "stripe.ts", type: "file", ext: "ts", description: "Stripe.js client" },
            { name: "utils.ts", type: "file", ext: "ts" },
            { name: "constants.ts", type: "file", ext: "ts" },
          ],
        },
        {
          name: "stores/",
          type: "folder",
          description: "Zustand state stores",
          children: [
            { name: "authStore.ts", type: "file", ext: "ts" },
            { name: "workspaceStore.ts", type: "file", ext: "ts" },
            { name: "calendarStore.ts", type: "file", ext: "ts" },
            { name: "uiStore.ts", type: "file", ext: "ts" },
          ],
        },
        {
          name: "types/",
          type: "folder",
          children: [
            { name: "index.ts", type: "file", ext: "ts" },
            { name: "api.ts", type: "file", ext: "ts" },
            { name: "calendar.ts", type: "file", ext: "ts" },
            { name: "billing.ts", type: "file", ext: "ts" },
          ],
        },
      ],
    },
    { name: "public/", type: "folder", children: [
      { name: "assets/", type: "folder" },
    ]},
    { name: "prisma/", type: "folder", description: "Shared Prisma schema (monorepo)", children: [] },
    { name: ".env.local", type: "file", ext: "env" },
    { name: "next.config.js", type: "file", ext: "js" },
    { name: "tailwind.config.ts", type: "file", ext: "ts" },
    { name: "tsconfig.json", type: "file", ext: "json" },
    { name: "Dockerfile", type: "file", ext: "docker" },
  ],
};

const backendTree: TreeNode = {
  name: "schedule-planner-api/",
  type: "folder",
  description: "NestJS backend application",
  children: [
    {
      name: "src/",
      type: "folder",
      children: [
        {
          name: "modules/",
          type: "folder",
          description: "Feature modules (NestJS pattern)",
          children: [
            { name: "auth/", type: "folder", description: "Authentication & authorization", children: [
              { name: "auth.module.ts", type: "file", ext: "ts" },
              { name: "auth.controller.ts", type: "file", ext: "ts" },
              { name: "auth.service.ts", type: "file", ext: "ts" },
              { name: "strategies/", type: "folder", children: [
                { name: "jwt.strategy.ts", type: "file", ext: "ts" },
                { name: "google.strategy.ts", type: "file", ext: "ts" },
                { name: "github.strategy.ts", type: "file", ext: "ts" },
              ]},
              { name: "guards/", type: "folder", children: [
                { name: "jwt-auth.guard.ts", type: "file", ext: "ts" },
                { name: "roles.guard.ts", type: "file", ext: "ts" },
                { name: "tenant.guard.ts", type: "file", ext: "ts" },
                { name: "feature-gate.guard.ts", type: "file", ext: "ts" },
              ]},
              { name: "decorators/", type: "folder", children: [
                { name: "roles.decorator.ts", type: "file", ext: "ts" },
                { name: "current-user.decorator.ts", type: "file", ext: "ts" },
                { name: "current-workspace.decorator.ts", type: "file", ext: "ts" },
              ]},
              { name: "dto/", type: "folder", children: [
                { name: "login.dto.ts", type: "file", ext: "ts" },
                { name: "register.dto.ts", type: "file", ext: "ts" },
              ]},
            ]},
            { name: "workspaces/", type: "folder", description: "Multi-tenant workspace management", children: [
              { name: "workspaces.module.ts", type: "file", ext: "ts" },
              { name: "workspaces.controller.ts", type: "file", ext: "ts" },
              { name: "workspaces.service.ts", type: "file", ext: "ts" },
              { name: "members.controller.ts", type: "file", ext: "ts" },
              { name: "members.service.ts", type: "file", ext: "ts" },
              { name: "dto/", type: "folder", children: [] },
            ]},
            { name: "schedules/", type: "folder", description: "Calendar & task management", children: [
              { name: "schedules.module.ts", type: "file", ext: "ts" },
              { name: "schedules.controller.ts", type: "file", ext: "ts" },
              { name: "schedules.service.ts", type: "file", ext: "ts" },
              { name: "tasks.controller.ts", type: "file", ext: "ts" },
              { name: "tasks.service.ts", type: "file", ext: "ts" },
              { name: "recurrence.service.ts", type: "file", ext: "ts" },
              { name: "dto/", type: "folder", children: [] },
            ]},
            { name: "billing/", type: "folder", description: "Stripe integration & subscription management", children: [
              { name: "billing.module.ts", type: "file", ext: "ts" },
              { name: "billing.controller.ts", type: "file", ext: "ts" },
              { name: "billing.service.ts", type: "file", ext: "ts" },
              { name: "stripe-webhook.controller.ts", type: "file", ext: "ts" },
              { name: "plans.config.ts", type: "file", ext: "ts" },
              { name: "dto/", type: "folder", children: [] },
            ]},
            { name: "notifications/", type: "folder", children: [
              { name: "notifications.module.ts", type: "file", ext: "ts" },
              { name: "notifications.service.ts", type: "file", ext: "ts" },
              { name: "notifications.gateway.ts", type: "file", ext: "ts", description: "WebSocket gateway" },
              { name: "email.service.ts", type: "file", ext: "ts" },
            ]},
            { name: "admin/", type: "folder", description: "Platform admin analytics", children: [
              { name: "admin.module.ts", type: "file", ext: "ts" },
              { name: "admin.controller.ts", type: "file", ext: "ts" },
              { name: "admin.service.ts", type: "file", ext: "ts" },
              { name: "analytics.service.ts", type: "file", ext: "ts" },
            ]},
          ],
        },
        {
          name: "common/",
          type: "folder",
          description: "Shared utilities & middleware",
          children: [
            { name: "filters/", type: "folder", children: [
              { name: "http-exception.filter.ts", type: "file", ext: "ts" },
            ]},
            { name: "interceptors/", type: "folder", children: [
              { name: "transform.interceptor.ts", type: "file", ext: "ts" },
              { name: "logging.interceptor.ts", type: "file", ext: "ts" },
            ]},
            { name: "middleware/", type: "folder", children: [
              { name: "tenant-context.middleware.ts", type: "file", ext: "ts" },
              { name: "rate-limit.middleware.ts", type: "file", ext: "ts" },
            ]},
            { name: "pipes/", type: "folder", children: [
              { name: "validation.pipe.ts", type: "file", ext: "ts" },
            ]},
          ],
        },
        {
          name: "prisma/",
          type: "folder",
          children: [
            { name: "prisma.module.ts", type: "file", ext: "ts" },
            { name: "prisma.service.ts", type: "file", ext: "ts", description: "Prisma client with tenant middleware" },
            { name: "schema.prisma", type: "file", ext: "prisma" },
            { name: "migrations/", type: "folder" },
            { name: "seed.ts", type: "file", ext: "ts" },
          ],
        },
        { name: "config/", type: "folder", children: [
          { name: "app.config.ts", type: "file", ext: "ts" },
          { name: "database.config.ts", type: "file", ext: "ts" },
          { name: "redis.config.ts", type: "file", ext: "ts" },
          { name: "stripe.config.ts", type: "file", ext: "ts" },
          { name: "jwt.config.ts", type: "file", ext: "ts" },
        ]},
        { name: "main.ts", type: "file", ext: "ts", description: "Application bootstrap" },
        { name: "app.module.ts", type: "file", ext: "ts", description: "Root module" },
      ],
    },
    { name: ".env", type: "file", ext: "env" },
    { name: "nest-cli.json", type: "file", ext: "json" },
    { name: "tsconfig.json", type: "file", ext: "json" },
    { name: "Dockerfile", type: "file", ext: "docker" },
    { name: "docker-compose.yml", type: "file", ext: "yml", description: "Dev environment" },
    { name: "docker-compose.prod.yml", type: "file", ext: "yml", description: "Production stack" },
  ],
};

function getFileColor(ext?: string): string {
  const colors: Record<string, string> = {
    tsx: "#61dafb",
    ts: "#3178c6",
    js: "#f7df1e",
    json: "#5b5b5b",
    prisma: "#2d3748",
    env: "#eab308",
    docker: "#2496ed",
    yml: "#cb171e",
    "": "#ffffff",
  };
  return colors[ext || ""] || "#ffffff";
}

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const isFolder = node.type === "folder";

  return (
    <div>
      <button
        onClick={() => isFolder && setExpanded(!expanded)}
        className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-left hover:bg-white/5 transition-colors group ${
          isFolder ? "cursor-pointer" : "cursor-default"
        }`}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
      >
        {isFolder ? (
          <>
            {expanded ? (
              <ChevronDown className="w-3 h-3 text-white/20 shrink-0" />
            ) : (
              <ChevronRight className="w-3 h-3 text-white/20 shrink-0" />
            )}
            {expanded ? (
              <FolderOpen className="w-4 h-4 text-amber-400/70 shrink-0" />
            ) : (
              <Folder className="w-4 h-4 text-amber-400/50 shrink-0" />
            )}
          </>
        ) : (
          <>
            <div className="w-3" />
            {node.ext === "docker" || node.ext === "yml" ? (
              <FileText
                className="w-4 h-4 shrink-0"
                style={{ color: getFileColor(node.ext) }}
              />
            ) : (
              <FileCode
                className="w-4 h-4 shrink-0"
                style={{ color: getFileColor(node.ext) + "80" }}
              />
            )}
          </>
        )}
        <span className="text-xs font-mono text-white/70 group-hover:text-white/90 transition-colors">
          {node.name}
        </span>
        {node.description && (
          <span className="text-[10px] text-white/20 ml-2 hidden sm:inline">
            — {node.description}
          </span>
        )}
      </button>
      {isFolder && expanded && node.children && (
        <div>
          {node.children.map((child, i) => (
            <TreeItem key={child.name + i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FolderStructure() {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend">("frontend");

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-fuchsia-400 text-xs tracking-widest uppercase mb-2">
          <div className="w-2 h-2 rounded-full bg-fuchsia-400" />
          Project Structure
        </div>
        <h1 className="text-3xl lg:text-4xl text-white tracking-tight">
          Folder Structure
        </h1>
        <p className="text-white/40 mt-2 max-w-2xl">
          Monorepo-ready architecture with feature-based module organization.
          Frontend uses Next.js App Router with route groups. Backend follows NestJS module pattern.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("frontend")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
            activeTab === "frontend"
              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              : "text-white/40 hover:text-white/60 border border-transparent"
          }`}
        >
          <Monitor className="w-4 h-4" />
          Frontend (Next.js)
        </button>
        <button
          onClick={() => setActiveTab("backend")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
            activeTab === "backend"
              ? "bg-red-500/10 text-red-400 border border-red-500/20"
              : "text-white/40 hover:text-white/60 border border-transparent"
          }`}
        >
          <Server className="w-4 h-4" />
          Backend (NestJS)
        </button>
      </div>

      {/* Tree */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/[0.02] border border-white/5 rounded-2xl p-4"
      >
        <TreeItem node={activeTab === "frontend" ? frontendTree : backendTree} />
      </motion.div>

      {/* Key conventions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h3 className="text-white text-sm mb-3">Frontend Conventions</h3>
          <ul className="space-y-2 text-xs text-white/40">
            <li className="flex gap-2">
              <span className="text-blue-400">▸</span>
              Route groups <code className="text-white/60">(auth)</code>, <code className="text-white/60">(dashboard)</code> for layout separation
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">▸</span>
              Dynamic workspace slug <code className="text-white/60">[workspaceSlug]</code> for multi-tenancy
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">▸</span>
              Barrel exports from <code className="text-white/60">components/</code> for clean imports
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400">▸</span>
              Feature-based hook organization (useCalendar, useTasks, etc.)
            </li>
          </ul>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h3 className="text-white text-sm mb-3">Backend Conventions</h3>
          <ul className="space-y-2 text-xs text-white/40">
            <li className="flex gap-2">
              <span className="text-red-400">▸</span>
              NestJS module pattern: <code className="text-white/60">module → controller → service</code>
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">▸</span>
              Guards for auth, RBAC, tenant isolation, and feature gating
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">▸</span>
              DTOs with class-validator for input validation
            </li>
            <li className="flex gap-2">
              <span className="text-red-400">▸</span>
              Prisma service with tenant-scoping middleware
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
