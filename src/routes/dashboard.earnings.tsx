import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { EarningsCalculator } from "@/components/calculators";
import { EstimateNote } from "@/components/badges";
import { formatEGP } from "@/data/catalog";

export const Route = createFileRoute("/dashboard/earnings")({
  head: () => ({
    meta: [
      { title: "Earnings | Rider dashboard" },
      { name: "description", content: "Track income, rent, fuel and net profit per shift." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EarningsPage,
});

const week = [
  { day: "Mon", income: 430, costs: 200 },
  { day: "Tue", income: 380, costs: 190 },
  { day: "Wed", income: 460, costs: 210 },
  { day: "Thu", income: 500, costs: 215 },
  { day: "Fri", income: 620, costs: 240 },
  { day: "Sat", income: 540, costs: 225 },
];

function EarningsPage() {
  const income = week.reduce((s, d) => s + d.income, 0);
  const costs = week.reduce((s, d) => s + d.costs, 0);
  const max = Math.max(...week.map((d) => d.income));

  return (
    <DashboardShell role="rider" title="Earnings" subtitle="This week's income against your costs.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Gross income" value={formatEGP(income)} />
        <StatCard label="Costs" value={formatEGP(costs)} hint="Rent, fuel and reserve" />
        <StatCard label="Net" value={formatEGP(income - costs)} tone="success" />
      </div>

      <div className="surface-card p-5">
        <h3 className="text-base font-bold">Daily income</h3>
        <div className="mt-5 flex h-40 items-end gap-3">
          {week.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-primary/70"
                style={{ height: `${(d.income / max) * 100}%` }}
                aria-label={`${d.day}: ${d.income} EGP`}
              />
              <span className="text-xs text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <EarningsCalculator />

      <EstimateNote>Figures are based on the shifts you logged and are estimates only.</EstimateNote>
    </DashboardShell>
  );
}
