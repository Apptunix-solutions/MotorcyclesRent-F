import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";
import { VerificationBadge } from "@/components/badges";

export const Route = createFileRoute("/owner/profile")({
  head: () => ({
    meta: [
      { title: "Profile | Owner dashboard" },
      { name: "description", content: "Your owner details, verification and payout information." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerProfile,
});

const field = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm";

function OwnerProfile() {
  return (
    <DashboardShell role="owner" title="Profile" subtitle="Details riders see and where your payouts go.">
      <div className="surface-card space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-bold">Mostafa Samir</h2>
          <VerificationBadge label="ID verified" />
        </div>
        <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <label className="text-sm font-medium">
            Full name
            <input className={field} defaultValue="Mostafa Samir" />
          </label>
          <label className="text-sm font-medium">
            Phone
            <input className={field} defaultValue="+20 100 000 0000" />
          </label>
          <label className="text-sm font-medium">
            City
            <input className={field} defaultValue="Tanta" />
          </label>
          <label className="text-sm font-medium">
            Payout method
            <input className={field} defaultValue="Vodafone Cash" />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
