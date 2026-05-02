import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Activity, BarChart3, Gauge, KeyRound, Receipt, Settings, Webhook, LayoutDashboard,
} from "lucide-react";
import type { ComponentType } from "react";

const NAV: { to: string; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/keys", label: "API keys", icon: KeyRound },
  { to: "/dashboard/usage", label: "Usage", icon: BarChart3 },
  { to: "/dashboard/logs", label: "Logs", icon: Activity },
  { to: "/dashboard/billing", label: "Billing", icon: Receipt },
  { to: "/dashboard/webhooks", label: "Webhooks", icon: Webhook },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 lg:px-8">
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 flex-col rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm backdrop-blur lg:flex">
          <Link to="/" className="mb-6 flex items-center gap-2 px-2 font-semibold">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-glow">
              <Gauge className="size-4" />
            </span>
            MeterFlow
          </Link>
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => {
              const active = pathname === n.to || (n.to !== "/dashboard" && pathname.startsWith(n.to));
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-xl border border-border/60 bg-gradient-card p-4 text-sm">
            <div className="font-semibold">Growth plan</div>
            <p className="mt-1 text-xs text-muted-foreground">Upgrade for SSO, audit logs, and 1k req/s.</p>
            <Link to="/dashboard/billing" className="mt-3 inline-flex text-xs font-medium text-primary hover:underline">
              See plans →
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
