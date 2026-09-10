import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { RentalCalculator } from "@/components/calculators";
import { WarningNote } from "@/components/badges";
import { MOTORCYCLES, formatEGP } from "@/data/catalog";

export const Route = createFileRoute("/dashboard/rental")({
  head: () => ({
    meta: [
      { title: "My rental | Rider dashboard" },
      { name: "description", content: "Rental period, payments and agreed terms." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RentalPage,
});

const payments = [
  { date: "12 Sep", label: "Weekly rent", amount: 760, status: "Paid" },
  { date: "05 Sep", label: "Weekly rent", amount: 760, status: "Paid" },
  { date: "29 Aug", label: "Deposit", amount: 2000, status: "Held" },
];

function RentalPage() {
  const bike = MOTORCYCLES[0];

  return (
    <DashboardShell role="rider" title="Rental" subtitle="Your agreement, payments and renewal date.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Plan" value="Weekly" hint="Renews every Monday" />
        <StatCard label="Weekly rent" value={formatEGP(bike.pricePerWeek)} tone="action" />
        <StatCard label="Deposit held" value={formatEGP(bike.deposit)} hint="Refunded on return" />
      </div>

      <div className="surface-card p-5">
        <h3 className="text-base font-bold">Payment history</h3>
        <ul className="mt-3 space-y-2">
          {payments.map((p) => (
            <li key={p.date + p.label} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0">
              <span className="text-sm text-muted-foreground">
                {p.date} · {p.label}
              </span>
              <span className="text-sm font-semibold">
                {formatEGP(p.amount)} · {p.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <RentalCalculator
        pricePerDay={bike.pricePerDay}
        operatingCostPerDay={bike.operatingCostPerDay}
      />

      <WarningNote>
        Return the bike in the agreed condition to get your deposit back. Fines and damage are
        settled directly with the owner.
      </WarningNote>
    </DashboardShell>
  );
}
