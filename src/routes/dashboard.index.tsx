import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, Bike, Briefcase, Wrench } from "lucide-react";
import { DashboardShell, StatCard } from "@/components/dashboard-shell";
import { EstimateNote } from "@/components/badges";
import { JOBS, MOTORCYCLES, formatEGP } from "@/data/catalog";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Rider dashboard | MotoRent" },
      { name: "description", content: "Your rental, jobs, earnings and maintenance in one place." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RiderOverview,
});

function RiderOverview() {
  const bike = MOTORCYCLES[0];
  const jobs = JOBS.slice(0, 3);

  return (
    <DashboardShell
      role="rider"
      title="Rider overview"
      subtitle="A quick view of your bike, income and next actions."
      actions={
        <Link to="/motorcycles" className="btn-outline">
          Browse motorcycles
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Current bike"
          value={`${bike.brand} ${bike.model}`}
          hint={`${formatEGP(bike.pricePerDay)} / day`}
          icon={<Bike className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          label="Net this week"
          value={formatEGP(1740)}
          hint="After rent, fuel and reserve"
          tone="success"
          icon={<Banknote className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          label="Matched jobs"
          value={`${JOBS.length}`}
          hint="Open in your area"
          tone="action"
          icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          label="Next service"
          value="1,100 km"
          hint={bike.maintenanceStatus}
          icon={<Wrench className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="surface-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold">Jobs matched to you</h2>
          <Link to="/jobs" className="text-sm font-semibold text-primary">
            See all jobs
          </Link>
        </div>
        <ul className="mt-4 space-y-3">
          {jobs.map((job) => (
            <li key={job.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
              <div>
                <p className="text-sm font-semibold">{job.title} — {job.company}</p>
                <p className="text-xs text-muted-foreground">
                  {job.location} · {job.shift} · {job.earnings}
                </p>
              </div>
              <span className="rounded-full bg-primary/12 px-2.5 py-1 text-xs font-bold text-primary">
                {job.matchScore}% match
              </span>
            </li>
          ))}
        </ul>
      </div>

      <EstimateNote>
        Earnings and costs shown here are estimates based on your logged shifts.
      </EstimateNote>
    </DashboardShell>
  );
}
