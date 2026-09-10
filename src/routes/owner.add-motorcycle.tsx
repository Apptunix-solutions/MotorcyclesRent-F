import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { EstimateNote } from "@/components/badges";
import { AREAS, BIKE_TYPES, FUEL_TYPES } from "@/data/catalog";

export const Route = createFileRoute("/owner/add-motorcycle")({
  head: () => ({
    meta: [
      { title: "Add a motorcycle | Owner dashboard" },
      { name: "description", content: "List a motorcycle for rent: details, price, deposit and location." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AddMotorcycle,
});

const field = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm";

function AddMotorcycle() {
  return (
    <DashboardShell
      role="owner"
      title="Add a motorcycle"
      subtitle="Fill in the details riders need before they send a request."
    >
      <form className="surface-card grid gap-4 p-5 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        <label className="text-sm font-medium">
          Brand
          <input className={field} placeholder="Honda" />
        </label>
        <label className="text-sm font-medium">
          Model
          <input className={field} placeholder="CG 150" />
        </label>
        <label className="text-sm font-medium">
          Year
          <input className={field} type="number" placeholder="2022" />
        </label>
        <label className="text-sm font-medium">
          Type
          <select className={field} defaultValue={BIKE_TYPES[0]}>
            {BIKE_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Fuel
          <select className={field} defaultValue={FUEL_TYPES[0]}>
            {FUEL_TYPES.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Location
          <select className={field} defaultValue={AREAS[0]}>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium">
          Price per day (EGP)
          <input className={field} type="number" placeholder="180" />
        </label>
        <label className="text-sm font-medium">
          Price per week (EGP)
          <input className={field} type="number" placeholder="1100" />
        </label>
        <label className="text-sm font-medium">
          Price per month (EGP)
          <input className={field} type="number" placeholder="4200" />
        </label>
        <label className="text-sm font-medium">
          Deposit (EGP)
          <input className={field} type="number" placeholder="2000" />
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          Notes for riders
          <textarea className={field} rows={4} placeholder="Helmet and delivery box included, serviced monthly." />
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary">
            Save listing
          </button>
        </div>
      </form>

      <EstimateNote>This is a demo form — listings are not saved yet.</EstimateNote>
    </DashboardShell>
  );
}
