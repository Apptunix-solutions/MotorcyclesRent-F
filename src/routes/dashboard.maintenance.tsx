import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { MaintenanceCard } from "@/components/maintenance-card";
import { PROVIDERS } from "@/data/catalog";

export const Route = createFileRoute("/dashboard/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance | Rider dashboard" },
      { name: "description", content: "Service history and nearby workshops for your bike." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardMaintenance,
});

const history = [
  { date: "28 Aug", service: "Oil change", place: "Speed Moto Workshop", cost: "180 EGP" },
  { date: "02 Aug", service: "Brake pads", place: "El Nasr Bikes", cost: "260 EGP" },
  { date: "14 Jul", service: "Tire replacement", place: "Delta Riders Garage", cost: "700 EGP" },
];

function DashboardMaintenance() {
  const nearby = [...PROVIDERS].sort((a, b) => a.distanceKm - b.distanceKm).slice(0, 3);

  return (
    <DashboardShell
      role="rider"
      title="Maintenance"
      subtitle="Keep the bike healthy and your shifts uninterrupted."
      actions={
        <Link to="/maintenance" className="btn-outline">
          All providers
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Next oil change" value="1,100 km" tone="action" />
        <StatCard label="Last service" value="28 Aug" hint="Oil change" />
        <StatCard label="Spent this month" value="440 EGP" />
      </div>

      <div className="surface-card p-5">
        <h3 className="text-base font-bold">Service history</h3>
        <ul className="mt-3 space-y-2">
          {history.map((h) => (
            <li key={h.date} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0">
              <span className="text-sm text-muted-foreground">
                {h.date} · {h.service} · {h.place}
              </span>
              <span className="text-sm font-semibold">{h.cost}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {nearby.map((p) => (
          <MaintenanceCard key={p.id} provider={p} />
        ))}
      </div>
    </DashboardShell>
  );
}
