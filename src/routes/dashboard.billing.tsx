import { createFileRoute } from "@tanstack/react-router";
import { Check, CreditCard, Download } from "lucide-react";
import { currentPlan, formatNumber, formatUsd, invoices, PLANS, totalRequests30d } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/billing")({
  component: BillingPage,
});

function BillingPage() {
  const overageReq = Math.max(0, totalRequests30d - currentPlan.included);
  const overageCost = (overageReq / 1000) * currentPlan.overage;
  const subtotal = currentPlan.price + overageCost;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage subscription, payment method and invoices.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-gradient-card p-6 shadow-sm lg:col-span-2">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Current cycle</div>
          <div className="mt-1 text-3xl font-semibold tracking-tight">{formatUsd(subtotal)}</div>
          <p className="mt-1 text-sm text-muted-foreground">Estimate for {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}</p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <Row label="Plan" value={`${currentPlan.name} · ${formatUsd(currentPlan.price)}`} />
            <Row label="Included" value={`${formatNumber(currentPlan.included)} req`} />
            <Row label="Used" value={`${formatNumber(totalRequests30d)} req`} />
            <Row label="Overage" value={`${formatNumber(overageReq)} req`} />
            <Row label="Overage rate" value={`${formatUsd(currentPlan.overage)} / 1k`} />
            <Row label="Overage charge" value={formatUsd(overageCost)} />
          </dl>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <div className="text-sm font-semibold">Payment method</div>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-border/60 bg-background p-4">
            <div className="grid size-10 place-items-center rounded-lg bg-foreground text-background">
              <CreditCard className="size-4" />
            </div>
            <div className="text-sm">
              <div className="font-medium">Visa ending 4242</div>
              <div className="text-xs text-muted-foreground">Expires 12/27</div>
            </div>
          </div>
          <button className="mt-4 w-full rounded-full border border-border/60 bg-background py-2 text-sm font-medium hover:bg-muted">
            Update card
          </button>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Plans</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {PLANS.map((p) => {
            const isCurrent = p.id === currentPlan.id;
            return (
              <div
                key={p.id}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  isCurrent ? "border-primary bg-gradient-card shadow-glow" : "border-border/60 bg-card"
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-3 right-5 rounded-full bg-foreground px-3 py-0.5 text-xs font-semibold text-background">
                    Current
                  </span>
                )}
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">${p.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{formatNumber(p.included)} included</div>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2"><Check className="size-4 text-success" /> {f}</li>
                  ))}
                </ul>
                <button
                  disabled={isCurrent}
                  className={`mt-6 rounded-full px-4 py-2 text-sm font-medium ${
                    isCurrent
                      ? "cursor-not-allowed bg-muted text-muted-foreground"
                      : "bg-foreground text-background hover:scale-[1.02]"
                  }`}
                >
                  {isCurrent ? "Active" : p.price > currentPlan.price ? "Upgrade" : "Downgrade"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-border/60 bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border/60 p-5">
          <div>
            <div className="text-sm font-semibold">Invoices</div>
            <div className="text-xs text-muted-foreground">Last 12 months</div>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Invoice</th>
              <th className="px-5 py-3 font-medium">Period</th>
              <th className="px-5 py-3 font-medium">Requests</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {invoices.map((i) => (
              <tr key={i.id} className="border-t border-border/60">
                <td className="px-5 py-3 font-mono text-xs">{i.id}</td>
                <td className="px-5 py-3">{i.period}</td>
                <td className="px-5 py-3 text-muted-foreground">{formatNumber(i.requests)}</td>
                <td className="px-5 py-3 font-medium">{formatUsd(i.amount)}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ring-1 ${
                    i.status === "Paid" ? "bg-success/15 text-success ring-success/30" : "bg-warning/15 text-warning-foreground ring-warning/30"
                  }`}>{i.status}</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    <Download className="size-3.5" /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background p-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium">{value}</dd>
    </div>
  );
}
