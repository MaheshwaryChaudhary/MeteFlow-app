import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { endpointBreakdown, formatNumber, usageSeries } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/usage")({
  component: UsagePage,
});

function UsagePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Usage analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Volume, latency and errors across your gateway.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Requests" subtitle="Daily totals · 30 days">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={usageSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 270)" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} stroke="oklch(0.5 0.03 265)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="oklch(0.5 0.03 265)" tickFormatter={(v) => formatNumber(Number(v))} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 270)" }}
                formatter={(v) => formatNumber(Number(v))}
              />
              <Bar dataKey="requests" fill="oklch(0.55 0.22 275)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Latency" subtitle="p50 (ms)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={usageSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 270)" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} stroke="oklch(0.5 0.03 265)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="oklch(0.5 0.03 265)" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 270)" }} />
              <Line type="monotone" dataKey="latency" stroke="oklch(0.7 0.2 340)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Errors" subtitle="4xx + 5xx">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={usageSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 270)" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={11} stroke="oklch(0.5 0.03 265)" />
              <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="oklch(0.5 0.03 265)" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 270)" }} />
              <Bar dataKey="errors" fill="oklch(0.65 0.2 25)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Top endpoints" subtitle="Share of requests">
          <ul className="space-y-4 p-2">
            {endpointBreakdown.map((e) => (
              <li key={e.endpoint}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono text-xs">{e.endpoint}</span>
                  <span className="text-muted-foreground">{e.share}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-gradient-hero" style={{ width: `${e.share * 2.5}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="mb-3">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}
