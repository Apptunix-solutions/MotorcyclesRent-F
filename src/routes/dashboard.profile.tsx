import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { VerificationBadge } from "@/components/badges";
import { AREAS, BIKE_TYPES, WORKING_HOURS } from "@/data/catalog";

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({
    meta: [
      { title: "Profile | Rider dashboard" },
      { name: "description", content: "Your rider details, documents and matching preferences." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [saved, setSaved] = useState(false);

  return (
    <DashboardShell role="rider" title="Profile" subtitle="These details drive your matches.">
      <div className="surface-card p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/12 text-lg font-extrabold text-primary">
            MS
          </div>
          <div>
            <p className="text-base font-bold">Mostafa Samir</p>
            <p className="text-xs text-muted-foreground">Rider since Aug 2025</p>
          </div>
          <VerificationBadge label="ID verified" />
        </div>
      </div>

      <form
        className="surface-card space-y-4 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        <h3 className="text-base font-bold">Matching preferences</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="pf-area">Working area</label>
            <select id="pf-area" className="field-input" defaultValue={AREAS[0]}>
              {AREAS.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="pf-type">Preferred bike type</label>
            <select id="pf-type" className="field-input" defaultValue={BIKE_TYPES[0]}>
              {BIKE_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="pf-hours">Working hours</label>
            <select id="pf-hours" className="field-input" defaultValue={WORKING_HOURS[0]}>
              {WORKING_HOURS.map((h) => <option key={h}>{h}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="pf-budget">Daily budget (EGP)</label>
            <input id="pf-budget" type="number" className="field-input" defaultValue={150} />
          </div>
        </div>
        <button type="submit" className="btn-primary">Save changes</button>
        {saved && <p className="text-sm font-semibold text-success">Preferences saved.</p>}
      </form>
    </DashboardShell>
  );
}
