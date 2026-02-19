import { useState } from "react";
import { motion } from "motion/react";
import {
  CreditCard,
  ArrowRight,
  Check,
  X,
  Crown,
  Users,
  Zap,
  Shield,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  Infinity,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    color: "#6b7280",
    icon: Zap,
    description: "For individuals getting started",
    features: [
      { name: "1 workspace", included: true },
      { name: "1 user only", included: true },
      { name: "3 schedules", included: true },
      { name: "50 tasks/month", included: true },
      { name: "Daily & weekly views", included: true },
      { name: "Basic task management", included: true },
      { name: "Monthly view", included: false },
      { name: "Recurring tasks", included: false },
      { name: "Team collaboration", included: false },
      { name: "API access", included: false },
      { name: "Priority support", included: false },
    ],
    limits: { workspaces: 1, members: 1, schedules: 3, tasks: 50 },
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    color: "#8b5cf6",
    icon: Crown,
    popular: true,
    description: "For power users and freelancers",
    features: [
      { name: "3 workspaces", included: true },
      { name: "1 user per workspace", included: true },
      { name: "Unlimited schedules", included: true },
      { name: "Unlimited tasks", included: true },
      { name: "All calendar views", included: true },
      { name: "Recurring tasks (RFC 5545)", included: true },
      { name: "Drag-and-drop scheduling", included: true },
      { name: "Bulk task operations", included: true },
      { name: "Priority support", included: true },
      { name: "Team collaboration", included: false },
      { name: "API access", included: false },
    ],
    limits: { workspaces: 3, members: 1, schedules: "∞", tasks: "∞" },
  },
  {
    name: "Team",
    price: "$29",
    period: "/user/month",
    color: "#ec4899",
    icon: Users,
    description: "For teams and organizations",
    features: [
      { name: "Unlimited workspaces", included: true },
      { name: "Up to 50 members", included: true },
      { name: "Unlimited schedules", included: true },
      { name: "Unlimited tasks", included: true },
      { name: "All calendar views", included: true },
      { name: "Recurring tasks (RFC 5545)", included: true },
      { name: "Team collaboration", included: true },
      { name: "Real-time sync", included: true },
      { name: "Role-based access", included: true },
      { name: "API access", included: true },
      { name: "Dedicated support", included: true },
    ],
    limits: { workspaces: "∞", members: 50, schedules: "∞", tasks: "∞" },
  },
];

const webhookEvents = [
  { event: "checkout.session.completed", action: "Create subscription, upgrade workspace plan", critical: true },
  { event: "customer.subscription.updated", action: "Sync plan changes, update feature gates", critical: true },
  { event: "customer.subscription.deleted", action: "Downgrade to Free, remove gated features", critical: true },
  { event: "invoice.payment_succeeded", action: "Record invoice, send receipt email", critical: false },
  { event: "invoice.payment_failed", action: "Send dunning email, set grace period (3 days)", critical: true },
  { event: "customer.subscription.trial_will_end", action: "Send trial ending notification (3 days before)", critical: false },
];

const billingSteps = [
  { step: "1", title: "Plan Selection", desc: "User selects plan from pricing page or upgrade modal", actor: "Frontend" },
  { step: "2", title: "Checkout Session", desc: "Backend creates Stripe Checkout Session with workspace metadata", actor: "Backend" },
  { step: "3", title: "Stripe Checkout", desc: "User enters payment details on Stripe-hosted checkout page", actor: "Stripe" },
  { step: "4", title: "Webhook: checkout.session.completed", desc: "Stripe fires webhook → Backend creates subscription record", actor: "Stripe → Backend" },
  { step: "5", title: "Plan Activation", desc: "Workspace plan updated, feature gates unlocked, members notified", actor: "Backend" },
  { step: "6", title: "Confirmation", desc: "User redirected to workspace with new plan active", actor: "Frontend" },
];

const featureGates = [
  { feature: "Monthly Calendar View", free: false, pro: true, team: true },
  { feature: "Recurring Tasks", free: false, pro: true, team: true },
  { feature: "Drag & Drop Scheduling", free: true, pro: true, team: true },
  { feature: "Bulk Operations", free: false, pro: true, team: true },
  { feature: "Team Collaboration", free: false, pro: false, team: true },
  { feature: "Real-time Sync", free: false, pro: false, team: true },
  { feature: "Role-based Access", free: false, pro: false, team: true },
  { feature: "API Access", free: false, pro: false, team: true },
  { feature: "Audit Logs", free: false, pro: false, team: true },
  { feature: "Custom Branding", free: false, pro: false, team: true },
  { feature: "Priority Support", free: false, pro: true, team: true },
  { feature: "SSO (SAML)", free: false, pro: false, team: true },
];

