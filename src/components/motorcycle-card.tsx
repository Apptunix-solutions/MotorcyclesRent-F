import { Link } from "@tanstack/react-router";
import { Fuel, Gauge, MapPin, Package, ShieldCheck, Star } from "lucide-react";
import { AvailabilityBadge, StatusBadge } from "./badges";
import { MatchScore } from "./match-score";
import { formatEGP, type Motorcycle } from "@/data/catalog";

export function MotorcycleCard({
  bike,
  showMatch = false,
}: {
  bike: Motorcycle;
  showMatch?: boolean;
}) {
  return (
    <article className="surface-card group flex flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={bike.image}
          alt={`${bike.brand} ${bike.model} for delivery work`}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {bike.deliveryReady && <StatusBadge tone="action">Delivery Ready</StatusBadge>}
          {showMatch && <MatchScore score={bike.matchScore} compact />}
        </div>
        <div className="absolute right-3 top-3">
          <AvailabilityBadge availability={bike.availability} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold">{bike.model}</h3>
            <p className="truncate text-xs text-muted-foreground">
              {bike.brand} · {bike.year} · {bike.type}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-lg font-bold text-primary">{formatEGP(bike.pricePerDay)}</p>
            <p className="text-xs text-muted-foreground">per day</p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{bike.fuel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{bike.consumption}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{bike.deliveryBox ? "Delivery box" : "Box optional"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{bike.helmet ? "Helmet available" : "Bring helmet"}</span>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {bike.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-primary" />
            {bike.rating} ({bike.reviews})
          </span>
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <Link
            to="/motorcycles/$bikeId"
            params={{ bikeId: bike.id }}
            className="btn-primary flex-1"
          >
            View motorcycle
          </Link>
          <button type="button" className="btn-outline">
            Compare
          </button>
        </div>
      </div>
    </article>
  );
}
