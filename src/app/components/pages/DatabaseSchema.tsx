import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Database,
  Key,
  Link2,
  ChevronDown,
  ChevronRight,
  Shield,
  Layers,
  Clock,
  Hash,
} from "lucide-react";

interface Column {
  name: string;
  type: string;
  constraints: string[];
  fk?: string;
}

interface Table {
  name: string;
  module: string;
  color: string;
  description: string;
  columns: Column[];
}

const tables: Table[] = [
  {
    name: "users",
    module: "Auth & IAM",
    color: "#6366f1",
    description: "Core user accounts with authentication credentials and profile data.",
    columns: [
      { name: "id", type: "UUID", constraints: ["PK", "DEFAULT uuid_generate_v4()"] },
      { name: "email", type: "VARCHAR(255)", constraints: ["UNIQUE", "NOT NULL"] },
      { name: "password_hash", type: "VARCHAR(255)", constraints: ["NOT NULL"] },
      { name: "full_name", type: "VARCHAR(100)", constraints: ["NOT NULL"] },
      { name: "avatar_url", type: "TEXT", constraints: ["NULLABLE"] },
      { name: "email_verified", type: "BOOLEAN", constraints: ["DEFAULT false"] },
      { name: "mfa_enabled", type: "BOOLEAN", constraints: ["DEFAULT false"] },
      { name: "mfa_secret", type: "VARCHAR(255)", constraints: ["NULLABLE"] },
      { name: "last_login_at", type: "TIMESTAMPTZ", constraints: ["NULLABLE"] },
      { name: "created_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()"] },
      { name: "updated_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()"] },
    ],
  },
  {
    name: "workspaces",
    module: "Multi-Tenancy",
    color: "#8b5cf6",
    description: "Tenant workspaces. All resources are scoped to a workspace for data isolation.",
    columns: [
      { name: "id", type: "UUID", constraints: ["PK"] },
      { name: "name", type: "VARCHAR(100)", constraints: ["NOT NULL"] },
      { name: "slug", type: "VARCHAR(50)", constraints: ["UNIQUE", "NOT NULL"] },
      { name: "logo_url", type: "TEXT", constraints: ["NULLABLE"] },
      { name: "owner_id", type: "UUID", constraints: ["FK", "NOT NULL"], fk: "users.id" },
      { name: "plan", type: "ENUM", constraints: ["DEFAULT 'free'"] },
      { name: "stripe_customer_id", type: "VARCHAR(255)", constraints: ["NULLABLE", "UNIQUE"] },
      { name: "stripe_subscription_id", type: "VARCHAR(255)", constraints: ["NULLABLE"] },
      { name: "trial_ends_at", type: "TIMESTAMPTZ", constraints: ["NULLABLE"] },
      { name: "max_members", type: "INTEGER", constraints: ["DEFAULT 1"] },
      { name: "settings", type: "JSONB", constraints: ["DEFAULT '{}'"] },
      { name: "created_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()"] },
      { name: "updated_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()"] },
    ],
  },
  {
    name: "workspace_members",
    module: "Multi-Tenancy",
    color: "#8b5cf6",
    description: "Junction table for user-workspace relationships with RBAC role assignment.",
    columns: [
      { name: "id", type: "UUID", constraints: ["PK"] },
      { name: "workspace_id", type: "UUID", constraints: ["FK", "NOT NULL"], fk: "workspaces.id" },
      { name: "user_id", type: "UUID", constraints: ["FK", "NOT NULL"], fk: "users.id" },
      { name: "role", type: "ENUM('owner','admin','member')", constraints: ["NOT NULL", "DEFAULT 'member'"] },
      { name: "invited_by", type: "UUID", constraints: ["FK", "NULLABLE"], fk: "users.id" },
      { name: "invited_at", type: "TIMESTAMPTZ", constraints: ["NULLABLE"] },
      { name: "joined_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()"] },
    ],
  },
  {
    name: "schedules",
    module: "Scheduling",
    color: "#a855f7",
    description: "Top-level schedule/calendar containers within a workspace.",
    columns: [
      { name: "id", type: "UUID", constraints: ["PK"] },
      { name: "workspace_id", type: "UUID", constraints: ["FK", "NOT NULL", "INDEX"], fk: "workspaces.id" },
      { name: "name", type: "VARCHAR(100)", constraints: ["NOT NULL"] },
      { name: "description", type: "TEXT", constraints: ["NULLABLE"] },
      { name: "color", type: "VARCHAR(7)", constraints: ["DEFAULT '#6366f1'"] },
      { name: "is_default", type: "BOOLEAN", constraints: ["DEFAULT false"] },
      { name: "timezone", type: "VARCHAR(50)", constraints: ["DEFAULT 'UTC'"] },
      { name: "created_by", type: "UUID", constraints: ["FK"], fk: "users.id" },
      { name: "created_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()"] },
    ],
  },
  {
    name: "tasks",
    module: "Scheduling",
    color: "#a855f7",
    description: "Individual tasks/events with optional recurrence, priority, and assignees.",
    columns: [
      { name: "id", type: "UUID", constraints: ["PK"] },
      { name: "workspace_id", type: "UUID", constraints: ["FK", "NOT NULL", "INDEX"], fk: "workspaces.id" },
      { name: "schedule_id", type: "UUID", constraints: ["FK", "NOT NULL"], fk: "schedules.id" },
      { name: "title", type: "VARCHAR(255)", constraints: ["NOT NULL"] },
      { name: "description", type: "TEXT", constraints: ["NULLABLE"] },
      { name: "status", type: "ENUM", constraints: ["DEFAULT 'todo'"] },
      { name: "priority", type: "ENUM('low','medium','high','urgent')", constraints: ["DEFAULT 'medium'"] },
      { name: "start_time", type: "TIMESTAMPTZ", constraints: ["NOT NULL"] },
      { name: "end_time", type: "TIMESTAMPTZ", constraints: ["NOT NULL"] },
      { name: "all_day", type: "BOOLEAN", constraints: ["DEFAULT false"] },
      { name: "assigned_to", type: "UUID", constraints: ["FK", "NULLABLE"], fk: "users.id" },
      { name: "created_by", type: "UUID", constraints: ["FK"], fk: "users.id" },
      { name: "position", type: "INTEGER", constraints: ["DEFAULT 0"] },
      { name: "parent_task_id", type: "UUID", constraints: ["FK", "NULLABLE"], fk: "tasks.id" },
      { name: "tags", type: "TEXT[]", constraints: ["DEFAULT '{}'"] },
      { name: "metadata", type: "JSONB", constraints: ["DEFAULT '{}'"] },
      { name: "created_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()"] },
      { name: "updated_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()"] },
    ],
  },
  {
    name: "recurrence_rules",
    module: "Scheduling",
    color: "#a855f7",
    description: "RFC 5545 compliant recurrence rules for repeating tasks/events.",
    columns: [
      { name: "id", type: "UUID", constraints: ["PK"] },
      { name: "task_id", type: "UUID", constraints: ["FK", "UNIQUE", "NOT NULL"], fk: "tasks.id" },
      { name: "frequency", type: "ENUM('daily','weekly','monthly','yearly')", constraints: ["NOT NULL"] },
      { name: "interval", type: "INTEGER", constraints: ["DEFAULT 1"] },
      { name: "by_day", type: "VARCHAR[]", constraints: ["NULLABLE"] },
      { name: "by_month_day", type: "INTEGER[]", constraints: ["NULLABLE"] },
      { name: "count", type: "INTEGER", constraints: ["NULLABLE"] },
      { name: "until", type: "TIMESTAMPTZ", constraints: ["NULLABLE"] },
      { name: "exceptions", type: "TIMESTAMPTZ[]", constraints: ["DEFAULT '{}'"] },
    ],
  },
  {
    name: "subscriptions",
    module: "Billing",
    color: "#d946ef",
    description: "Stripe subscription records with plan details and billing cycle data.",
    columns: [
      { name: "id", type: "UUID", constraints: ["PK"] },
      { name: "workspace_id", type: "UUID", constraints: ["FK", "UNIQUE"], fk: "workspaces.id" },
      { name: "stripe_subscription_id", type: "VARCHAR(255)", constraints: ["UNIQUE", "NOT NULL"] },
      { name: "stripe_price_id", type: "VARCHAR(255)", constraints: ["NOT NULL"] },
      { name: "plan", type: "ENUM('free','pro','team')", constraints: ["NOT NULL"] },
      { name: "status", type: "VARCHAR(50)", constraints: ["NOT NULL"] },
      { name: "current_period_start", type: "TIMESTAMPTZ", constraints: ["NOT NULL"] },
      { name: "current_period_end", type: "TIMESTAMPTZ", constraints: ["NOT NULL"] },
      { name: "cancel_at", type: "TIMESTAMPTZ", constraints: ["NULLABLE"] },
      { name: "canceled_at", type: "TIMESTAMPTZ", constraints: ["NULLABLE"] },
      { name: "trial_start", type: "TIMESTAMPTZ", constraints: ["NULLABLE"] },
      { name: "trial_end", type: "TIMESTAMPTZ", constraints: ["NULLABLE"] },
      { name: "created_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()"] },
    ],
  },
  {
    name: "invoices",
    module: "Billing",
    color: "#d946ef",
    description: "Invoice records synced from Stripe for financial reporting.",
    columns: [
      { name: "id", type: "UUID", constraints: ["PK"] },
      { name: "workspace_id", type: "UUID", constraints: ["FK"], fk: "workspaces.id" },
      { name: "stripe_invoice_id", type: "VARCHAR(255)", constraints: ["UNIQUE"] },
      { name: "amount_due", type: "INTEGER", constraints: ["NOT NULL"] },
      { name: "amount_paid", type: "INTEGER", constraints: ["NOT NULL"] },
      { name: "currency", type: "VARCHAR(3)", constraints: ["DEFAULT 'usd'"] },
      { name: "status", type: "VARCHAR(50)", constraints: ["NOT NULL"] },
      { name: "invoice_url", type: "TEXT", constraints: ["NULLABLE"] },
      { name: "period_start", type: "TIMESTAMPTZ", constraints: ["NOT NULL"] },
      { name: "period_end", type: "TIMESTAMPTZ", constraints: ["NOT NULL"] },
      { name: "created_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()"] },
    ],
  },
  {
    name: "audit_logs",
    module: "Security",
    color: "#10b981",
    description: "Immutable audit trail for compliance and security monitoring.",
    columns: [
      { name: "id", type: "UUID", constraints: ["PK"] },
      { name: "workspace_id", type: "UUID", constraints: ["FK", "INDEX"], fk: "workspaces.id" },
      { name: "user_id", type: "UUID", constraints: ["FK"], fk: "users.id" },
      { name: "action", type: "VARCHAR(100)", constraints: ["NOT NULL", "INDEX"] },
      { name: "resource_type", type: "VARCHAR(50)", constraints: ["NOT NULL"] },
      { name: "resource_id", type: "UUID", constraints: ["NOT NULL"] },
      { name: "changes", type: "JSONB", constraints: ["NULLABLE"] },
      { name: "ip_address", type: "INET", constraints: ["NULLABLE"] },
      { name: "user_agent", type: "TEXT", constraints: ["NULLABLE"] },
      { name: "created_at", type: "TIMESTAMPTZ", constraints: ["DEFAULT NOW()", "INDEX"] },
    ],
  },
];

