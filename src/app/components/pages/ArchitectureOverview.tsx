import { motion } from "motion/react";
import {
  Monitor,
  Server,
  Database,
  HardDrive,
  Shield,
  Users,
  CalendarDays,
  CreditCard,
  Bell,
  Lock,
  ArrowRight,
  Layers,
  Globe,
  Cpu,
  Cloud,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const layers = [
  {
    title: "Client Layer",
    color: "#6366f1",
    icon: Monitor,
    items: [
      "Next.js 14 (App Router)",
      "TypeScript + Tailwind CSS",
      "React Query (data fetching)",
      "Zustand (client state)",
      "Socket.io Client (real-time)",
    ],
  },
  {
    title: "API Gateway / CDN",
    color: "#8b5cf6",
    icon: Globe,
    items: [
      "Nginx / AWS ALB",
      "Rate Limiting (per tenant)",
      "SSL Termination",
      "CORS Configuration",
      "Request Logging",
    ],
  },
  {
    title: "Application Layer",
    color: "#a855f7",
    icon: Server,
    items: [
      "NestJS (TypeScript)",
      "JWT + OAuth 2.0 Auth",
      "RBAC Middleware",
      "Tenant Context Guard",
      "WebSocket Gateway",
    ],
  },
  {
    title: "Data Layer",
    color: "#d946ef",
    icon: Database,
    items: [
      "PostgreSQL (Prisma ORM)",
      "Redis (Sessions + Cache)",
      "S3 (File Storage)",
      "Row-Level Security",
      "Connection Pooling (PgBouncer)",
    ],
  },
  {
    title: "Infrastructure",
    color: "#ec4899",
    icon: Cloud,
    items: [
      "Docker + Docker Compose",
      "AWS ECS / GCP Cloud Run",
      "GitHub Actions CI/CD",
      "Terraform (IaC)",
      "CloudWatch / Datadog",
    ],
  },
];

const modules = [
  { icon: Users, label: "Auth & IAM", desc: "OAuth, JWT, RBAC, MFA", color: "#6366f1" },
  { icon: Layers, label: "Workspaces", desc: "Multi-tenant isolation", color: "#8b5cf6" },
  { icon: CalendarDays, label: "Scheduling", desc: "Calendar, tasks, recurring", color: "#a855f7" },
  { icon: CreditCard, label: "Billing", desc: "Stripe, plans, invoices", color: "#d946ef" },
  { icon: Bell, label: "Notifications", desc: "Email, push, in-app", color: "#ec4899" },
  { icon: Lock, label: "Feature Gates", desc: "Plan-based access control", color: "#f43f5e" },
  { icon: HardDrive, label: "Caching", desc: "Redis, query cache", color: "#f97316" },
  { icon: Shield, label: "Security", desc: "Encryption, audit logs", color: "#10b981" },
];

const principles = [
  {
    title: "Workspace Isolation",
    desc: "Every query is scoped to the active workspace using a TenantContext guard. Row-level security ensures data never leaks between tenants.",
    icon: Shield,
  },
  {
    title: "Event-Driven Architecture",
    desc: "Domain events (task.created, schedule.updated) are emitted via EventEmitter2 and consumed by notification, analytics, and sync modules.",
    icon: Cpu,
  },
  {
    title: "CQRS-Lite Pattern",
    desc: "Write operations go through command handlers with validation. Read operations use optimized query services with Redis caching.",
    icon: Layers,
  },
];

export function ArchitectureOverview() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-indigo-400 text-xs tracking-widest uppercase mb-2">
          <div className="w-2 h-2 rounded-full bg-indigo-400" />
          System Design
        </div>
        <h1 className="text-3xl lg:text-4xl text-white tracking-tight">
          Architecture Overview
        </h1>
        <p className="text-white/40 mt-2 max-w-2xl">
          A production-grade, multi-tenant SaaS architecture designed for scalability, security,
          and investor-readiness. Workspace-based isolation with RBAC and real-time collaboration.
        </p>
      </motion.div>

      {/* Architecture Layers */}
      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          System Layers
        </h2>
        <div className="space-y-3">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ backgroundColor: layer.color }}
              />
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 lg:w-56 shrink-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: layer.color + "15" }}
                  >
                    <layer.icon className="w-4 h-4" style={{ color: layer.color }} />
                  </div>
                  <span className="text-white text-sm">{layer.title}</span>
                </div>
                <div className="flex flex-wrap gap-2 flex-1">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg text-xs bg-white/5 text-white/60 border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {i < layers.length - 1 && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-white/10 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Modules */}
      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-400" />
          Core Modules
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="group bg-white/[0.02] border border-white/5 rounded-xl p-5 hover:bg-white/[0.05] transition-all duration-300 cursor-default"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: mod.color + "15" }}
              >
                <mod.icon className="w-5 h-5" style={{ color: mod.color }} />
              </div>
              <h3 className="text-white text-sm mb-1">{mod.label}</h3>
              <p className="text-white/40 text-xs">{mod.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Architecture Principles */}
      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          Design Principles
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-2xl p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white text-sm mb-2">{p.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data Flow */}
      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.5 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-orange-400" />
          Request Lifecycle
        </h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {[
              { step: "1", label: "Client Request", desc: "Next.js SSR/CSR" },
              { step: "2", label: "API Gateway", desc: "Rate limit + SSL" },
              { step: "3", label: "Auth Guard", desc: "JWT validation" },
              { step: "4", label: "Tenant Guard", desc: "Workspace scoping" },
              { step: "5", label: "RBAC Check", desc: "Permission verify" },
              { step: "6", label: "Service Layer", desc: "Business logic" },
              { step: "7", label: "Data Access", desc: "Prisma + Redis" },
              { step: "8", label: "Response", desc: "Serialized DTO" },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex items-center gap-3 lg:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-xs text-indigo-300">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-xs text-white">{item.label}</p>
                    <p className="text-[10px] text-white/30">{item.desc}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-white/10 hidden lg:block shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
