import { Banknote, Briefcase, Clock, MapPin } from "lucide-react";
import { StatusBadge } from "./badges";
import { MatchScore } from "./match-score";
import type { Job } from "@/data/catalog";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="surface-card p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold">{job.title}</h3>
          <p className="truncate text-sm text-muted-foreground">{job.company}</p>
        </div>
        <MatchScore score={job.matchScore} compact />
      </div>

      <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-2">
          <Briefcase className="h-4 w-4 shrink-0" />
          {job.workType}
        </span>
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0" />
          {job.shift}
        </span>
        <span className="inline-flex items-center gap-2 font-semibold text-foreground">
          <Banknote className="h-4 w-4 shrink-0 text-success" />
          {job.earnings}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.requirements.map((req) => (
          <StatusBadge key={req}>{req}</StatusBadge>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Estimated earnings — actual pay varies by platform, demand and shifts. {job.posted}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn-primary">
          View opportunity
        </button>
        <button type="button" className="btn-outline">
          Save
        </button>
      </div>
    </article>
  );
}
