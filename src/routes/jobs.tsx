import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EstimateNote } from "@/components/badges";
import { JobCard } from "@/components/job-card";
import { EmptyState } from "@/components/states";
import { AREAS, JOBS, WORKING_HOURS } from "@/data/catalog";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Delivery jobs for motorcycle riders | MotoRent" },
      {
        name: "description",
        content:
          "Find food, e-commerce and pharmacy delivery jobs by area, shift and working hours, with estimated daily earnings.",
      },
      { property: "og:title", content: "Delivery jobs for motorcycle riders | MotoRent" },
      {
        property: "og:description",
        content: "Delivery opportunities matched to your bike, area and working hours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  const [area, setArea] = useState("All areas");
  const [workType, setWorkType] = useState("Any");

  const results = useMemo(
    () =>
      JOBS.filter(
        (job) =>
          (area === "All areas" || job.location === area) &&
          (workType === "Any" || job.workType === workType),
      ).sort((a, b) => b.matchScore - a.matchScore),
    [area, workType],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight">Delivery jobs</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Opportunities from food delivery, e-commerce and pharmacy platforms — filtered to what your
        bike and schedule can actually cover.
      </p>

      <div className="surface-card mt-6 grid gap-4 p-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="j-area">
            Area
          </label>
          <select
            id="j-area"
            className="field-input"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option>All areas</option>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="j-type">
            Working hours
          </label>
          <select
            id="j-type"
            className="field-input"
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
          >
            <option>Any</option>
            {WORKING_HOURS.map((w) => (
              <option key={w}>{w}</option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{results.length} open opportunities</p>

      {results.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="No jobs match your filters"
            description="Try another area or switch the working hours to flexible."
          />
        </div>
      ) : (
        <div className="mt-4 grid gap-5 lg:grid-cols-2">
          {results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      <EstimateNote>
        All earnings figures are estimates reported by riders and platforms. MotoRent does not
        guarantee income.
      </EstimateNote>
    </div>
  );
}
