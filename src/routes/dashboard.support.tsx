import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";

export const Route = createFileRoute("/dashboard/support")({
  head: () => ({
    meta: [
      { title: "Support | Rider dashboard" },
      { name: "description", content: "Get help with rentals, deposits, jobs and maintenance." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SupportPage,
});

const faqs = [
  { q: "When do I get my deposit back?", a: "After you return the bike in the agreed condition and the owner confirms it." },
  { q: "Who pays for repairs?", a: "It depends on your agreement. Confirm it in writing with the owner before pickup." },
  { q: "Can I change my motorcycle?", a: "Yes, once the current rental period ends or the owner agrees to end it early." },
];

function SupportPage() {
  const [sent, setSent] = useState(false);

  return (
    <DashboardShell role="rider" title="Support" subtitle="We usually reply within a few hours.">
      <div className="surface-card p-5">
        <h3 className="text-base font-bold">Common questions</h3>
        <dl className="mt-3 space-y-3">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-border pb-3 last:border-0 last:pb-0">
              <dt className="text-sm font-semibold">{f.q}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      <form
        className="surface-card space-y-4 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <h3 className="text-base font-bold">Send a message</h3>
        <div>
          <label className="field-label" htmlFor="sp-subject">Subject</label>
          <input id="sp-subject" className="field-input" required placeholder="What do you need help with?" />
        </div>
        <div>
          <label className="field-label" htmlFor="sp-body">Message</label>
          <textarea id="sp-body" className="field-input min-h-28" required placeholder="Describe the issue" />
        </div>
        <button type="submit" className="btn-primary">Send message</button>
        {sent && <p className="text-sm font-semibold text-success">Message sent. We will contact you soon.</p>}
      </form>

      <Link to="/how-it-works" className="btn-outline">
        Read how it works
      </Link>
    </DashboardShell>
  );
}
