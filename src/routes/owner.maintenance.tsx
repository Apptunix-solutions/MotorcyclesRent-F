import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { WarningNote } from "@/components/badges";
import { PROVIDERS, formatEGP } from "@/data/catalog";

export const Route = createFileRoute("/owner/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance | Owner dashboard" },
      { name: "description", content: "Service schedule for your fleet and nearby workshops." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerMaintenance,
});

const schedule = [
  { bike: "Honda CG 150", due: "In 1,100 km", note: "Oil change and chain check", cost: 320 },
  { bike: "Yamaha Scooter", due: "In 3 weeks", note: "Brake pads", cost: 450 },
  { bike: "Electric Commuter", due: "In 2 months", note: "Battery health check", cost: 600 },
];

function OwnerMaintenance() {
  const providers = PROVIDERS.slice(0, 3);

  return (
    <DashboardShell role="owner" title="Maintenance" subtitle="Keep every bike serviced and rentable.">
      <div className="surface-card p-5">
        <h2 className="text-base font-bold">Upcoming service</h2>
        <ul className="mt-3 space-y-2">
          {schedule.map((s) => (
            <li
              key={s.bike}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-2 last:border-0"
            >
              <span className="text-sm font-medium">
                {s.bike} — <span className="text-muted-foreground">{s.note}</span>
              </span>
              <span className="text-sm text-muted-foreground">
                {s.due} · ~{formatEGP(s.cost)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {providers.map((p) => (
          <article key={p.id} className="surface-card p-5">
            <h3 className="text-base font-bold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
          </article>
        ))}
      </div>

      <WarningNote>Skipping scheduled service can void coverage and delay your next rental.</WarningNote>
    </DashboardShell>
  );
}