export function BillingFlow() {
  const [selectedPlan, setSelectedPlan] = useState("Pro");

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 text-pink-400 text-xs tracking-widest uppercase mb-2">
          <div className="w-2 h-2 rounded-full bg-pink-400" />
          Stripe Integration
        </div>
        <h1 className="text-3xl lg:text-4xl text-white tracking-tight">
          Billing Flow
        </h1>
        <p className="text-white/40 mt-2 max-w-2xl">
          Stripe-powered billing with three subscription tiers. Feature gating enforced at both API
          and UI levels. Webhook-driven state management for subscription lifecycle.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-pink-400" />
          Subscription Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative bg-white/[0.02] border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.name
                  ? "border-white/20 bg-white/[0.04]"
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: plan.color + "15" }}
                >
                  <plan.icon className="w-5 h-5" style={{ color: plan.color }} />
                </div>
                <div>
                  <h3 className="text-white text-sm">{plan.name}</h3>
                  <p className="text-[10px] text-white/30">{plan.description}</p>
                </div>
              </div>

              <div className="mb-5">
                <span className="text-3xl text-white">{plan.price}</span>
                <span className="text-white/30 text-sm">{plan.period}</span>
              </div>

              <div className="space-y-2">
                {plan.features.map((f) => (
                  <div
                    key={f.name}
                    className="flex items-center gap-2 text-xs"
                  >
                    {f.included ? (
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    ) : (
                      <X className="w-3 h-3 text-white/10 shrink-0" />
                    )}
                    <span className={f.included ? "text-white/60" : "text-white/20"}>
                      {f.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/5">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  {Object.entries(plan.limits).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-white/30">
                      <span>{key}:</span>
                      <span className="text-white/50 flex items-center gap-0.5">
                        {val === "∞" ? <Infinity className="w-3 h-3" /> : val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Checkout Flow */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-blue-400" />
          Checkout Flow
        </h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
          <div className="space-y-0">
            {billingSteps.map((step, i) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-300 shrink-0">
                    {step.step}
                  </div>
                  {i < billingSteps.length - 1 && (
                    <div className="w-px h-full bg-white/5 my-1" />
                  )}
                </div>
                <div className="pb-6 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white text-sm">{step.title}</h3>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/30">
                      {step.actor}
                    </span>
                  </div>
                  <p className="text-xs text-white/30 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Webhook Events */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-emerald-400" />
          Stripe Webhook Events
        </h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5 text-white/20">
                  <th className="text-left px-5 py-3">Event</th>
                  <th className="text-left px-5 py-3">Action</th>
                  <th className="text-left px-5 py-3">Priority</th>
                </tr>
              </thead>
              <tbody>
                {webhookEvents.map((ev) => (
                  <tr key={ev.event} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-mono text-emerald-400/70">{ev.event}</td>
                    <td className="px-5 py-3 text-white/40">{ev.action}</td>
                    <td className="px-5 py-3">
                      {ev.critical ? (
                        <span className="flex items-center gap-1 text-red-400">
                          <AlertTriangle className="w-3 h-3" /> Critical
                        </span>
                      ) : (
                        <span className="text-white/20">Normal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Feature Gate Matrix */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="text-white/80 mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          Feature Gate Matrix
        </h2>
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-white/30">Feature</th>
                  <th className="text-center px-5 py-3 text-gray-400">Free</th>
                  <th className="text-center px-5 py-3 text-purple-400">Pro</th>
                  <th className="text-center px-5 py-3 text-pink-400">Team</th>
                </tr>
              </thead>
              <tbody>
                {featureGates.map((fg) => (
                  <tr key={fg.feature} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-2.5 text-white/50">{fg.feature}</td>
                    <td className="px-5 py-2.5 text-center">
                      {fg.free ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-white/10 mx-auto" />}
                    </td>
                    <td className="px-5 py-2.5 text-center">
                      {fg.pro ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-white/10 mx-auto" />}
                    </td>
                    <td className="px-5 py-2.5 text-center">
                      {fg.team ? <Check className="w-3.5 h-3.5 text-emerald-400 mx-auto" /> : <X className="w-3.5 h-3.5 text-white/10 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Implementation Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h3 className="text-white text-sm mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            Backend Gate Implementation
          </h3>
          <div className="space-y-2 text-xs text-white/40 font-mono">
            <p className="text-white/20">// NestJS Guard Decorator Usage</p>
            <p className="text-purple-400">@UseGuards(FeatureGateGuard)</p>
            <p className="text-blue-400">@RequireFeature('recurring_tasks')</p>
            <p className="text-white/60">@Post(':id/recurrence')</p>
            <p className="text-white/40">async setRecurrence() {"{ ... }"}</p>
          </div>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5">
          <h3 className="text-white text-sm mb-3 flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-blue-400" />
            Frontend Gate Implementation
          </h3>
          <div className="space-y-2 text-xs text-white/40 font-mono">
            <p className="text-white/20">// React Hook Usage</p>
            <p className="text-blue-400">{"const { canUse, plan } = useFeatureGate();"}</p>
            <p className="text-white/60">&nbsp;</p>
            <p className="text-purple-400">{"if (!canUse('recurring_tasks')) {"}</p>
            <p className="text-white/60">&nbsp;&nbsp;{"return <UpgradeModal feature='recurring' />;"}</p>
            <p className="text-purple-400">{"}"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
