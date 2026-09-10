import { useMemo, useState } from "react";
import { EstimateNote } from "./badges";
import { formatEGP } from "@/data/catalog";

function Row({
  label,
  value,
  strong = false,
  tone = "default",
}: {
  label: string;
  value: string;
  strong?: boolean;
  tone?: "default" | "success" | "danger";
}) {
  const toneClass =
    tone === "success" ? "text-success" : tone === "danger" ? "text-destructive" : "text-foreground";
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`${strong ? "text-base font-bold" : "text-sm font-semibold"} ${toneClass}`}>
        {value}
      </span>
    </div>
  );
}

export function RentalCalculator({
  pricePerDay,
  operatingCostPerDay,
}: {
  pricePerDay: number;
  operatingCostPerDay: number;
}) {
  const [days, setDays] = useState(7);
  const [hours, setHours] = useState(8);

  const rental = pricePerDay * days;
  const operating = operatingCostPerDay * (hours / 8) * days;

  return (
    <div className="surface-card p-5">
      <h3 className="text-base font-bold">Rental calculator</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="rc-days">
            Number of days
          </label>
          <input
            id="rc-days"
            type="number"
            min={1}
            max={90}
            value={days}
            onChange={(e) => setDays(Math.max(1, Number(e.target.value) || 1))}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="rc-hours">
            Working hours per day
          </label>
          <input
            id="rc-hours"
            type="number"
            min={1}
            max={16}
            value={hours}
            onChange={(e) => setHours(Math.max(1, Number(e.target.value) || 1))}
            className="field-input"
          />
        </div>
      </div>

      <div className="mt-4">
        <Row label="Estimated rental cost" value={formatEGP(rental)} />
        <Row label="Estimated operating cost" value={formatEGP(operating)} />
        <Row
          label="Estimated total working cost"
          value={formatEGP(rental + operating)}
          strong
        />
      </div>
      <EstimateNote>
        Estimate only. Fuel prices, distance covered and traffic conditions change your real cost.
      </EstimateNote>
    </div>
  );
}

export function EarningsCalculator({
  defaultRental = 120,
  defaultFuel = 60,
}: {
  defaultRental?: number;
  defaultFuel?: number;
}) {
  const [rental, setRental] = useState(defaultRental);
  const [hours, setHours] = useState(9);
  const [income, setIncome] = useState(420);
  const [fuel, setFuel] = useState(defaultFuel);
  const [reserve, setReserve] = useState(20);

  const result = useMemo(() => {
    const revenue = income;
    const operating = fuel + reserve;
    const net = revenue - operating - rental;
    return {
      revenue,
      operating,
      rental,
      net,
      weekly: net * 6,
      monthly: net * 26,
    };
  }, [income, fuel, reserve, rental]);

  return (
    <div className="surface-card p-5">
      <h3 className="text-base font-bold">Can this motorcycle work for me?</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your own numbers to see whether the rent leaves you a healthy margin.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="ec-rental">
            Rental cost / day (EGP)
          </label>
          <input
            id="ec-rental"
            type="number"
            min={0}
            value={rental}
            onChange={(e) => setRental(Number(e.target.value) || 0)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="ec-hours">
            Working hours / day
          </label>
          <input
            id="ec-hours"
            type="number"
            min={1}
            max={16}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value) || 1)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="ec-income">
            Estimated daily delivery income (EGP)
          </label>
          <input
            id="ec-income"
            type="number"
            min={0}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value) || 0)}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="ec-fuel">
            Fuel / electricity cost (EGP)
          </label>
          <input
            id="ec-fuel"
            type="number"
            min={0}
            value={fuel}
            onChange={(e) => setFuel(Number(e.target.value) || 0)}
            className="field-input"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="ec-reserve">
            Maintenance reserve / day (EGP)
          </label>
          <input
            id="ec-reserve"
            type="number"
            min={0}
            value={reserve}
            onChange={(e) => setReserve(Number(e.target.value) || 0)}
            className="field-input"
          />
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-secondary p-4">
        <Row label="Estimated daily revenue" value={formatEGP(result.revenue)} />
        <Row label="Estimated daily operating cost" value={formatEGP(result.operating)} tone="danger" />
        <Row label="Estimated daily rental cost" value={formatEGP(result.rental)} tone="danger" />
        <Row
          label="Estimated daily net"
          value={formatEGP(result.net)}
          strong
          tone={result.net >= 0 ? "success" : "danger"}
        />
        <Row label="Estimated weekly net (6 days)" value={formatEGP(result.weekly)} />
        <Row label="Estimated monthly net (26 days)" value={formatEGP(result.monthly)} />
        <p className="pt-2 text-xs text-muted-foreground">
          Based on {hours} working hours per day.
        </p>
      </div>

      <EstimateNote>
        <strong>Estimate</strong> — actual earnings vary by platform, demand, working hours, location
        and rider performance. MotoRent does not guarantee any income.
      </EstimateNote>
    </div>
  );
}
