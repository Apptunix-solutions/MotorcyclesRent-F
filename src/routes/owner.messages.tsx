import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/owner/messages")({
  head: () => ({
    meta: [
      { title: "Messages | Owner dashboard" },
      { name: "description", content: "Talk to riders about requests, handover and returns." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerMessages,
});

const threads = [
  { id: "m1", rider: "Ahmed S.", last: "I can pick the bike up tomorrow at 9am.", time: "10 min ago", unread: true },
  { id: "m2", rider: "Omar T.", last: "Battery is at 80% after the shift, all good.", time: "2 h ago", unread: false },
  { id: "m3", rider: "Mahmoud K.", last: "Is the delivery box included?", time: "Yesterday", unread: false },
];

function OwnerMessages() {
  return (
    <DashboardShell role="owner" title="Messages" subtitle="Conversations with riders about your motorcycles.">
      <div className="surface-card divide-y divide-border">
        {threads.map((t) => (
          <button
            key={t.id}
            type="button"
            className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-secondary"
          >
            <div className="min-w-0">
              <p className="text-sm font-bold">
                {t.rider}
                {t.unread && <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">New</span>}
              </p>
              <p className="mt-1 truncate text-sm text-muted-foreground">{t.last}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{t.time}</span>
          </button>
        ))}
      </div>
    </DashboardShell>
  );
}
