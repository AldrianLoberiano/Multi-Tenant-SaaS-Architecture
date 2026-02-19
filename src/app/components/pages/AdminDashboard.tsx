import { useState } from "react";
import { motion } from "motion/react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  UserMinus,
  Activity,
  Globe,
  Calendar,
  Zap,
  Crown,
  Shield,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const mrrData = [
  { month: "Jul", mrr: 2400, newMrr: 800, churnMrr: 200 },
  { month: "Aug", mrr: 4200, newMrr: 2100, churnMrr: 300 },
  { month: "Sep", mrr: 7800, newMrr: 4200, churnMrr: 600 },
  { month: "Oct", mrr: 12400, newMrr: 5600, churnMrr: 1000 },
  { month: "Nov", mrr: 18600, newMrr: 7200, churnMrr: 1000 },
  { month: "Dec", mrr: 24200, newMrr: 6800, churnMrr: 1200 },
  { month: "Jan", mrr: 31500, newMrr: 8800, churnMrr: 1500 },
  { month: "Feb", mrr: 38200, newMrr: 8200, churnMrr: 1500 },
];

const activeUsersData = [
  { month: "Jul", dau: 120, wau: 340, mau: 580 },
  { month: "Aug", dau: 210, wau: 560, mau: 920 },
  { month: "Sep", dau: 380, wau: 890, mau: 1450 },
  { month: "Oct", dau: 520, wau: 1200, mau: 2100 },
  { month: "Nov", dau: 710, wau: 1680, mau: 2800 },
  { month: "Dec", dau: 890, wau: 2050, mau: 3400 },
  { month: "Jan", dau: 1050, wau: 2400, mau: 4100 },
  { month: "Feb", dau: 1240, wau: 2800, mau: 4600 },
];

const churnData = [
  { month: "Jul", rate: 8.2 },
  { month: "Aug", rate: 7.1 },
  { month: "Sep", rate: 6.8 },
  { month: "Oct", rate: 5.9 },
  { month: "Nov", rate: 5.2 },
  { month: "Dec", rate: 4.8 },
  { month: "Jan", rate: 4.3 },
  { month: "Feb", rate: 3.9 },
];

const planDistribution = [
  { name: "Free", value: 2840, color: "#6b7280" },
  { name: "Pro", value: 1420, color: "#8b5cf6" },
  { name: "Team", value: 340, color: "#ec4899" },
];

const revenueByPlan = [
  { month: "Jul", pro: 1400, team: 1000 },
  { month: "Aug", pro: 2600, team: 1600 },
  { month: "Sep", pro: 4400, team: 3400 },
  { month: "Oct", pro: 6800, team: 5600 },
  { month: "Nov", pro: 9600, team: 9000 },
  { month: "Dec", pro: 12200, team: 12000 },
  { month: "Jan", pro: 15800, team: 15700 },
  { month: "Feb", pro: 18400, team: 19800 },
];

const recentWorkspaces = [
  { name: "Acme Corp", plan: "Team", members: 12, tasks: 847, mrr: 348, status: "active" },
  { name: "DesignStudio", plan: "Pro", members: 1, tasks: 234, mrr: 12, status: "active" },
  { name: "StartupXYZ", plan: "Team", members: 8, tasks: 1243, mrr: 232, status: "active" },
  { name: "FreelancerHub", plan: "Pro", members: 1, tasks: 89, mrr: 12, status: "trial" },
  { name: "Enterprise Ltd", plan: "Team", members: 45, tasks: 5621, mrr: 1305, status: "active" },
  { name: "SoloDesign", plan: "Free", members: 1, tasks: 23, mrr: 0, status: "active" },
];

