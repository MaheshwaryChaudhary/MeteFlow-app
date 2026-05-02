import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowUpRight, Activity, TrendingUp, Zap, AlertTriangle } from "lucide-react";
import {
  avgLatency, currentPlan, endpointBreakdown, formatNumber, formatUsd,
  totalErrors30d, totalRequests30d, usageSeries,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

function Overview() {
  const errorRate = ((totalErrors30d / totalRequests30d) * 100).toFixed(2);
  const usagePct = Math.min(100, (totalRequests30d / currentPlan.included) * 100);
  const billed = formatUsd(currentPlan.price + Math.max(0, (totalRequests30d - currentPlan.included) / 1000) * currentPlan.overage);

  const stats = [
    { label: "Requests · 30d", value: formatNumber(totalRequests30d), delta: "+12.4%", icon: Activity, good: true },
    { label: "Error rate", value: `${errorRate}%`, delta: "-0.21%", icon: AlertTriangle, good: true },
    { label: "Avg latency", value: `${avgLatency}ms`, delta: "+3ms", icon: Zap, good: false },
    { label: "Billed (cycle)", value: billed, delta: "+18%", icon: TrendingUp, good: true },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Workspace</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Acme Inc.</h1>
        </div>
        <Link
          to="/dashboard/keys"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:scale-[1.02]"
        >
          Create API key <ArrowUpRight className="size-4" />
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs">{s.label}</span>
              <s.icon className="size-4" />
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">{s.value}</div>
            <div className={`mt-1 text-xs ${s.good ? "text-success" : "text-warning"}`}>{s.delta} vs last period</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Requests</div>
              <div className="text-xs text-muted-foreground">Last 30 days</div>
            </div>
            <Link to="/dashboard/usage" className="text-xs font-medium text-primary hover:underline">View detail</Link>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="reqg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.22 275)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.55 0.22 275)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 270)" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} stroke="oklch(0.5 0.03 265)" />
                <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="oklch(0.5 0.03 265)" tickFormatter={(v) => formatNumber(Number(v))} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 270)", boxShadow: "var(--shadow-md)" }}
                  formatter={(v) => formatNumber(Number(v))}
                />
                <Area type="monotone" dataKey="requests" stroke="oklch(0.55 0.22 275)" strokeWidth={2} fill="url(#reqg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-gradient-card p-6 shadow-sm">
            <div className="text-sm font-semibold">Plan usage</div>
            <div className="mt-1 text-xs text-muted-foreground">{currentPlan.name} plan</div>
            <div className="mt-5 flex items-baseline justify-between">
              <span className="text-2xl font-semibold">{formatNumber(totalRequests30d)}</span>
              <span className="text-sm text-muted-foreground">/ {formatNumber(currentPlan.included)}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-hero"
                style={{ width: `${usagePct}%` }}
              />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {usagePct.toFixed(0)}% used. Overage at ${currentPlan.overage}/1k.
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="text-sm font-semibold">Top endpoints</div>
            <ul className="mt-4 space-y-3">
              {endpointBreakdown.map((e) => (
                <li key={e.endpoint}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-xs">{e.endpoint}</span>
                    <span className="text-muted-foreground">{formatNumber(e.requests)}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-foreground/80" style={{ width: `${e.share * 2.5}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
