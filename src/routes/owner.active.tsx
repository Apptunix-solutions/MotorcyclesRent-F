import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { formatEGP } from "@/data/catalog";

export const Route = createFileRoute("/owner/active")({
  head: () => ({
    meta: [
      { title: "Active rentals | Owner dashboard" },
      { name: "description", content: "Track bikes currently on the road and their return dates." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerActive,
});

const active = [
  { id: "a1", rider: "Ahmed S.", bike: "Honda CG 150", started: "02 Sep", returns: "30 Sep", weekly: 1100 },
  { id: "a2", rider: "Omar T.", bike: "Electric Commuter", started: "12 Sep", returns: "19 Sep", weekly: 1250 },
];

function OwnerActive() {
  const weekly = active.reduce((sum, a) => sum + a.weekly, 0);

  return (
    <DashboardShell role="owner" title="Active rentals" subtitle="Who has your bikes and when they come back.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Bikes on the road" value={`${active.length}`} />
        <StatCard label="Weekly income" value={formatEGP(weekly)} tone="success" />
        <StatCard label="Next return" value="19 Sep" hint="Electric Commuter" tone="action" />
      </div>

      <div className="space-y-3">
        {active.map((a) => (
          <article key={a.id} className="surface-card flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <h2 className="text-base font-bold">{a.bike}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {a.rider} · {a.started} → {a.returns}
              </p>
            </div>
            <span className="text-sm font-semibold text-primary">{formatEGP(a.weekly)} / week</span>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
