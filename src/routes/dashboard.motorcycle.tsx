import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { AvailabilityBadge, VerificationBadge } from "@/components/badges";
import { MOTORCYCLES, formatEGP } from "@/data/catalog";

export const Route = createFileRoute("/dashboard/motorcycle")({
  head: () => ({
    meta: [
      { title: "My motorcycle | Rider dashboard" },
      { name: "description", content: "Details, costs and condition of the motorcycle you rent." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MyMotorcycle,
});

function MyMotorcycle() {
  const bike = MOTORCYCLES[0];

  return (
    <DashboardShell role="rider" title="My motorcycle" subtitle="Everything about your current rental bike.">
      <div className="surface-card overflow-hidden">
        <img
          src={bike.image}
          alt={`${bike.brand} ${bike.model}`}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold">
              {bike.brand} {bike.model} {bike.year}
            </h2>
            <AvailabilityBadge availability={bike.availability} />
            {bike.registrationVerified && <VerificationBadge label="Registration verified" />}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{bike.maintenanceStatus}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Daily rent" value={formatEGP(bike.pricePerDay)} />
        <StatCard label="Deposit" value={formatEGP(bike.deposit)} hint="Refundable" />
        <StatCard label="Fuel / day" value={formatEGP(bike.fuelCostPerDay)} hint={bike.consumption} />
        <StatCard label="Operating / day" value={formatEGP(bike.operatingCostPerDay)} />
      </div>

      <div className="surface-card p-5">
        <h3 className="text-base font-bold">Specifications</h3>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            ["Engine", bike.engine],
            ["Transmission", bike.transmission],
            ["Fuel", bike.fuel],
            ["Storage", bike.storage],
            ["Comfortable hours", bike.comfortableHours],
            ["Owner", `${bike.owner.name} (${bike.owner.type})`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 border-b border-border pb-2">
              <dt className="text-sm text-muted-foreground">{k}</dt>
              <dd className="text-sm font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Link to="/dashboard/maintenance" className="btn-outline">
        Book maintenance
      </Link>
    </DashboardShell>
  );
}
