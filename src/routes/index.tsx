import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, Bike, Briefcase, ShieldCheck, Wrench } from "lucide-react";
import heroRider from "@/assets/hero-rider.jpg";
import { EstimateNote, StatusBadge } from "@/components/badges";
import { JobCard } from "@/components/job-card";
import { MotorcycleCard } from "@/components/motorcycle-card";
import { JOBS, MOTORCYCLES } from "@/data/catalog";

export const Route = createFileRoute("/")({
  component: Index,
});

const steps = [
  {
    icon: Bike,
    title: "Pick a work-ready bike",
    text: "Compare verified motorcycles by price, fuel cost, cargo space and area.",
  },
  {
    icon: Briefcase,
    title: "Match with delivery jobs",
    text: "See opportunities that accept your bike type, area and working hours.",
  },
  {
    icon: Wrench,
    title: "Keep it on the road",
    text: "Book maintenance with rated local providers and track service history.",
  },
  {
    icon: Banknote,
    title: "Track your real margin",
    text: "Log rent, fuel and income so you always know what you actually keep.",
  },
];

function Index() {
  const featured = MOTORCYCLES.slice(0, 3);
  const jobs = JOBS.slice(0, 2);

  return (
    <>
      <section className="bg-graphite text-graphite-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <StatusBadge tone="action">Verified owners · Delivery ready</StatusBadge>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Rent a bike. <span className="text-primary">Start earning.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-graphite-foreground/75">
              MotoRent connects delivery riders with work-ready motorcycles, real delivery jobs and
              trusted maintenance — with the running costs shown up front.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/motorcycles" className="btn-primary">
                Find a motorcycle
              </Link>
              <Link
                to="/jobs"
                className="btn-base border border-white/20 text-graphite-foreground hover:bg-white/10"
              >
                Browse delivery jobs
              </Link>
            </div>
            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="text-graphite-foreground/60">Bikes listed</dt>
                <dd className="text-xl font-bold">{MOTORCYCLES.length}+</dd>
              </div>
              <div>
                <dt className="text-graphite-foreground/60">Open jobs</dt>
                <dd className="text-xl font-bold">{JOBS.length}+</dd>
              </div>
              <div>
                <dt className="text-graphite-foreground/60">Cities</dt>
                <dd className="text-xl font-bold">9</dd>
              </div>
            </dl>
          </div>
          <div className="overflow-hidden rounded-xl border border-white/10">
            <img
              src={heroRider}
              alt="Delivery rider on a motorcycle in the city"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight">How MotoRent works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, text }) => (
            <article key={title} className="surface-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary/12 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight">Recommended motorcycles</h2>
          <Link to="/motorcycles" className="btn-outline">
            See all motorcycles
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((bike) => (
            <MotorcycleCard key={bike.id} bike={bike} showMatch />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight">Latest delivery jobs</h2>
          <Link to="/jobs" className="btn-outline">
            See all jobs
          </Link>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <EstimateNote>
          Earnings shown across MotoRent are estimates based on rider-reported data — never a
          guarantee.
        </EstimateNote>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="surface-card flex flex-wrap items-center justify-between gap-5 p-6">
          <div className="max-w-xl">
            <h2 className="flex items-center gap-2 text-xl font-extrabold">
              <ShieldCheck className="h-5 w-5 text-success" />
              Own a motorcycle sitting idle?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              List it with MotoRent, choose your own terms and rent it to verified riders.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/partner" className="btn-primary">
              Become a partner
            </Link>
            <Link to="/onboarding" className="btn-outline">
              Rider onboarding
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
