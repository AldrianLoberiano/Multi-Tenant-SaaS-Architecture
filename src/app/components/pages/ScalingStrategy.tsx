import { motion } from "motion/react";
import {
  Server,
  Database,
  Globe,
  Shield,
  Layers,
  Cpu,
  HardDrive,
  ArrowRight,
  Cloud,
  Container,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  Lock,
  Wifi,
} from "lucide-react";

const scalingPhases = [
  {
    phase: "Phase 1: MVP Launch",
    users: "0 → 1K users",
    timeline: "Month 1-3",
    color: "#6366f1",
    infra: [
      { name: "Single VPS / AWS EC2 (t3.medium)", type: "Compute" },
      { name: "PostgreSQL (RDS db.t3.medium)", type: "Database" },
      { name: "Redis (ElastiCache t3.micro)", type: "Cache" },
      { name: "S3 + CloudFront", type: "Storage/CDN" },
    ],
    cost: "$50-150/mo",
    focus: "Product-market fit, rapid iteration, feature validation",
  },
  {
    phase: "Phase 2: Growth",
    users: "1K → 10K users",
    timeline: "Month 4-9",
    color: "#8b5cf6",
    infra: [
      { name: "ECS Fargate (2-4 tasks, auto-scaling)", type: "Compute" },
      { name: "RDS PostgreSQL (db.r6g.large, read replica)", type: "Database" },
      { name: "Redis Cluster (3 nodes)", type: "Cache" },
      { name: "ALB + WAF", type: "Load Balancer" },
      { name: "PgBouncer connection pooling", type: "Database" },
    ],
    cost: "$500-1,500/mo",
    focus: "Horizontal scaling, caching layer, read replicas, monitoring",
  },
  {
    phase: "Phase 3: Scale",
    users: "10K → 100K users",
    timeline: "Month 10-18",
    color: "#a855f7",
    infra: [
      { name: "ECS/EKS (8-16 tasks, multi-AZ)", type: "Compute" },
      { name: "Aurora PostgreSQL (Multi-AZ, 2+ read replicas)", type: "Database" },
      { name: "Redis Cluster (6 nodes, ElastiCache)", type: "Cache" },
      { name: "SQS/SNS for async processing", type: "Queue" },
      { name: "CloudWatch + Datadog APM", type: "Observability" },
      { name: "Terraform IaC + CI/CD", type: "DevOps" },
    ],
    cost: "$3,000-8,000/mo",
    focus: "Event-driven architecture, queue-based async, observability",
  },
  {
    phase: "Phase 4: Enterprise",
    users: "100K+ users",
    timeline: "Month 18+",
    color: "#d946ef",
    infra: [
      { name: "EKS (Kubernetes, multi-region)", type: "Compute" },
      { name: "Aurora Global Database (cross-region)", type: "Database" },
      { name: "Redis Enterprise (global replication)", type: "Cache" },
      { name: "Kafka/EventBridge for event streaming", type: "Queue" },
      { name: "Dedicated tenant databases (large accounts)", type: "Database" },
      { name: "WAF + Shield Advanced + GuardDuty", type: "Security" },
    ],
    cost: "$15,000+/mo",
    focus: "Multi-region, dedicated tenancy, SOC2 compliance, SLA guarantees",
  },
];

const cachingStrategy = [
  { key: "session:{userId}", ttl: "24h", description: "User session data + workspace context" },
  { key: "workspace:{id}:plan", ttl: "1h", description: "Workspace subscription plan for feature gating" },
  { key: "workspace:{id}:members", ttl: "5m", description: "Workspace member list for RBAC checks" },
  { key: "tasks:{workspaceId}:{date}", ttl: "2m", description: "Calendar view tasks for a specific date" },
  { key: "user:{id}:notifications", ttl: "30s", description: "Unread notification count" },
  { key: "rate:{ip}:{endpoint}", ttl: "1m", description: "Rate limiting counter per IP/endpoint" },
];

const monitoringMetrics = [
  { category: "Application", metrics: ["Request latency (p50, p95, p99)", "Error rate (4xx, 5xx)", "Active WebSocket connections", "Task creation rate"], color: "#6366f1" },
  { category: "Infrastructure", metrics: ["CPU/Memory utilization", "Database connections pool", "Redis hit/miss ratio", "Disk I/O throughput"], color: "#8b5cf6" },
  { category: "Business", metrics: ["Monthly Recurring Revenue (MRR)", "Daily Active Users (DAU)", "Churn rate (monthly)", "Feature adoption rate"], color: "#ec4899" },
  { category: "Security", metrics: ["Failed auth attempts", "Rate limit violations", "Suspicious access patterns", "Data access audit events"], color: "#f43f5e" },
];

const securityLayers = [
  { icon: Lock, title: "Authentication", items: ["JWT with RS256 signing", "Refresh token rotation", "OAuth 2.0 (Google, GitHub)", "Optional MFA (TOTP)"] },
  { icon: Shield, title: "Authorization", items: ["RBAC (Owner, Admin, Member)", "Workspace-scoped permissions", "Feature gate enforcement", "API key scoping"] },
  { icon: Database, title: "Data Security", items: ["AES-256 encryption at rest", "TLS 1.3 in transit", "PII field-level encryption", "Automated daily backups"] },
  { icon: Activity, title: "Compliance", items: ["SOC 2 Type II ready", "GDPR data controls", "Immutable audit logs", "Data retention policies"] },
];

