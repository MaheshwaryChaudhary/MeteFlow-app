import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Webhook } from "lucide-react";

export const Route = createFileRoute("/dashboard/webhooks")({
  component: WebhooksPage,
});

const INITIAL = [
  { id: "wh_1", url: "https://api.acme.com/hooks/meterflow", events: ["usage.threshold", "invoice.finalized"], status: "active" as const },
  { id: "wh_2", url: "https://hooks.slack.com/services/T0/B1/xyz", events: ["alert.spike"], status: "active" as const },
];

function WebhooksPage() {
  const [hooks, setHooks] = useState(INITIAL);
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Webhooks</h1>
          <p className="mt-1 text-sm text-muted-foreground">Get notified when things happen in your account.</p>
        </div>
        <button
          onClick={() => setHooks([...hooks, { id: `wh_${Date.now()}`, url: "https://example.com/hook", events: ["usage.threshold"], status: "active" }])}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:scale-[1.02]"
        >
          <Plus className="size-4" /> Add endpoint
        </button>
      </header>

      <div className="space-y-3">
        {hooks.map((h) => (
          <div key={h.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-foreground/5 text-foreground">
                <Webhook className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate font-mono text-sm">{h.url}</div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {h.events.map((e) => (
                    <span key={e} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{e}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-success">
                <span className="size-1.5 rounded-full bg-success" /> {h.status}
              </span>
              <button className="rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium hover:bg-muted">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
