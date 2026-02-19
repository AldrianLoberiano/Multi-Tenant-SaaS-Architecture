import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  ChevronDown,
  ChevronRight,
  Shield,
  Lock,
  Zap,
  Users,
  CalendarDays,
  CreditCard,
  Bell,
  BarChart3,
  Copy,
  Check,
} from "lucide-react";

interface Endpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  auth: boolean;
  roles?: string[];
  featureGate?: string;
  requestBody?: string;
  response?: string;
}

interface ApiGroup {
  name: string;
  prefix: string;
  icon: typeof Globe;
  color: string;
  description: string;
  endpoints: Endpoint[];
}

const apiGroups: ApiGroup[] = [
  {
    name: "Authentication",
    prefix: "/api/v1/auth",
    icon: Lock,
    color: "#6366f1",
    description: "User authentication, registration, and session management.",
    endpoints: [
      { method: "POST", path: "/register", description: "Register new user account", auth: false, requestBody: "{ email, password, fullName }", response: "{ user, tokens }" },
      { method: "POST", path: "/login", description: "Authenticate user credentials", auth: false, requestBody: "{ email, password }", response: "{ user, tokens }" },
      { method: "POST", path: "/logout", description: "Invalidate refresh token", auth: true },
      { method: "POST", path: "/refresh", description: "Refresh access token", auth: false, requestBody: "{ refreshToken }" },
      { method: "POST", path: "/forgot-password", description: "Send password reset email", auth: false },
      { method: "POST", path: "/reset-password", description: "Reset password with token", auth: false },
      { method: "GET", path: "/me", description: "Get current user profile", auth: true },
      { method: "PATCH", path: "/me", description: "Update current user profile", auth: true },
      { method: "POST", path: "/oauth/:provider", description: "OAuth login (Google, GitHub)", auth: false },
      { method: "POST", path: "/mfa/enable", description: "Enable MFA for account", auth: true },
      { method: "POST", path: "/mfa/verify", description: "Verify MFA token", auth: true },
    ],
  },
  {
    name: "Workspaces",
    prefix: "/api/v1/workspaces",
    icon: Users,
    color: "#8b5cf6",
    description: "Multi-tenant workspace CRUD and member management.",
    endpoints: [
      { method: "GET", path: "/", description: "List user's workspaces", auth: true },
      { method: "POST", path: "/", description: "Create new workspace", auth: true, requestBody: "{ name, slug }" },
      { method: "GET", path: "/:id", description: "Get workspace details", auth: true, roles: ["owner", "admin", "member"] },
      { method: "PATCH", path: "/:id", description: "Update workspace settings", auth: true, roles: ["owner", "admin"] },
      { method: "DELETE", path: "/:id", description: "Delete workspace (soft delete)", auth: true, roles: ["owner"] },
      { method: "GET", path: "/:id/members", description: "List workspace members", auth: true },
      { method: "POST", path: "/:id/members/invite", description: "Invite member via email", auth: true, roles: ["owner", "admin"], featureGate: "team" },
      { method: "PATCH", path: "/:id/members/:userId", description: "Update member role", auth: true, roles: ["owner", "admin"] },
      { method: "DELETE", path: "/:id/members/:userId", description: "Remove member", auth: true, roles: ["owner", "admin"] },
      { method: "POST", path: "/join/:inviteCode", description: "Join workspace via invite code", auth: true },
    ],
  },
  {
    name: "Schedules",
    prefix: "/api/v1/workspaces/:wid/schedules",
    icon: CalendarDays,
    color: "#a855f7",
    description: "Calendar/schedule management within a workspace.",
    endpoints: [
      { method: "GET", path: "/", description: "List all schedules in workspace", auth: true },
      { method: "POST", path: "/", description: "Create new schedule/calendar", auth: true, roles: ["owner", "admin"] },
      { method: "GET", path: "/:id", description: "Get schedule details", auth: true },
      { method: "PATCH", path: "/:id", description: "Update schedule", auth: true, roles: ["owner", "admin"] },
      { method: "DELETE", path: "/:id", description: "Delete schedule", auth: true, roles: ["owner", "admin"] },
    ],
  },
  {
    name: "Tasks",
    prefix: "/api/v1/workspaces/:wid/tasks",
    icon: Zap,
    color: "#d946ef",
    description: "Task CRUD with drag-and-drop ordering and recurrence support.",
    endpoints: [
      { method: "GET", path: "/", description: "List tasks (filterable by date range, status, assignee)", auth: true, response: "{ tasks[], total, pagination }" },
      { method: "POST", path: "/", description: "Create new task", auth: true, requestBody: "{ title, startTime, endTime, scheduleId, ... }" },
      { method: "GET", path: "/:id", description: "Get task details with recurrence info", auth: true },
      { method: "PATCH", path: "/:id", description: "Update task (single or series)", auth: true },
      { method: "DELETE", path: "/:id", description: "Delete task (single or series)", auth: true },
      { method: "PATCH", path: "/:id/move", description: "Drag-and-drop reorder/reschedule", auth: true, requestBody: "{ newStartTime, newEndTime, position }" },
      { method: "PATCH", path: "/:id/assign", description: "Assign task to team member", auth: true, featureGate: "team" },
      { method: "POST", path: "/:id/recurrence", description: "Set recurrence rule (RFC 5545)", auth: true, featureGate: "pro", requestBody: "{ frequency, interval, byDay, until }" },
      { method: "GET", path: "/calendar", description: "Get tasks in calendar view format", auth: true, response: "{ events[] grouped by date }" },
      { method: "POST", path: "/bulk", description: "Bulk create/update tasks", auth: true, featureGate: "pro" },
    ],
  },
  {
    name: "Billing",
    prefix: "/api/v1/billing",
    icon: CreditCard,
    color: "#ec4899",
    description: "Stripe subscription management and payment processing.",
    endpoints: [
      { method: "GET", path: "/plans", description: "List available subscription plans", auth: false },
      { method: "GET", path: "/subscription", description: "Get current workspace subscription", auth: true, roles: ["owner", "admin"] },
      { method: "POST", path: "/checkout", description: "Create Stripe Checkout session", auth: true, roles: ["owner"], requestBody: "{ planId, billingPeriod }" },
      { method: "POST", path: "/portal", description: "Create Stripe Customer Portal session", auth: true, roles: ["owner"] },
      { method: "POST", path: "/cancel", description: "Cancel subscription (end of period)", auth: true, roles: ["owner"] },
      { method: "POST", path: "/resume", description: "Resume canceled subscription", auth: true, roles: ["owner"] },
      { method: "GET", path: "/invoices", description: "List workspace invoices", auth: true, roles: ["owner", "admin"] },
      { method: "POST", path: "/webhooks/stripe", description: "Stripe webhook handler", auth: false },
    ],
  },
  {
    name: "Notifications",
    prefix: "/api/v1/notifications",
    icon: Bell,
    color: "#f97316",
    description: "In-app notifications and WebSocket real-time events.",
    endpoints: [
      { method: "GET", path: "/", description: "List user notifications (paginated)", auth: true },
      { method: "PATCH", path: "/:id/read", description: "Mark notification as read", auth: true },
      { method: "POST", path: "/read-all", description: "Mark all as read", auth: true },
      { method: "GET", path: "/preferences", description: "Get notification preferences", auth: true },
      { method: "PATCH", path: "/preferences", description: "Update notification preferences", auth: true },
    ],
  },
  {
    name: "Admin",
    prefix: "/api/v1/admin",
    icon: BarChart3,
    color: "#f43f5e",
    description: "Platform admin endpoints for analytics and workspace management.",
    endpoints: [
      { method: "GET", path: "/dashboard", description: "Get MRR, churn, active users, growth metrics", auth: true, roles: ["superadmin"] },
      { method: "GET", path: "/workspaces", description: "List all workspaces with usage stats", auth: true, roles: ["superadmin"] },
      { method: "GET", path: "/users", description: "List all platform users", auth: true, roles: ["superadmin"] },
      { method: "GET", path: "/revenue", description: "Revenue breakdown by plan", auth: true, roles: ["superadmin"] },
      { method: "GET", path: "/churn", description: "Churn analysis data", auth: true, roles: ["superadmin"] },
      { method: "PATCH", path: "/workspaces/:id", description: "Admin override workspace settings", auth: true, roles: ["superadmin"] },
    ],
  },
];

