import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, KeyRound, Plus, Shield } from "lucide-react";
import { API_KEYS, type ApiKey } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/keys")({
  component: KeysPage,
});

function KeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(API_KEYS);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");

  function createKey() {
    if (!newName.trim()) return;
    const id = `k_${Date.now()}`;
    const prefix = `mf_live_${Math.random().toString(36).slice(2, 6)}`;
    setKeys([
      {
        id, name: newName.trim(), prefix,
        masked: `${prefix}••••••••••••${Math.random().toString(36).slice(2, 6)}`,
        created: new Date().toISOString().slice(0, 10),
        lastUsed: "—", requests30d: 0, status: "active", env: "live",
      },
      ...keys,
    ]);
    setNewName("");
    setShowCreate(false);
  }

  function revoke(id: string) {
    setKeys(keys.map((k) => (k.id === id ? { ...k, status: "revoked" as const } : k)));
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API keys</h1>
          <p className="mt-1 text-sm text-muted-foreground">Issue and rotate keys for each environment.</p>
        </div>
        <button
          onClick={() => setShowCreate((s) => !s)}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:scale-[1.02]"
        >
          <Plus className="size-4" /> New key
        </button>
      </header>

      {showCreate && (
        <div className="rounded-2xl border border-border/60 bg-gradient-card p-5 shadow-sm">
          <div className="text-sm font-semibold">Create new API key</div>
          <div className="mt-3 flex gap-2">
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Mobile production"
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button onClick={createKey} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background">
              Generate
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Key</th>
              <th className="px-5 py-3 font-medium">Env</th>
              <th className="px-5 py-3 font-medium">Last used</th>
              <th className="px-5 py-3 text-right font-medium">Requests · 30d</th>
              <th className="px-5 py-3 text-right font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k.id} className="border-t border-border/60">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 font-medium">
                    <KeyRound className="size-4 text-muted-foreground" />
                    {k.name}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">Created {k.created}</div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    {k.masked}
                    <button
                      onClick={() => navigator.clipboard?.writeText(k.prefix)}
                      className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label="Copy"
                    >
                      <Copy className="size-3.5" />
                    </button>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    k.env === "live" ? "bg-success/15 text-success-foreground/80 ring-1 ring-success/30" : "bg-warning/15 text-warning-foreground/80 ring-1 ring-warning/30"
                  }`}>
                    {k.env}
                  </span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{k.lastUsed}</td>
                <td className="px-5 py-4 text-right font-mono">{k.requests30d.toLocaleString()}</td>
                <td className="px-5 py-4 text-right">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                    k.status === "active" ? "text-success" : "text-muted-foreground"
                  }`}>
                    <span className={`size-1.5 rounded-full ${k.status === "active" ? "bg-success" : "bg-muted-foreground/50"}`} />
                    {k.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  {k.status === "active" && (
                    <button
                      onClick={() => revoke(k.id)}
                      className="text-xs font-medium text-destructive hover:underline"
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
        <Shield className="mt-0.5 size-4 shrink-0" />
        Keys are shown once at creation. Store them in your secret manager — MeterFlow never logs the full value after issue.
      </div>
    </div>
  );
}