const kpis = [
  {
    label: "Monthly Recurring Revenue",
    value: "$38,200",
    change: "+21.3%",
    trend: "up" as const,
    icon: DollarSign,
    color: "#10b981",
  },
  {
    label: "Active Workspaces",
    value: "4,600",
    change: "+12.2%",
    trend: "up" as const,
    icon: Globe,
    color: "#6366f1",
  },
  {
    label: "Daily Active Users",
    value: "1,240",
    change: "+18.1%",
    trend: "up" as const,
    icon: Users,
    color: "#8b5cf6",
  },
  {
    label: "Monthly Churn Rate",
    value: "3.9%",
    change: "-0.4%",
    trend: "down" as const,
    icon: UserMinus,
    color: "#f43f5e",
  },
  {
    label: "Avg Revenue Per User",
    value: "$8.30",
    change: "+5.1%",
    trend: "up" as const,
    icon: CreditCard,
    color: "#ec4899",
  },
  {
    label: "Net Revenue Retention",
    value: "112%",
    change: "+3.2%",
    trend: "up" as const,
    icon: Activity,
    color: "#f97316",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-white/40 mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-white/60">{p.name}:</span>
            <span className="text-white">
              {typeof p.value === "number" && p.name !== "rate"
                ? p.value >= 100
                  ? `$${p.value.toLocaleString()}`
                  : `${p.value}%`
                : p.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("8m");

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 text-orange-400 text-xs tracking-widest uppercase mb-2">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            Platform Analytics
          </div>
          <h1 className="text-3xl lg:text-4xl text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-white/40 mt-2">
            Real-time platform metrics for investor reporting and growth tracking.
          </p>
        </div>
        <div className="flex gap-2">
          {["1m", "3m", "8m", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                timeRange === range
                  ? "bg-white/10 text-white"
                  : "text-white/30 hover:text-white/50"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white/[0.02] border border-white/5 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: kpi.color + "15" }}
              >
                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
              </div>
              <div
                className={`flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded ${
                  kpi.trend === "up" && kpi.label !== "Monthly Churn Rate"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : kpi.trend === "down" && kpi.label === "Monthly Churn Rate"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {kpi.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {kpi.change}
              </div>
            </div>
            <p className="text-xl text-white">{kpi.value}</p>
            <p className="text-[10px] text-white/30 mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* MRR Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                MRR Growth
              </h3>
              <p className="text-xs text-white/30 mt-1">Monthly recurring revenue trend</p>
            </div>
            <span className="text-2xl text-emerald-400">$38.2K</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mrrData}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="mrr" stroke="#10b981" fill="url(#mrrGrad)" strokeWidth={2} name="MRR" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Active Users Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Active Users
              </h3>
              <p className="text-xs text-white/30 mt-1">DAU / WAU / MAU breakdown</p>
            </div>
            <span className="text-2xl text-indigo-400">4.6K</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={activeUsersData}>
              <defs>
                <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="wauGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="mauGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="mau" stroke="#a855f7" fill="url(#mauGrad)" strokeWidth={1.5} name="MAU" />
              <Area type="monotone" dataKey="wau" stroke="#8b5cf6" fill="url(#wauGrad)" strokeWidth={1.5} name="WAU" />
              <Area type="monotone" dataKey="dau" stroke="#6366f1" fill="url(#dauGrad)" strokeWidth={2} name="DAU" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue by Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 lg:col-span-2"
        >
          <h3 className="text-white text-sm flex items-center gap-2 mb-1">
            <BarChart3 className="w-4 h-4 text-pink-400" />
            Revenue by Plan
          </h3>
          <p className="text-xs text-white/30 mb-6">Pro vs Team plan revenue contribution</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueByPlan} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="pro" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Pro" />
              <Bar dataKey="team" fill="#ec4899" radius={[4, 4, 0, 0]} name="Team" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Plan Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
        >
          <h3 className="text-white text-sm flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-amber-400" />
            Plan Distribution
          </h3>
          <p className="text-xs text-white/30 mb-4">Workspace breakdown by plan</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={planDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {planDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-[#1a1a2e] border border-white/10 rounded-xl px-3 py-2 shadow-xl text-xs">
                        <span className="text-white">{d.name}: </span>
                        <span className="text-white/60">{d.value.toLocaleString()}</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {planDistribution.map((p) => (
              <div key={p.name} className="flex items-center gap-1.5 text-[10px] text-white/40">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                {p.name} ({p.value.toLocaleString()})
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Churn Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/[0.02] border border-white/5 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white text-sm flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              Churn Rate Trend
            </h3>
            <p className="text-xs text-white/30 mt-1">Monthly workspace churn rate (target: {"<"}5%)</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30">Current:</span>
            <span className="text-sm text-emerald-400">3.9%</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
              Below target
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={churnData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 10]} />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#1a1a2e] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
                      <p className="text-xs text-white/40 mb-1">{label}</p>
                      <p className="text-sm text-rose-400">{payload[0].value}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Target line */}
            <Line type="monotone" dataKey={() => 5} stroke="rgba(255,255,255,0.1)" strokeDasharray="5 5" dot={false} name="Target" />
            <Line type="monotone" dataKey="rate" stroke="#f43f5e" strokeWidth={2} dot={{ fill: "#f43f5e", r: 4 }} name="Churn Rate" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top Workspaces Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <h2 className="text-white/80 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-400" />
          Top Workspaces
        </h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5 text-white/20">
                  <th className="text-left px-5 py-3">Workspace</th>
                  <th className="text-left px-5 py-3">Plan</th>
                  <th className="text-left px-5 py-3">Members</th>
                  <th className="text-left px-5 py-3">Tasks</th>
                  <th className="text-left px-5 py-3">MRR</th>
                  <th className="text-left px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentWorkspaces.map((ws) => (
                  <tr key={ws.name} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 text-white/70 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-[10px] text-indigo-300">
                        {ws.name[0]}
                      </div>
                      {ws.name}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${
                          ws.plan === "Team"
                            ? "bg-pink-500/10 text-pink-400"
                            : ws.plan === "Pro"
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-white/5 text-white/30"
                        }`}
                      >
                        {ws.plan === "Team" && <Crown className="w-2.5 h-2.5 inline mr-1" />}
                        {ws.plan}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-white/40">{ws.members}</td>
                    <td className="px-5 py-3 text-white/40">{ws.tasks.toLocaleString()}</td>
                    <td className="px-5 py-3 text-emerald-400">${ws.mrr}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] ${
                          ws.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {ws.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Investor Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-white/80 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          Investor-Ready Metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "ARR", value: "$458K", desc: "Annual Run Rate", color: "#10b981" },
            { label: "LTV", value: "$342", desc: "Lifetime Value", color: "#6366f1" },
            { label: "CAC", value: "$28", desc: "Acquisition Cost", color: "#8b5cf6" },
            { label: "LTV:CAC", value: "12.2x", desc: "Ratio (target >3x)", color: "#ec4899" },
            { label: "Payback", value: "2.1mo", desc: "CAC Payback Period", color: "#f97316" },
            { label: "NRR", value: "112%", desc: "Net Revenue Retention", color: "#14b8a6" },
            { label: "Quick Ratio", value: "4.2", desc: "Growth Efficiency", color: "#a855f7" },
            { label: "Burn Multiple", value: "1.4x", desc: "Net Burn / Net New ARR", color: "#f43f5e" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="bg-white/[0.02] border border-white/5 rounded-xl p-4"
            >
              <p className="text-[10px] text-white/20 uppercase tracking-wider">{metric.label}</p>
              <p className="text-xl mt-1" style={{ color: metric.color }}>
                {metric.value}
              </p>
              <p className="text-[10px] text-white/30 mt-1">{metric.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
