import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { VerificationBadge } from "@/components/badges";
import { formatEGP } from "@/data/catalog";

export const Route = createFileRoute("/owner/requests")({
  head: () => ({
    meta: [
      { title: "Rental requests | Owner dashboard" },
      { name: "description", content: "Review and answer rental requests from verified riders." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerRequests,
});

const requests = [
  { id: "r1", rider: "Ahmed S.", bike: "Honda CG 150", period: "Weekly", amount: 1100, verified: true, rating: 4.8 },
  { id: "r2", rider: "Mahmoud K.", bike: "Yamaha Scooter", period: "Monthly", amount: 4200, verified: true, rating: 4.6 },
  { id: "r3", rider: "Kareem A.", bike: "Honda CG 150", period: "Daily", amount: 180, verified: false, rating: 4.2 },
  { id: "r4", rider: "Omar T.", bike: "Electric Commuter", period: "Weekly", amount: 1250, verified: true, rating: 4.9 },
];

function OwnerRequests() {
  return (
    <DashboardShell
      role="owner"
      title="Rental requests"
      subtitle="Every request shows the rider's verification and rating before you accept."
    >
      <div className="space-y-3">
        {requests.map((r) => (
          <article key={r.id} className="surface-card flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold">{r.rider}</h2>
                {r.verified && <VerificationBadge label="ID verified" />}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {r.bike} · {r.period} · {formatEGP(r.amount)} · {r.rating} ★
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn-primary">
                Accept
              </button>
              <button type="button" className="btn-outline">
                Decline
              </button>
            </div>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