const methodColors: Record<string, { bg: string; text: string }> = {
  GET: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  POST: { bg: "bg-blue-500/10", text: "text-blue-400" },
  PUT: { bg: "bg-amber-500/10", text: "text-amber-400" },
  PATCH: { bg: "bg-orange-500/10", text: "text-orange-400" },
  DELETE: { bg: "bg-red-500/10", text: "text-red-400" },
};

function EndpointRow({ endpoint, prefix }: { endpoint: Endpoint; prefix: string }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const mc = methodColors[endpoint.method];
  const fullPath = `${prefix}${endpoint.path}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(fullPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors text-left"
      >
        <span
          className={`px-2 py-0.5 rounded text-[10px] min-w-[52px] text-center ${mc.bg} ${mc.text}`}
        >
          {endpoint.method}
        </span>
        <span className="font-mono text-xs text-white/60 flex-1 truncate">
          {endpoint.path}
        </span>
        <span className="text-xs text-white/30 hidden md:block max-w-[200px] truncate">
          {endpoint.description}
        </span>
        <div className="flex items-center gap-2">
          {endpoint.featureGate && (
            <span className="px-1.5 py-0.5 rounded text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {endpoint.featureGate}+
            </span>
          )}
          {endpoint.auth && (
            <Shield className="w-3 h-3 text-amber-400/50" />
          )}
          {expanded ? (
            <ChevronDown className="w-3 h-3 text-white/20" />
          ) : (
            <ChevronRight className="w-3 h-3 text-white/20" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pt-1 space-y-3 ml-[68px]">
              <p className="text-xs text-white/40">{endpoint.description}</p>

              <div className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2">
                <span className="font-mono text-[11px] text-white/50 flex-1 truncate">
                  {fullPath}
                </span>
                <button onClick={handleCopy} className="text-white/30 hover:text-white/60">
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px]">
                {endpoint.auth && (
                  <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400">
                    Authenticated
                  </span>
                )}
                {endpoint.roles?.map((r) => (
                  <span key={r} className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400">
                    {r}
                  </span>
                ))}
                {endpoint.featureGate && (
                  <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400">
                    Feature: {endpoint.featureGate}+
                  </span>
                )}
              </div>

              {endpoint.requestBody && (
                <div>
                  <span className="text-[10px] text-white/20 uppercase tracking-wider">Request Body</span>
                  <code className="block mt-1 text-[11px] text-emerald-400/70 font-mono bg-white/[0.03] rounded-lg px-3 py-2">
                    {endpoint.requestBody}
                  </code>
                </div>
              )}

              {endpoint.response && (
                <div>
                  <span className="text-[10px] text-white/20 uppercase tracking-wider">Response</span>
                  <code className="block mt-1 text-[11px] text-blue-400/70 font-mono bg-white/[0.03] rounded-lg px-3 py-2">
                    {endpoint.response}
                  </code>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ApiStructure() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>("Authentication");
  const totalEndpoints = apiGroups.reduce((acc, g) => acc + g.endpoints.length, 0);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-pink-400 text-xs tracking-widest uppercase mb-2">
          <div className="w-2 h-2 rounded-full bg-pink-400" />
          REST API
        </div>
        <h1 className="text-3xl lg:text-4xl text-white tracking-tight">
          API Structure
        </h1>
        <p className="text-white/40 mt-2 max-w-2xl">
          {totalEndpoints} endpoints across {apiGroups.length} modules. RESTful design with JWT auth,
          RBAC authorization, tenant scoping, and feature gating.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Endpoints", value: totalEndpoints, color: "#6366f1" },
          { label: "Auth Protected", value: apiGroups.reduce((a, g) => a + g.endpoints.filter(e => e.auth).length, 0), color: "#eab308" },
          { label: "Feature Gated", value: apiGroups.reduce((a, g) => a + g.endpoints.filter(e => e.featureGate).length, 0), color: "#a855f7" },
          { label: "API Version", value: "v1", color: "#10b981" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center"
          >
            <p className="text-2xl text-white" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* API Groups */}
      <div className="space-y-3">
        {apiGroups.map((group, i) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() =>
                setExpandedGroup(expandedGroup === group.name ? null : group.name)
              }
              className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.01] transition-colors"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: group.color + "15" }}
              >
                <group.icon className="w-4 h-4" style={{ color: group.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">{group.name}</span>
                  <span className="text-[10px] text-white/20">
                    {group.endpoints.length} endpoints
                  </span>
                </div>
                <p className="text-xs text-white/30 font-mono mt-0.5 truncate">
                  {group.prefix}
                </p>
              </div>
              {expandedGroup === group.name ? (
                <ChevronDown className="w-4 h-4 text-white/20" />
              ) : (
                <ChevronRight className="w-4 h-4 text-white/20" />
              )}
            </button>

            <AnimatePresence>
              {expandedGroup === group.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/5">
                    {group.endpoints.map((ep, j) => (
                      <EndpointRow
                        key={`${ep.method}-${ep.path}-${j}`}
                        endpoint={ep}
                        prefix={group.prefix}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* API Design Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Versioning", desc: "All endpoints prefixed with /api/v1/. Breaking changes trigger new version. Old versions supported for 6 months.", color: "#6366f1" },
          { title: "Pagination", desc: "Cursor-based pagination for lists. Response includes { data[], nextCursor, hasMore }. Default limit: 50.", color: "#8b5cf6" },
          { title: "Error Format", desc: "Standardized errors: { statusCode, message, error, details[] }. Validation errors include field-level details.", color: "#ec4899" },
        ].map((note) => (
          <div key={note.title} className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
            <h3 className="text-sm text-white mb-1">{note.title}</h3>
            <p className="text-xs text-white/30 leading-relaxed">{note.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
