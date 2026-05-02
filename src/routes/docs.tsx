import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Book, Code, Rocket, Shield } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/docs")({
  component: DocsPage,
  head: () => ({ meta: [
    { title: "Docs · MeterFlow" },
    { name: "description", content: "Quickstart and reference for MeterFlow API gateway." },
  ]}),
});

function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[220px_1fr]">
        <aside className="text-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Get started</div>
          <ul className="mt-3 space-y-2">
            {["Quickstart", "Authentication", "Rate limits", "Webhooks", "Billing API"].map((x) => (
              <li key={x} className="cursor-pointer rounded-lg px-2 py-1.5 hover:bg-muted">{x}</li>
            ))}
          </ul>
        </aside>

        <article className="prose-invert max-w-none">
          <div className="text-sm font-semibold uppercase tracking-wider text-primary">Documentation</div>
          <h1 className="mt-2 text-balance text-4xl font-bold tracking-tight md:text-5xl">Quickstart</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Send your first metered request in under five minutes.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              { icon: Rocket, title: "1. Create a key", body: "Issue your first API key from the dashboard." },
              { icon: Code, title: "2. Point traffic at gateway", body: "Replace your API hostname with gw.meterflow.io." },
              { icon: Shield, title: "3. Enforce limits", body: "Set per-key quotas and rate limits." },
              { icon: Book, title: "4. Bill on usage", body: "Stripe invoices generated at end of cycle." },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl border border-border/60 bg-gradient-card p-6">
                <s.icon className="size-5 text-primary" />
                <div className="mt-3 font-semibold">{s.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold tracking-tight">Sample request</h2>
          <pre className="mt-4 overflow-x-auto rounded-2xl bg-foreground p-6 font-mono text-sm leading-relaxed text-background/90">
{`curl https://gw.meterflow.io/v1/widgets \\
  -H "Authorization: Bearer mf_live_8aZ2..."

# Headers returned
< x-meterflow-quota-remaining: 482113
< x-meterflow-rate-limit: 100
< x-meterflow-cost: 0.0006`}
          </pre>

          <div className="mt-10">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Back to home
            </Link>
          </div>
        </article>
      </section>
      <SiteFooter />
    </div>
  );
}
