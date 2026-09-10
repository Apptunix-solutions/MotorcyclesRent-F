import { createFileRoute, Link } from "@tanstack/react-router";
import { EstimateNote, WarningNote } from "@/components/badges";
import { EarningsCalculator } from "@/components/calculators";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "List your motorcycle and earn | MotoRent partners" },
      {
        name: "description",
        content:
          "Rent out your motorcycle to verified delivery riders. Set your own price and deposit, review requests, and track earnings from the owner dashboard.",
      },
      { property: "og:title", content: "List your motorcycle and earn | MotoRent partners" },
      {
        property: "og:description",
        content: "Set your price, review verified riders and track rentals in one dashboard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PartnerPage,
});

const benefits = [
  {
    title: "You set the price",
    body: "Daily, weekly and monthly rates plus the deposit are fully yours to decide.",
  },
  {
    title: "Verified riders only",
    body: "Every request shows the rider's ID status, rating and working history before you accept.",
  },
  {
    title: "One place to track",
    body: "Active rentals, upcoming returns, maintenance and payouts in the owner dashboard.",
  },
  {
    title: "No exclusivity",
    body: "Pause your listing or take the bike back whenever your agreement allows it.",
  },
];

const steps = [
  "Add your motorcycle with photos, condition notes and documents.",
  "Set your daily, weekly and monthly price plus the refundable deposit.",
  "Review rider requests and accept the one you trust.",
  "Hand over the bike and follow the rental from your dashboard.",
];

function PartnerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
      <section className="surface-card p-6 md:p-10">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">For owners and fleets</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          Turn an idle motorcycle into steady monthly income
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          MotoRent connects your bike with delivery riders who need a work-ready motorcycle today.
          You keep control of the price, the deposit and who rides.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/owner/add-motorcycle" className="btn-primary">
            List your motorcycle
          </Link>
          <Link to="/owner" className="btn-outline">
            Open owner dashboard
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        {benefits.map((b) => (
          <div key={b.title} className="surface-card p-5">
            <h2 className="text-base font-bold">{b.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{b.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-6">
          <h2 className="text-lg font-bold">How listing works</h2>
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
        <EarningsCalculator />
      </section>

      <div className="mt-8 space-y-4">
        <WarningNote>
          Keep registration, licence and insurance documents valid. Agree in writing who pays for
          repairs, fines and fuel before handing over the bike.
        </WarningNote>
        <EstimateNote>
          All income figures shown on MotoRent are planning estimates, not guaranteed earnings.
        </EstimateNote>
      </div>
    </div>
  );
}