const indexes = [
  { table: "tasks", index: "idx_tasks_workspace_schedule", columns: "workspace_id, schedule_id", type: "B-Tree" },
  { table: "tasks", index: "idx_tasks_start_time", columns: "start_time", type: "B-Tree" },
  { table: "tasks", index: "idx_tasks_assigned_to", columns: "assigned_to", type: "B-Tree" },
  { table: "tasks", index: "idx_tasks_status", columns: "workspace_id, status", type: "B-Tree" },
  { table: "audit_logs", index: "idx_audit_workspace_created", columns: "workspace_id, created_at DESC", type: "B-Tree" },
  { table: "workspace_members", index: "idx_members_unique", columns: "workspace_id, user_id", type: "UNIQUE" },
  { table: "tasks", index: "idx_tasks_search", columns: "title, description", type: "GIN (tsvector)" },
];

function ColumnIcon({ constraints }: { constraints: string[] }) {
  if (constraints.includes("PK")) return <Key className="w-3 h-3 text-amber-400" />;
  if (constraints.includes("FK")) return <Link2 className="w-3 h-3 text-blue-400" />;
  if (constraints.includes("INDEX")) return <Hash className="w-3 h-3 text-green-400" />;
  return <div className="w-3 h-3" />;
}

function TableCard({ table }: { table: Table }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 flex items-center gap-4 text-left"
      >
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: table.color }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-mono">{table.name}</span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: table.color + "15",
                color: table.color,
              }}
            >
              {table.module}
            </span>
          </div>
          <p className="text-white/30 text-xs mt-1 truncate">{table.description}</p>
        </div>
        <span className="text-white/20 text-xs">{table.columns.length} cols</span>
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-white/30" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white/30" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5">
              <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-4 gap-y-0 text-xs">
                <div className="contents text-white/20 border-b border-white/5">
                  <div className="px-5 py-2"></div>
                  <div className="py-2">Column</div>
                  <div className="py-2">Type</div>
                  <div className="py-2 pr-5">Constraints</div>
                </div>
                {table.columns.map((col) => (
                  <div
                    key={col.name}
                    className="contents group hover:bg-white/[0.02]"
                  >
                    <div className="px-5 py-2 flex items-center">
                      <ColumnIcon constraints={col.constraints} />
                    </div>
                    <div className="py-2 font-mono text-white/70 flex items-center gap-2">
                      {col.name}
                      {col.fk && (
                        <span className="text-[10px] text-blue-400/60">
                          → {col.fk}
                        </span>
                      )}
                    </div>
                    <div className="py-2 text-purple-300/60 font-mono">{col.type}</div>
                    <div className="py-2 pr-5 flex flex-wrap gap-1">
                      {col.constraints.map((c) => (
                        <span
                          key={c}
                          className={`px-1.5 py-0.5 rounded text-[9px] ${
                            c === "PK"
                              ? "bg-amber-500/10 text-amber-400"
                              : c === "FK"
                              ? "bg-blue-500/10 text-blue-400"
                              : c === "NOT NULL"
                              ? "bg-red-500/10 text-red-400"
                              : c === "UNIQUE"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-white/5 text-white/30"
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function DatabaseSchema() {
  const [filter, setFilter] = useState<string>("all");
  const modules = [...new Set(tables.map((t) => t.module))];

  const filtered =
    filter === "all" ? tables : tables.filter((t) => t.module === filter);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 text-purple-400 text-xs tracking-widest uppercase mb-2">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          PostgreSQL + Prisma
        </div>
        <h1 className="text-3xl lg:text-4xl text-white tracking-tight">
          Database Schema
        </h1>
        <p className="text-white/40 mt-2 max-w-2xl">
          {tables.length} tables across {modules.length} modules. All tables include workspace_id for tenant
          isolation. UUIDs as primary keys for distributed-safe operations.
        </p>
      </motion.div>

      {/* Legend + Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <Key className="w-3 h-3 text-amber-400" /> Primary Key
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <Link2 className="w-3 h-3 text-blue-400" /> Foreign Key
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <Hash className="w-3 h-3 text-green-400" /> Indexed
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
              filter === "all"
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            All
          </button>
          {modules.map((m) => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                filter === m
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Tables */}
      <div className="space-y-3">
        {filtered.map((table, i) => (
          <motion.div
            key={table.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <TableCard table={table} />
          </motion.div>
        ))}
      </div>

      {/* Indexes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-white/80 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-green-400" />
          Performance Indexes
        </h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5 text-white/30">
                  <th className="text-left px-5 py-3">Table</th>
                  <th className="text-left px-5 py-3">Index Name</th>
                  <th className="text-left px-5 py-3">Columns</th>
                  <th className="text-left px-5 py-3">Type</th>
                </tr>
              </thead>
              <tbody>
                {indexes.map((idx) => (
                  <tr
                    key={idx.index}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3 font-mono text-white/60">
                      {idx.table}
                    </td>
                    <td className="px-5 py-3 font-mono text-purple-300/60">
                      {idx.index}
                    </td>
                    <td className="px-5 py-3 font-mono text-white/40">
                      {idx.columns}
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-green-500/10 text-green-400">
                        {idx.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Prisma Schema Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        {[
          { icon: Shield, title: "Row-Level Security", desc: "Every query includes workspace_id in WHERE clause via Prisma middleware. Prevents cross-tenant data access.", color: "#10b981" },
          { icon: Clock, title: "Soft Deletes", desc: "All primary tables support soft delete with deleted_at column. Audit logs are immutable (append-only).", color: "#f97316" },
          { icon: Layers, title: "Migration Strategy", desc: "Prisma Migrate for schema versioning. Zero-downtime migrations with expand-contract pattern.", color: "#6366f1" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white/[0.02] border border-white/5 rounded-xl p-5"
          >
            <item.icon className="w-5 h-5 mb-3" style={{ color: item.color }} />
            <h3 className="text-white text-sm mb-1">{item.title}</h3>
            <p className="text-white/30 text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
