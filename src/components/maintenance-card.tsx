import { Clock, MapPin, Star, Wrench } from "lucide-react";
import { StatusBadge, VerificationBadge } from "./badges";
import { formatEGP, type MaintenanceProvider } from "@/data/catalog";

export function MaintenanceCard({ provider }: { provider: MaintenanceProvider }) {
  return (
    <article className="surface-card p-5">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold">{provider.name}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {provider.distanceKm} km · {provider.area}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-primary" />
              {provider.rating} ({provider.reviews})
            </span>
          </p>
        </div>
        {provider.verified && <VerificationBadge />}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {provider.services.map((service) => (
          <StatusBadge key={service} icon={<Wrench className="h-3.5 w-3.5" />}>
            {service}
          </StatusBadge>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="font-bold text-primary">From {formatEGP(provider.startingPrice)}</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {provider.hours}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn-primary">
          View service
        </button>
        <button type="button" className="btn-outline">
          Book maintenance
        </button>
      </div>
    </article>
  );
}
