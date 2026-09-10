import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { AvailabilityBadge, VerificationBadge } from "@/components/badges";
import { MOTORCYCLES, formatEGP } from "@/data/catalog";

export const Route = createFileRoute("/owner/motorcycles")({
  head: () => ({
    meta: [
      { title: "My motorcycles | Owner dashboard" },
      { name: "description", content: "Manage the motorcycles you rent out, their prices and availability." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerMotorcycles,
});

function OwnerMotorcycles() {
  const fleet = MOTORCYCLES.slice(0, 3);

  return (
    <DashboardShell
      role="owner"
      title="My motorcycles"
      subtitle="Prices, availability and verification for every bike you list."
      actions={
        <Link to="/owner/add-motorcycle" className="btn-primary">
          Add motorcycle
        </Link>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {fleet.map((bike) => (
          <article key={bike.id} className="surface-card overflow-hidden">
            <img
              src={bike.image}
              alt={`${bike.brand} ${bike.model}`}
              className="h-44 w-full object-cover"
              loading="lazy"
            />
            <div className="space-y-2 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold">
                  {bike.brand} {bike.model} {bike.year}
                </h2>
                <AvailabilityBadge availability={bike.availability} />
                {bike.registrationVerified && <VerificationBadge label="Registration verified" />}
              </div>
              <p className="text-sm text-muted-foreground">
                {formatEGP(bike.pricePerDay)} / day · {formatEGP(bike.pricePerWeek)} / week ·{" "}
                {formatEGP(bike.pricePerMonth)} / month
              </p>
              <p className="text-sm text-muted-foreground">Deposit {formatEGP(bike.deposit)} · {bike.location}</p>
            </div>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
