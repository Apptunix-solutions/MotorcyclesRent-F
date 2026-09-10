import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | Rider dashboard" },
      { name: "description", content: "Rental, job and maintenance alerts." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotificationsPage,
});

const items = [
  { time: "2 h ago", title: "Rent due tomorrow", body: "Weekly rent of 760 EGP renews on Monday.", tone: "action" },
  { time: "Yesterday", title: "New job match", body: "Evening food delivery shift in Tanta, 92% match.", tone: "default" },
  { time: "3 days ago", title: "Service reminder", body: "Oil change due in about 1,100 km.", tone: "default" },
  { time: "Last week", title: "Deposit confirmed", body: "Your 2,000 EGP deposit is held by the owner.", tone: "success" },
];

function NotificationsPage() {
  return (
    <DashboardShell role="rider" title="Notifications" subtitle="Everything that needs your attention.">
      <ul className="space-y-3">
        {items.map((n) => (
          <li key={n.title} className="surface-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className={`text-sm font-bold ${n.tone === "action" ? "text-primary" : n.tone === "success" ? "text-success" : ""}`}>
                {n.title}
              </p>
              <span className="text-xs text-muted-foreground">{n.time}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
          </li>
        ))}
      </ul>
    </DashboardShell>
  );
}
