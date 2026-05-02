import { Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-hero text-primary-foreground shadow-glow">
            <Gauge className="size-4" />
          </span>
          <span className="text-base">MeterFlow</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" hash="features" className="transition-colors hover:text-foreground">Features</Link>
          <Link to="/pricing" className="transition-colors hover:text-foreground">Pricing</Link>
          <Link to="/docs" className="transition-colors hover:text-foreground">Docs</Link>
          <Link to="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground sm:inline-block"
          >
            Sign in
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm transition-transform hover:scale-[1.02]"
          >
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid size-7 place-items-center rounded-md bg-gradient-hero text-primary-foreground">
              <Gauge className="size-4" />
            </span>
            MeterFlow
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Usage-based billing infrastructure for API companies.
          </p>
        </div>
        <FooterCol title="Product" links={["Features", "Pricing", "Docs", "Changelog"]} />
        <FooterCol title="Company" links={["About", "Customers", "Careers", "Blog"]} />
        <FooterCol title="Legal" links={["Privacy", "Terms", "Security", "DPA"]} />
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} MeterFlow Inc. Built for developers who ship.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l} className="cursor-pointer transition-colors hover:text-foreground">{l}</li>
        ))}
      </ul>
    </div>
  );
}
