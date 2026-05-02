import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Search } from "lucide-react";
import { generateLogs, INITIAL_LOGS, type LogEntry } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/logs")({
  component: LogsPage,
});

function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [streaming, setStreaming] = useState(true);
  const [filter, setFilter] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!streaming) return;
    intervalRef.current = setInterval(() => {
      setLogs((prev) => [...generateLogs(2), ...prev].slice(0, 200));
    }, 1500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [streaming]);

  const filtered = filter
    ? logs.filter((l) => `${l.endpoint} ${l.key} ${l.status} ${l.region}`.toLowerCase().includes(filter.toLowerCase()))
    : logs;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request logs</h1>
          <p className="mt-1 text-sm text-muted-foreground">Live stream of metered requests through the gateway.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter endpoint, key, status…"
              className="w-72 rounded-full border border-input bg-card py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => setStreaming((s) => !s)}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            {streaming ? <><Pause className="size-3.5" /> Pause</> : <><Play className="size-3.5" /> Resume</>}
            <span className={`ml-1 size-1.5 rounded-full ${streaming ? "animate-pulse bg-success" : "bg-muted-foreground"}`} />
          </button>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-muted/70 text-left text-xs uppercase tracking-wider text-muted-foreground backdrop-blur">
              <tr>
                <th className="px-5 py-3 font-medium">Time</th>
                <th className="px-5 py-3 font-medium">Endpoint</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Latency</th>
                <th className="px-5 py-3 font-medium">Key</th>
                <th className="px-5 py-3 font-medium">Region</th>
                <th className="px-5 py-3 font-medium">IP</th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs">
              {filtered.map((l) => (
                <tr key={l.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-5 py-2.5 text-muted-foreground">{new Date(l.ts).toLocaleTimeString()}</td>
                  <td className="px-5 py-2.5">{l.endpoint}</td>
                  <td className="px-5 py-2.5">
                    <StatusBadge code={l.status} />
                  </td>
                  <td className="px-5 py-2.5 text-muted-foreground">{l.latency}ms</td>
                  <td className="px-5 py-2.5 text-muted-foreground">{l.key}</td>
                  <td className="px-5 py-2.5 text-muted-foreground">{l.region}</td>
                  <td className="px-5 py-2.5 text-muted-foreground">{l.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ code }: { code: number }) {
  const cls =
    code >= 500 ? "bg-destructive/15 text-destructive ring-destructive/30" :
    code === 429 ? "bg-warning/20 text-warning-foreground ring-warning/40" :
    code >= 400 ? "bg-warning/15 text-warning-foreground ring-warning/30" :
    "bg-success/15 text-success ring-success/30";
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] ring-1 ${cls}`}>{code}</span>
  );
}
