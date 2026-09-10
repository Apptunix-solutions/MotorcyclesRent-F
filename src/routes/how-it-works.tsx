import { createFileRoute, Link } from "@tanstack/react-router";
import { EstimateNote, WarningNote } from "@/components/badges";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How MotoRent works for riders and owners" },
      {
        name: "description",
        content:
          "Step by step: how riders rent a work-ready motorcycle, how owners list a bike, and how deposits, maintenance and terms work.",
      },
      { property: "og:title", content: "How MotoRent works for riders and owners" },
      {
        property: "og:description",
        content: "Rental steps, deposits, maintenance responsibility and rider verification explained.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

const riderSteps = [
  "Create your rider profile: area, budget, preferred bike type and working hours.",
  "Browse matched motorcycles and check daily rent, deposit and running cost.",
  "Request the bike you want and agree the terms with the owner.",
  "Collect the bike, start your shifts and log your income in the dashboard.",
];

const ownerSteps = [
  "List your motorcycle with photos, condition and documents.",
  "Set your own daily, weekly and monthly price plus the deposit.",
  "Review rider requests, ratings and verification before accepting.",
  "Track active rentals, earnings and maintenance in the owner dashboard.",
];

export function Column({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="surface-card p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <ol className="mt-4 space-y-4">
        {steps.map((step, i) => (
          <li key={step} className="flex gap-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/12 text-xs font-bold text-primary">
              {i + 1}
            </span>
            <span className="text-sm text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function HowItWorks() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight">How it works</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        MotoRent is a rental and matching platform. You always deal with a verified owner under
        terms you both agree.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Column title="For riders" steps={riderSteps} />
        <Column title="For owners and fleets" steps={ownerSteps} />
      </div>

      <div className="mt-8 space-y-4">
        <WarningNote>
          Deposits are held by the owner and refunded after the bike is returned in the agreed
          condition. Confirm in writing who pays for repairs, fines and insurance.
        </WarningNote>
        <EstimateNote>
          Earnings, fuel and maintenance figures across MotoRent are estimates for planning only.
        </EstimateNote>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/motorcycles" className="btn-primary">
          Find a motorcycle
        </Link>
        <Link to="/partner" className="btn-outline">
          List your motorcycle
        </Link>
      </div>
    </div>
  );
}