export function ScalingStrategy() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-rose-400 text-xs tracking-widest uppercase mb-2">
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          Infrastructure
        </div>
        <h1 className="text-3xl lg:text-4xl text-white tracking-tight">
          Scaling Strategy
        </h1>
        <p className="text-white/40 mt-2 max-w-2xl">
          Four-phase scaling roadmap from MVP to enterprise. Docker-based deployment on AWS with
          auto-scaling, caching, and observability at every stage.
        </p>
      </motion.div>

      {/* Scaling Phases */}
      <div>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          Infrastructure Scaling Roadmap
        </h2>
        <div className="space-y-4">
          {scalingPhases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                style={{ backgroundColor: phase.color }}
              />
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="lg:w-64 shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs"
                      style={{ backgroundColor: phase.color + "15", color: phase.color }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="text-white text-sm">{phase.phase}</h3>
                      <p className="text-[10px] text-white/20">{phase.timeline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs px-2 py-1 rounded-lg bg-white/5 text-white/40">
                      {phase.users}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400">
                      {phase.cost}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {phase.infra.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5"
                      >
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/20">
                          {item.type}
                        </span>
                        <span className="text-xs text-white/50">{item.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/30 flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Focus: {phase.focus}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Docker Architecture */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <Container className="w-5 h-5 text-blue-400" />
          Docker Deployment Stack
        </h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "nginx", desc: "Reverse proxy, SSL, rate limiting", port: "80/443", color: "#10b981" },
              { name: "api", desc: "NestJS app (2+ replicas)", port: "3000", color: "#6366f1" },
              { name: "web", desc: "Next.js SSR (2+ replicas)", port: "3001", color: "#3178c6" },
              { name: "worker", desc: "Background job processor", port: "-", color: "#f97316" },
              { name: "postgres", desc: "PostgreSQL 16 + PgBouncer", port: "5432", color: "#336791" },
              { name: "redis", desc: "Redis 7 (cache + sessions)", port: "6379", color: "#dc382d" },
              { name: "websocket", desc: "Socket.io gateway", port: "3002", color: "#8b5cf6" },
              { name: "monitoring", desc: "Prometheus + Grafana", port: "9090/3003", color: "#e6522c" },
            ].map((service) => (
              <div
                key={service.name}
                className="bg-white/[0.02] border border-white/5 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: service.color }}
                  />
                  <span className="text-xs font-mono text-white/70">{service.name}</span>
                </div>
                <p className="text-[10px] text-white/30 mb-2">{service.desc}</p>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/20 font-mono">
                  :{service.port}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Redis Caching */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-red-400" />
          Redis Caching Strategy
        </h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5 text-white/20">
                  <th className="text-left px-5 py-3">Cache Key Pattern</th>
                  <th className="text-left px-5 py-3">TTL</th>
                  <th className="text-left px-5 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                {cachingStrategy.map((item) => (
                  <tr key={item.key} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-mono text-red-400/70">{item.key}</td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px]">
                        {item.ttl}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-white/40">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Monitoring */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <Gauge className="w-5 h-5 text-orange-400" />
          Monitoring & Observability
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {monitoringMetrics.map((cat) => (
            <div
              key={cat.category}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-5"
            >
              <h3 className="text-sm mb-3" style={{ color: cat.color }}>{cat.category}</h3>
              <ul className="space-y-2">
                {cat.metrics.map((m) => (
                  <li key={m} className="flex items-start gap-2 text-xs text-white/40">
                    <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5" style={{ color: cat.color + "80" }} />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          Security Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {securityLayers.map((layer) => (
            <div
              key={layer.title}
              className="bg-gradient-to-br from-emerald-500/[0.03] to-transparent border border-white/5 rounded-xl p-5"
            >
              <layer.icon className="w-5 h-5 text-emerald-400 mb-3" />
              <h3 className="text-white text-sm mb-3">{layer.title}</h3>
              <ul className="space-y-2">
                {layer.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-white/40">
                    <ArrowRight className="w-3 h-3 text-emerald-400/40 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Real-time Architecture */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-purple-400" />
          Real-time Collaboration
        </h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "WebSocket Gateway", desc: "Socket.io with Redis adapter for multi-instance pub/sub. Rooms scoped by workspace ID.", items: ["task.created", "task.updated", "task.deleted", "task.moved", "member.joined"] },
              { title: "Optimistic Updates", desc: "Frontend applies changes immediately and reconciles on server confirmation. Conflict resolution via last-write-wins with vector clocks.", items: ["Instant UI feedback", "Server reconciliation", "Conflict detection", "Rollback on failure"] },
              { title: "Presence System", desc: "Track active users per workspace/calendar. Show who's viewing what in real-time.", items: ["Online/offline status", "Active view tracking", "Typing indicators", "Cursor position (calendar)"] },
            ].map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-white text-sm">{section.title}</h3>
                <p className="text-xs text-white/30">{section.desc}</p>
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-white/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50" />
                      <span className="font-mono">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CI/CD Pipeline */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          CI/CD Pipeline
        </h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {[
              { label: "Push to main", desc: "GitHub" },
              { label: "Lint + Type Check", desc: "ESLint + tsc" },
              { label: "Unit Tests", desc: "Jest (90%+ cov)" },
              { label: "E2E Tests", desc: "Playwright" },
              { label: "Build Docker", desc: "Multi-stage" },
              { label: "Push to ECR", desc: "Container registry" },
              { label: "Deploy Staging", desc: "ECS blue/green" },
              { label: "Smoke Tests", desc: "Health checks" },
              { label: "Deploy Prod", desc: "Rolling update" },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[9px] text-blue-300">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-[11px] text-white/60">{step.label}</p>
                    <p className="text-[9px] text-white/20">{step.desc}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-white/10 hidden lg:block shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
