import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MotorcycleCard } from "@/components/motorcycle-card";
import { EmptyState } from "@/components/states";
import { AREAS, BIKE_TYPES, MOTORCYCLES } from "@/data/catalog";

export const Route = createFileRoute("/motorcycles/")({
  head: () => ({
    meta: [
      { title: "Motorcycles for delivery riders | MotoRent" },
      {
        name: "description",
        content:
          "Browse work-ready motorcycles by area, type and daily price, with fuel cost and cargo details shown up front.",
      },
      { property: "og:title", content: "Motorcycles for delivery riders | MotoRent" },
      {
        property: "og:description",
        content: "Verified bikes with transparent daily rent, deposits and running costs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MotorcyclesPage,
});

function MotorcyclesPage() {
  const [area, setArea] = useState("All areas");
  const [type, setType] = useState("All types");
  const [maxPrice, setMaxPrice] = useState(300);
  const [sort, setSort] = useState("match");

  const results = useMemo(() => {
    const filtered = MOTORCYCLES.filter(
      (bike) =>
        (area === "All areas" || bike.location === area) &&
        (type === "All types" || bike.type === type) &&
        bike.pricePerDay <= maxPrice,
    );
    return [...filtered].sort((a, b) =>
      sort === "price" ? a.pricePerDay - b.pricePerDay : b.matchScore - a.matchScore,
    );
  }, [area, type, maxPrice, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight">Motorcycles</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Every listing shows the daily rent, deposit, fuel consumption and cargo setup so you can
        judge the real cost of a shift.
      </p>

      <div className="surface-card mt-6 grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="field-label" htmlFor="f-area">
            Area
          </label>
          <select
            id="f-area"
            className="field-input"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option>All areas</option>
            {AREAS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="f-type">
            Bike type
          </label>
          <select
            id="f-type"
            className="field-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>All types</option>
            {BIKE_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="f-price">
            Max price / day: {maxPrice} EGP
          </label>
          <input
            id="f-price"
            type="range"
            min={80}
            max={300}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-3 w-full accent-primary"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="f-sort">
            Sort by
          </label>
          <select
            id="f-sort"
            className="field-input"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="match">Best match</option>
            <option value="price">Lowest daily price</option>
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{results.length} motorcycles available</p>

      {results.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No motorcycles match these filters"
            description="Try widening your budget or choosing a nearby area."
          />
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((bike) => (
            <MotorcycleCard key={bike.id} bike={bike} showMatch />
          ))}
        </div>
      )}
    </div>
  );
}
