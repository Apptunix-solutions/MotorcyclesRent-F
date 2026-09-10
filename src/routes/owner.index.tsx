import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, Bike, ClipboardList, Gauge } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { EstimateNote } from "@/components/badges";
import { MOTORCYCLES, formatEGP } from "@/data/catalog";

export const Route = createFileRoute("/owner/")({
  head: () => ({
    meta: [
      { title: "Owner dashboard | MotoRent" },
      { name: "description", content: "Your fleet, requests, active rentals and payouts in one place." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerOverview,
});

function OwnerOverview() {
  const fleet = MOTORCYCLES.slice(0, 3);
  const monthly = fleet.reduce((sum, b) => sum + b.pricePerMonth, 0);

  return (
    <DashboardShell
      role="owner"
      title="Owner overview"
      subtitle="Fleet status, incoming requests and expected payouts."
      actions={
        <Link to="/owner/add-motorcycle" className="btn-primary">
          Add motorcycle
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Motorcycles listed"
          value={`${fleet.length}`}
          hint="Across your account"
          icon={<Bike className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          label="Open requests"
          value="4"
          hint="Waiting for your review"
          tone="action"
          icon={<ClipboardList className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          label="Active rentals"
          value="2"
          hint="Currently on the road"
          icon={<Gauge className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          label="Expected monthly"
          value={formatEGP(monthly)}
          hint="If all bikes stay rented"
          tone="success"
          icon={<Banknote className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="surface-card p-5">
        <h2 className="text-base font-bold">Your motorcycles</h2>
        <ul className="mt-3 space-y-2">
          {fleet.map((bike) => (
            <li
              key={bike.id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-2 last:border-0"
            >
              <span className="text-sm font-medium">
                {bike.brand} {bike.model} {bike.year}
              </span>
              <span className="text-sm text-muted-foreground">
                {bike.availability} · {formatEGP(bike.pricePerDay)} / day
              </span>
            </li>
          ))}
        </ul>
        <Link to="/owner/motorcycles" className="btn-outline mt-4">
          Manage motorcycles
        </Link>
      </div>

      <EstimateNote>Figures are estimates based on your listed prices, not guaranteed income.</EstimateNote>
    </DashboardShell>
  );
}
