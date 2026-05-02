import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Workspace preferences and team.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Workspace">
          <Field label="Name" value="Acme Inc." />
          <Field label="Workspace ID" value="ws_8aZ2k0Pq" mono />
          <Field label="Region" value="us-east-1" />
        </Card>

        <Card title="Owner">
          <Field label="Email" value="ops@acme.com" />
          <Field label="Role" value="Owner" />
          <Field label="MFA" value="Enabled" />
        </Card>

        <Card title="Rate limits">
          <Field label="Default" value="100 req/s · burst 200" />
          <Field label="Per IP" value="20 req/s" />
        </Card>

        <Card title="Danger zone">
          <p className="text-sm text-muted-foreground">Permanently delete this workspace and all associated data.</p>
          <button className="mt-4 rounded-full border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/15">
            Delete workspace
          </button>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-4 text-sm font-semibold">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/40 pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
