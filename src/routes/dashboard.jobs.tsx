import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { JobCard } from "@/components/job-card";
import { JOBS } from "@/data/catalog";

export const Route = createFileRoute("/dashboard/jobs")({
  head: () => ({
    meta: [
      { title: "My jobs | Rider dashboard" },
      { name: "description", content: "Delivery jobs matched to your area and working hours." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardJobs,
});

function DashboardJobs() {
  const jobs = [...JOBS].sort((a, b) => b.matchScore - a.matchScore);

  return (
    <DashboardShell
      role="rider"
      title="Jobs"
      subtitle="Matched delivery work, sorted by how well it fits your profile."
      actions={
        <Link to="/jobs" className="btn-outline">
          Browse all jobs
        </Link>
      }
    >
      <div className="grid gap-4 lg:grid-cols-2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </DashboardShell>
  );
}
