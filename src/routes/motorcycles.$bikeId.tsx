import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, MapPin, Star } from "lucide-react";
import { AvailabilityBadge, EstimateNote, StatusBadge, VerificationBadge, WarningNote } from "@/components/badges";
import { EarningsCalculator, RentalCalculator } from "@/components/calculators";
import { MatchScore } from "@/components/match-score";
import { formatEGP, MOTORCYCLES } from "@/data/catalog";

export const Route = createFileRoute("/motorcycles/$bikeId")({
  loader: ({ params }) => {
    const bike = MOTORCYCLES.find((b) => b.id === params.bikeId);
    if (!bike) throw notFound();
    return { bike };
  },
  component: MotorcycleDetail,
});

function MotorcycleDetail() {
  const { bike } = Route.useLoaderData();

  const specs = [
    { label: "Engine", value: bike.engine },
    { label: "Transmission", value: bike.transmission },
    { label: "Fuel", value: bike.fuel },
    { label: "Consumption", value: bike.consumption },
    { label: "Storage", value: bike.storage },
    { label: "Comfortable hours", value: bike.comfortableHours },
    { label: "Maintenance", value: bike.maintenanceStatus },
    { label: "Year", value: String(bike.year) },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Link to="/motorcycles" className="text-sm font-semibold text-primary">
        ← Back to motorcycles
      </Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div>
          <div className="surface-card overflow-hidden">
            <img
              src={bike.image}
              alt={`${bike.brand} ${bike.model}`}
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {bike.brand} {bike.model}
              </h1>
              <p className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {bike.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-primary" />
                  {bike.rating} ({bike.reviews} reviews)
                </span>
                <span>{bike.type}</span>
              </p>
            </div>
            <AvailabilityBadge availability={bike.availability} />
          </div>

          <div className="surface-card mt-6 p-5">
            <h2 className="text-base font-bold">Specifications</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {specs.map((spec) => (
                <div key={spec.label} className="border-b border-border pb-2">
                  <dt className="text-xs text-muted-foreground">{spec.label}</dt>
                  <dd className="text-sm font-semibold">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="surface-card mt-6 p-5">
            <h2 className="text-base font-bold">Why riders pick this bike</h2>
            <ul className="mt-4 space-y-2">
              {bike.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              {bike.helmet && <StatusBadge tone="success">Helmet included</StatusBadge>}
              {bike.deliveryBox && <StatusBadge tone="success">Delivery box</StatusBadge>}
              {bike.maintenanceIncluded && <StatusBadge tone="success">Maintenance included</StatusBadge>}
              {bike.insurance && <StatusBadge tone="success">Insurance included</StatusBadge>}
            </div>
          </div>

          <div className="mt-6 grid gap-6">
            <RentalCalculator
              pricePerDay={bike.pricePerDay}
              operatingCostPerDay={bike.operatingCostPerDay}
            />
            <EarningsCalculator
              defaultRental={bike.pricePerDay}
              defaultFuel={bike.fuelCostPerDay}
            />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="surface-card p-5">
            <p className="text-3xl font-extrabold text-primary">{formatEGP(bike.pricePerDay)}</p>
            <p className="text-sm text-muted-foreground">per day</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Weekly</dt>
                <dd className="font-semibold">{formatEGP(bike.pricePerWeek)}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Monthly</dt>
                <dd className="font-semibold">{formatEGP(bike.pricePerMonth)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Refundable deposit</dt>
                <dd className="font-semibold">{formatEGP(bike.deposit)}</dd>
              </div>
            </dl>
            <button type="button" className="btn-primary mt-5 w-full">
              Request this motorcycle
            </button>
            <button type="button" className="btn-outline mt-2 w-full">
              Contact owner
            </button>
            <EstimateNote>
              The deposit is refundable after the bike is returned in the agreed condition.
            </EstimateNote>
          </div>

          <div className="surface-card p-5">
            <h2 className="text-base font-bold">Owner</h2>
            <p className="mt-2 text-sm font-semibold">{bike.owner.name}</p>
            <p className="text-xs text-muted-foreground">{bike.owner.type}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {bike.owner.verified && <VerificationBadge label="Verified owner" />}
              {bike.registrationVerified && <StatusBadge tone="success">Registration checked</StatusBadge>}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{bike.owner.phone}</p>
          </div>

          <MatchScore score={bike.matchScore} reasons={bike.matchReasons} />

          <WarningNote>
            Always read the rental terms before signing. Check the deposit, mileage limits and who
            pays for repairs.
          </WarningNote>
        </aside>
      </div>
    </div>
  );
}
