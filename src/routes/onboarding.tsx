import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AREAS, BIKE_TYPES, WORKING_HOURS } from "@/data/catalog";
import { EstimateNote } from "@/components/badges";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Rider onboarding | Get matched with a motorcycle" },
      {
        name: "description",
        content:
          "Tell us your area, budget, bike type and working hours and we match you with work-ready motorcycles and delivery jobs.",
      },
      { property: "og:title", content: "Rider onboarding | Get matched with a motorcycle" },
      {
        property: "og:description",
        content: "A short profile so we can match you with the right bike and the right shift.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: AREAS[0] as string,
    budget: 150,
    bikeType: BIKE_TYPES[0] as string,
    hours: WORKING_HOURS[0] as string,
    licence: "yes",
  });

  const set = (key: keyof typeof form, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Profile saved</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks {form.name || "rider"} — we will match motorcycles in {form.area} within your{" "}
          {form.budget} EGP/day budget.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/motorcycles" className="btn-primary">
            See matched motorcycles
          </Link>
          <Link to="/dashboard" className="btn-outline">
            Go to my dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight">Rider onboarding</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Step {step} of 3 — this takes about a minute.
      </p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <form
        className="surface-card mt-6 space-y-4 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) setStep(step + 1);
          else setDone(true);
        }}
      >
        {step === 1 && (
          <>
            <div>
              <label className="field-label" htmlFor="ob-name">Full name</label>
              <input
                id="ob-name"
                className="field-input"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="field-label" htmlFor="ob-phone">Phone number</label>
              <input
                id="ob-phone"
                className="field-input"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="010 xxxx xxxx"
                required
              />
            </div>
            <div>
              <label className="field-label" htmlFor="ob-area">Working area</label>
              <select
                id="ob-area"
                className="field-input"
                value={form.area}
                onChange={(e) => set("area", e.target.value)}
              >
                {AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="field-label" htmlFor="ob-budget">Daily budget (EGP)</label>
              <input
                id="ob-budget"
                type="number"
                min={50}
                max={600}
                className="field-input"
                value={form.budget}
                onChange={(e) => set("budget", Number(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="ob-type">Preferred motorcycle type</label>
              <select
                id="ob-type"
                className="field-input"
                value={form.bikeType}
                onChange={(e) => set("bikeType", e.target.value)}
              >
                {BIKE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="ob-hours">Working hours</label>
              <select
                id="ob-hours"
                className="field-input"
                value={form.hours}
                onChange={(e) => set("hours", e.target.value)}
              >
                {WORKING_HOURS.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="field-label" htmlFor="ob-licence">Do you hold a valid licence?</label>
              <select
                id="ob-licence"
                className="field-input"
                value={form.licence}
                onChange={(e) => set("licence", e.target.value)}
              >
                <option value="yes">Yes, valid licence</option>
                <option value="progress">In progress</option>
                <option value="no">Not yet</option>
              </select>
            </div>
            <EstimateNote>
              Owners verify licence and ID before handing over a motorcycle. Matching results are
              estimates based on the details you enter.
            </EstimateNote>
          </>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          {step > 1 && (
            <button type="button" className="btn-outline" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          <button type="submit" className="btn-primary">
            {step < 3 ? "Continue" : "Finish and see matches"}
          </button>
        </div>
      </form>
    </div>
  );
}
