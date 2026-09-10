import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { EstimateNote } from "@/components/badges";
import { formatEGP } from "@/data/catalog";

export const Route = createFileRoute("/owner/earnings")({
  head: () => ({
    meta: [
      { title: "Earnings | Owner dashboard" },
      { name: "description", content: "Payouts, monthly income and per-bike performance." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerEarnings,
});

const payouts = [
  { date: "12 Sep", label: "Weekly rent — Honda CG 150", amount: 1100, status: "Paid" },
  { date: "12 Sep", label: "Weekly rent — Electric Commuter", amount: 1250, status: "Paid" },
  { date: "05 Sep", label: "Weekly rent — Honda CG 150", amount: 1100, status: "Paid" },
  { date: "29 Aug", label: "Deposit held — Yamaha Scooter", amount: 2000, status: "Held" },
];

function OwnerEarnings() {
  const paid = payouts.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);

  return (
    <DashboardShell role="owner" title="Earnings" subtitle="What you received and what is still on hold.">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Paid this month" value={formatEGP(paid)} tone="success" />
        <StatCard label="Deposits held" value={formatEGP(2000)} hint="Refunded on return" />
        <StatCard label="Expected next week" value={formatEGP(2350)} tone="action" />
      </div>

      <div className="surface-card p-5">
        <h2 className="text-base font-bold">Payout history</h2>
        <ul className="mt-3 space-y-2">
          {payouts.map((p) => (
            <li
              key={p.date + p.label}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-2 last:border-0"
            >
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

      <EstimateNote>Amounts shown are before any local taxes or fees.</EstimateNote>
    </DashboardShell>
  );
}
