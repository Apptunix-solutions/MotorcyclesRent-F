import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MaintenanceCard } from "@/components/maintenance-card";
import { EmptyState } from "@/components/states";
import { MAINTENANCE_CATEGORIES, PROVIDERS } from "@/data/catalog";

export const Route = createFileRoute("/maintenance")({
  head: () => ({
    meta: [
      { title: "Motorcycle maintenance providers | MotoRent" },
      {
        name: "description",
        content:
          "Book oil changes, tires, brakes, battery and engine work with rated motorcycle workshops near you.",
      },
      { property: "og:title", content: "Motorcycle maintenance providers | MotoRent" },
      {
        property: "og:description",
        content: "Rated workshops with starting prices, opening hours and verified status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MaintenancePage,
});

function MaintenancePage() {
  const [service, setService] = useState("All services");

  const results = useMemo(
    () =>
      PROVIDERS.filter(
        (p) => service === "All services" || p.services.includes(service),
      ).sort((a, b) => a.distanceKm - b.distanceKm),
    [service],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight">Maintenance</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Keep your bike earning. Compare nearby workshops by service, rating and starting price.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All services", ...MAINTENANCE_CATEGORIES].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setService(cat)}
            className={
              service === cat
                ? "btn-base bg-primary text-primary-foreground"
                : "btn-base border border-border text-muted-foreground hover:bg-secondary"
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No workshops for this service yet"
            description="Pick another service category to see available providers."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {results.map((provider) => (
            <MaintenanceCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}
    </div>
  );
}
