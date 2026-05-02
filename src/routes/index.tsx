import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity, ArrowRight, BarChart3, Check, KeyRound, Receipt, Shield, Sparkles, Webhook, Zap,
} from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { PLANS } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <Hero />
      <LogoBar />
      <Features />
      <CodeShowcase />
      <PricingPreview />
      <CTA />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-80" />
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-primary" />
            New — Realtime usage stream + Stripe billing
          </div>
          <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight md:text-7xl">
            The billing layer for{" "}
            <span className="text-gradient">API companies</span>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Meter every request, enforce rate limits, and turn usage into revenue. MeterFlow is the
            invoice-grade gateway your finance team will actually trust.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-elegant transition-transform hover:scale-[1.02]"
            >
              Open the dashboard <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/docs"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Read the docs
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            No credit card · 10,000 free requests / month
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[2rem] bg-gradient-hero opacity-25 blur-3xl" />
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-elegant">
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
              <span className="size-3 rounded-full bg-destructive/60" />
              <span className="size-3 rounded-full bg-warning/70" />
              <span className="size-3 rounded-full bg-success/70" />
              <span className="ml-3 font-mono text-xs text-muted-foreground">app.meterflow.io / dashboard</span>
            </div>
            <DashboardPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  const stats = [
    { label: "Requests · 30d", value: "947,734", delta: "+12.4%" },
    { label: "Error rate", value: "0.83%", delta: "-0.2%" },
    { label: "Avg latency", value: "94ms", delta: "+3ms" },
    { label: "Billed this cycle", value: "$184.32", delta: "+18%" },
  ];
  return (
    <div className="grid gap-6 bg-gradient-card p-6 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-border/50 bg-background p-4">
          <div className="text-xs text-muted-foreground">{s.label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</div>
          <div className="mt-1 text-xs text-success">{s.delta}</div>
        </div>
      ))}
      <div className="md:col-span-4">
        <MiniChart />
      </div>
    </div>
  );
}

function MiniChart() {
  const points = Array.from({ length: 40 }, (_, i) =>
    50 + Math.sin(i / 3) * 18 + Math.cos(i / 7) * 12 + i * 0.4,
  );
  const max = Math.max(...points);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * 100} ${100 - (p / max) * 90}`)
    .join(" ");
  return (
    <div className="relative h-40 overflow-hidden rounded-xl border border-border/50 bg-background p-4">
      <div className="text-xs font-medium text-muted-foreground">Requests / hour</div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 mt-8 size-full">
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.22 275)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.55 0.22 275)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L 100 100 L 0 100 Z`} fill="url(#g1)" />
        <path d={path} fill="none" stroke="oklch(0.55 0.22 275)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

function LogoBar() {
  const names = ["Linear", "Vercel", "Stripe", "Notion", "Figma", "Loom"];
  return (
    <section className="border-y border-border/60 bg-card/50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
          Trusted by API teams shipping at scale
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {names.map((n) => (
            <span key={n} className="text-lg font-semibold tracking-tight text-muted-foreground/70">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { icon: Zap, title: "API gateway", desc: "Drop-in proxy with sub-millisecond overhead. Authenticate, meter, and forward." },
    { icon: KeyRound, title: "Key management", desc: "Issue, rotate, scope, and revoke keys. Per-key rate limits and quotas." },
    { icon: BarChart3, title: "Realtime analytics", desc: "Latency, error rate, and request volume — sliced by key, endpoint, or region." },
    { icon: Shield, title: "Rate limiting", desc: "Token-bucket limits per key, IP, or plan. Burst windows that just work." },
    { icon: Receipt, title: "Usage-based billing", desc: "Convert events into invoices. Stripe integration with overage pricing." },
    { icon: Webhook, title: "Webhooks & alerts", desc: "Notify on quota thresholds, anomalies, and failed payments." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-sm font-semibold uppercase tracking-wider text-primary">Platform</div>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Everything you need to ship a metered API
        </h2>
        <p className="mt-4 text-pretty text-muted-foreground">
          Stop stitching together middleware, cron jobs, and spreadsheets. MeterFlow is one
          opinionated stack from gateway to invoice.
        </p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-card p-6 transition-shadow hover:shadow-elegant"
          >
            <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-foreground/5 text-foreground transition-colors group-hover:bg-gradient-hero group-hover:text-primary-foreground">
              <f.icon className="size-5" />
            </div>
            <div className="text-lg font-semibold">{f.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CodeShowcase() {
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-primary-glow">Five-minute install</div>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Point your traffic at MeterFlow.
          </h2>
          <p className="mt-4 max-w-md text-background/70">
            Replace your hostname. We authenticate, log, rate-limit, and forward — then bill at the
            end of the cycle.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-background/80">
            {["Zero SDK required", "Webhook-driven invoicing", "SOC 2 Type II"].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <Check className="size-4 text-success" /> {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2 font-mono text-xs text-background/60">
            <Activity className="size-3.5" /> terminal
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-background/90">
{`# Original
curl https://api.yourapp.com/v1/widgets

# With MeterFlow
curl https://gw.meterflow.io/v1/widgets \\
  -H "Authorization: Bearer mf_live_8aZ2..."

# Response includes usage headers
< x-meterflow-quota-remaining: 482,113
< x-meterflow-rate-limit: 100
< x-meterflow-cost: 0.0006`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-sm font-semibold uppercase tracking-wider text-primary">Pricing</div>
        <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Pay for what you meter
        </h2>
        <p className="mt-4 text-muted-foreground">Volume discounts kick in automatically.</p>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.id}
            className={`relative flex flex-col rounded-2xl border p-8 ${
              p.highlight
                ? "border-transparent bg-gradient-hero text-primary-foreground shadow-glow"
                : "border-border/60 bg-card"
            }`}
          >
            {p.highlight && (
              <div className="absolute -top-3 right-6 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                Most popular
              </div>
            )}
            <div className="text-sm font-semibold uppercase tracking-wider opacity-80">{p.name}</div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight">${p.price}</span>
              <span className="opacity-70">/mo</span>
            </div>
            <div className={`mt-1 text-sm ${p.highlight ? "opacity-80" : "text-muted-foreground"}`}>
              {p.included.toLocaleString()} requests included
            </div>
            <ul className="mt-6 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <Check className="size-4" /> {f}
                </li>
              ))}
              <li className="flex items-center gap-2 opacity-90">
                <Check className="size-4" /> ${p.overage.toFixed(2)} per 1k overage
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Check className="size-4" /> {p.rateLimit}
              </li>
            </ul>
            <Link
              to="/dashboard/billing"
              className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                p.highlight
                  ? "bg-background text-foreground"
                  : "bg-foreground text-background"
              }`}
            >
              {p.price === 0 ? "Start free" : "Choose plan"}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-hero p-12 text-center text-primary-foreground shadow-elegant">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-40 mix-blend-overlay" />
        <h3 className="relative text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Ship metered APIs by Friday.
        </h3>
        <p className="relative mx-auto mt-3 max-w-xl opacity-90">
          Join hundreds of teams turning API calls into recurring revenue.
        </p>
        <Link
          to="/dashboard"
          className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-elegant transition-transform hover:scale-[1.02]"
        >
          Open the dashboard <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
