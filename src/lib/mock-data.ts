// Mock data store for MeterFlow demo. All values are deterministic-ish but feel live.

export type Plan = {
  id: string;
  name: string;
  price: number; // monthly USD
  included: number; // included requests / month
  overage: number; // USD per 1k requests
  rateLimit: string;
  features: string[];
  highlight?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    included: 10_000,
    overage: 0.6,
    rateLimit: "10 req/s",
    features: ["1 API key", "Basic analytics", "Community support"],
  },
  {
    id: "growth",
    name: "Growth",
    price: 49,
    included: 500_000,
    overage: 0.3,
    rateLimit: "100 req/s",
    features: ["10 API keys", "Realtime dashboard", "Webhooks", "Email support"],
    highlight: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: 249,
    included: 5_000_000,
    overage: 0.12,
    rateLimit: "1,000 req/s",
    features: ["Unlimited keys", "Audit logs", "SSO + RBAC", "Priority support"],
  },
];

export type ApiKey = {
  id: string;
  name: string;
  prefix: string;
  masked: string;
  created: string;
  lastUsed: string;
  requests30d: number;
  status: "active" | "revoked";
  env: "live" | "test";
};

export const API_KEYS: ApiKey[] = [
  { id: "k_1", name: "Production gateway", prefix: "mf_live_8aZ2", masked: "mf_live_8aZ2••••••••••••3xQp", created: "2025-01-12", lastUsed: "2 min ago", requests30d: 482_113, status: "active", env: "live" },
  { id: "k_2", name: "Mobile app", prefix: "mf_live_44Kp", masked: "mf_live_44Kp••••••••••••91Lm", created: "2025-02-04", lastUsed: "14 min ago", requests30d: 128_902, status: "active", env: "live" },
  { id: "k_3", name: "Staging sandbox", prefix: "mf_test_q9Wd", masked: "mf_test_q9Wd••••••••••••77Vt", created: "2025-03-21", lastUsed: "3 hr ago", requests30d: 8_231, status: "active", env: "test" },
  { id: "k_4", name: "Old worker (rotated)", prefix: "mf_live_zz01", masked: "mf_live_zz01••••••••••••0000", created: "2024-09-08", lastUsed: "37 days ago", requests30d: 0, status: "revoked", env: "live" },
];

// 30-day usage series — looks organic with weekday rhythm.
export const usageSeries = Array.from({ length: 30 }, (_, i) => {
  const day = new Date();
  day.setDate(day.getDate() - (29 - i));
  const weekday = day.getDay();
  const base = 14_000 + Math.sin(i / 3) * 3_500 + (weekday === 0 || weekday === 6 ? -4_000 : 2_500);
  const noise = (Math.sin(i * 7.13) + Math.cos(i * 2.7)) * 1_400;
  const requests = Math.max(2_000, Math.round(base + noise + i * 220));
  const errors = Math.round(requests * (0.008 + Math.sin(i / 5) * 0.004));
  return {
    date: day.toISOString().slice(5, 10),
    requests,
    errors,
    latency: Math.round(80 + Math.sin(i / 2) * 22 + (weekday === 1 ? 18 : 0)),
  };
});

export const totalRequests30d = usageSeries.reduce((a, b) => a + b.requests, 0);
export const totalErrors30d = usageSeries.reduce((a, b) => a + b.errors, 0);
export const avgLatency = Math.round(
  usageSeries.reduce((a, b) => a + b.latency, 0) / usageSeries.length,
);

// Live request log
const ENDPOINTS = [
  "GET /v1/pokemon/charizard",
  "GET /v1/weather?city=Tokyo",
  "GET /v1/coins/markets",
  "POST /v1/users",
  "GET /v1/products/42",
  "GET /v1/posts",
  "DELETE /v1/cache",
  "GET /v1/pokemon/pikachu",
];
const STATUSES = [200, 200, 200, 200, 201, 200, 304, 429, 500];

export type LogEntry = {
  id: string;
  ts: string;
  endpoint: string;
  status: number;
  latency: number;
  key: string;
  ip: string;
  region: string;
};

export function generateLogs(n: number): LogEntry[] {
  const regions = ["us-east-1", "eu-west-2", "ap-south-1", "sa-east-1"];
  const keys = ["mf_live_8aZ2", "mf_live_44Kp", "mf_test_q9Wd"];
  return Array.from({ length: n }, (_, i) => {
    const ts = new Date(Date.now() - i * 1_900 - Math.random() * 800);
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    return {
      id: `log_${ts.getTime()}_${i}`,
      ts: ts.toISOString(),
      endpoint: ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)],
      status,
      latency: Math.round(40 + Math.random() * 220 + (status >= 500 ? 400 : 0)),
      key: keys[Math.floor(Math.random() * keys.length)],
      ip: `${10 + Math.floor(Math.random() * 240)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`,
      region: regions[Math.floor(Math.random() * regions.length)],
    };
  });
}

export const INITIAL_LOGS = generateLogs(80);

// Endpoint usage breakdown
export const endpointBreakdown = [
  { endpoint: "/v1/pokemon", requests: 184_213, share: 38 },
  { endpoint: "/v1/weather", requests: 121_005, share: 25 },
  { endpoint: "/v1/coins", requests: 87_440, share: 18 },
  { endpoint: "/v1/products", requests: 53_002, share: 11 },
  { endpoint: "/v1/users", requests: 38_540, share: 8 },
];

// Invoices
export const invoices = [
  { id: "INV-2025-04", period: "Apr 2025", amount: 184.32, requests: 947_734, status: "Open" as const, due: "2025-05-01" },
  { id: "INV-2025-03", period: "Mar 2025", amount: 162.10, requests: 873_660, status: "Paid" as const, due: "2025-04-01" },
  { id: "INV-2025-02", period: "Feb 2025", amount: 98.44, requests: 661_482, status: "Paid" as const, due: "2025-03-01" },
  { id: "INV-2025-01", period: "Jan 2025", amount: 49.00, requests: 412_005, status: "Paid" as const, due: "2025-02-01" },
];

export const currentPlan = PLANS[1]; // Growth

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
}

export function formatUsd(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
