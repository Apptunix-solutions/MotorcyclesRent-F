import { Link } from "@tanstack/react-router";
import { Bike, Briefcase, Home, LayoutDashboard, Menu, Wrench, X } from "lucide-react";
import { useState } from "react";

const publicLinks = [
  { to: "/motorcycles", label: "Motorcycles" },
  { to: "/jobs", label: "Jobs" },
  { to: "/maintenance", label: "Maintenance" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/partner", label: "Become a partner" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-graphite text-graphite-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:px-8">
        <div className="flex min-w-0 items-center gap-6">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary">
              <Bike className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">MotoRent</span>
          </Link>
          <nav className="hidden min-w-0 items-center gap-1 lg:flex">
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-md px-3 py-2 text-sm font-medium text-graphite-foreground/75 transition-colors hover:bg-white/10 hover:text-graphite-foreground"
                activeProps={{ className: "bg-white/10 text-graphite-foreground" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/dashboard"
            className="hidden rounded-md px-3 py-2 text-sm font-semibold text-graphite-foreground/80 transition-colors hover:text-graphite-foreground sm:inline-flex"
          >
            Login
          </Link>
          <Link to="/onboarding" className="btn-primary hidden sm:inline-flex">
            Get started
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/15 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {publicLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-semibold text-graphite-foreground/85 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-semibold text-graphite-foreground/85 hover:bg-white/10"
            >
              Rider dashboard
            </Link>
            <Link to="/onboarding" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Get started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function MobileBottomNav() {
  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/motorcycles", label: "Bikes", icon: Bike },
    { to: "/jobs", label: "Jobs", icon: Briefcase },
    { to: "/maintenance", label: "Service", icon: Wrench },
    { to: "/dashboard", label: "Rider", icon: LayoutDashboard },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden">
      <ul className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-muted-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: to === "/" }}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-graphite text-graphite-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary">
              <Bike className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="text-lg font-extrabold">MotoRent</span>
          </div>
          <p className="mt-3 text-sm text-graphite-foreground/70">
            Rent a bike. Start earning. Work-ready motorcycles, delivery opportunities and
            maintenance in one platform.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">Riders</h4>
          <ul className="mt-3 space-y-2 text-sm text-graphite-foreground/70">
            <li>
              <Link to="/motorcycles">Find a motorcycle</Link>
            </li>
            <li>
              <Link to="/jobs">Delivery jobs</Link>
            </li>
            <li>
              <Link to="/onboarding">Rider onboarding</Link>
            </li>
            <li>
              <Link to="/dashboard">Rider dashboard</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">Partners</h4>
          <ul className="mt-3 space-y-2 text-sm text-graphite-foreground/70">
            <li>
              <Link to="/partner">Offer your motorcycle</Link>
            </li>
            <li>
              <Link to="/owner">Owner dashboard</Link>
            </li>
            <li>
              <Link to="/owner/add-motorcycle">Add a motorcycle</Link>
            </li>
            <li>
              <Link to="/maintenance">Maintenance providers</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide">Trust &amp; support</h4>
          <ul className="mt-3 space-y-2 text-sm text-graphite-foreground/70">
            <li>
              <Link to="/how-it-works">How it works</Link>
            </li>
            <li>Verified owners and bikes</li>
            <li>Rental terms and deposits</li>
            <li>Report an issue: support@motorent.example</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-graphite-foreground/60 lg:px-8">
        MotoRent is a rental and matching platform. Earnings figures shown anywhere on this site are
        estimates only and are never guaranteed.
      </div>
    </footer>
  );
}
