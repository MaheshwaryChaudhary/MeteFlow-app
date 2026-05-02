import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { PLANS } from "@/lib/mock-data";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({ meta: [
    { title: "Pricing · MeterFlow" },
    { name: "description", content: "Simple usage-based pricing for API gateways. Free up to 10k requests / month." },
  ]}),
});

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-balance text-5xl font-bold tracking-tight md:text-6xl">
            Predictable pricing. <span className="text-gradient">Real volume discounts.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Start free. Upgrade when your usage warrants it. Every plan includes the full gateway,
            analytics, and Stripe billing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 lg:grid-cols-3">
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
                <span className="absolute -top-3 right-6 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                  Most popular
                </span>
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
                  <li key={f} className="flex items-center gap-2"><Check className="size-4" /> {f}</li>
                ))}
                <li className="flex items-center gap-2 opacity-90"><Check className="size-4" /> ${p.overage.toFixed(2)} per 1k overage</li>
                <li className="flex items-center gap-2 opacity-90"><Check className="size-4" /> {p.rateLimit}</li>
              </ul>
              <Link
                to="/dashboard/billing"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  p.highlight ? "bg-background text-foreground" : "bg-foreground text-background"
                }`}
              >
                {p.price === 0 ? "Start free" : "Choose plan"}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to home
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
