import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Banknote,
  Bell,
  Bike,
  Briefcase,
  ClipboardList,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  MessageSquare,
  PlusCircle,
  User,
  Wrench,
} from "lucide-react";

const riderLinks = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/motorcycle", label: "My Motorcycle", icon: Bike },
  { to: "/dashboard/rental", label: "Rental", icon: ClipboardList },
  { to: "/dashboard/jobs", label: "Jobs", icon: Briefcase },
  { to: "/dashboard/earnings", label: "Earnings", icon: Banknote },
  { to: "/dashboard/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { to: "/dashboard/support", label: "Support", icon: LifeBuoy },
] as const;

const ownerLinks = [
  { to: "/owner", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/owner/motorcycles", label: "My motorcycles", icon: Bike },
  { to: "/owner/add-motorcycle", label: "Add motorcycle", icon: PlusCircle },
  { to: "/owner/requests", label: "Rental requests", icon: ClipboardList },
  { to: "/owner/active", label: "Active rentals", icon: Gauge },
  { to: "/owner/earnings", label: "Earnings", icon: Banknote },
  { to: "/owner/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/owner/messages", label: "Messages", icon: MessageSquare },
  { to: "/owner/profile", label: "Profile", icon: User },
] as const;

export function DashboardShell({
  role,
  title,
  subtitle,
  children,
  actions,
}: {
  role: "rider" | "owner";
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const links = role === "rider" ? riderLinks : ownerLinks;

  return (
    <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-6 lg:px-8 lg:py-10">
      <aside className="hidden w-60 shrink-0 lg:block">
        <div className="surface-card sticky top-24 p-3">
          <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {role === "rider" ? "Rider" : "Owner / Fleet"}
          </p>
          <nav className="flex flex-col gap-0.5">
            {links.map(({ to, label, icon: Icon, ...rest }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: "exact" in rest ? Boolean(rest.exact) : false }}
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-primary/12 text-primary" }}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-3 border-t border-border pt-3">
            <Link
              to={role === "rider" ? "/owner" : "/dashboard"}
              className="btn-ghost w-full justify-start"
            >
              Switch to {role === "rider" ? "owner" : "rider"} view
            </Link>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 pb-20 lg:pb-0">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold sm:text-2xl">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {actions}
        </header>

        <div className="mt-6 space-y-6">{children}</div>

        <div className="mt-8 overflow-x-auto lg:hidden">
          <div className="flex gap-2 pb-2">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="btn-outline shrink-0 text-xs"
                activeProps={{ className: "btn-primary shrink-0 text-xs" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "default",
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "success" | "action";
  icon?: ReactNode;
}) {
  const valueTone =
    tone === "success" ? "text-success" : tone === "action" ? "text-primary" : "text-foreground";
  return (
    <div className="surface-card p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        {icon}
      </div>
      <p className={`mt-2 text-2xl font-extrabold ${valueTone}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
