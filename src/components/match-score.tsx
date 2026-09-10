import { Check } from "lucide-react";

export function MatchScore({
  score,
  reasons,
  compact = false,
}: {
  score: number;
  reasons?: string[];
  compact?: boolean;
}) {
  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md border border-success/30 bg-success/12 px-2 py-1 text-xs font-bold text-success">
        {score}% Match
      </span>
    );
  }

  return (
    <div className="surface-card p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-2xl font-bold">{score}% Match</p>
          <p className="text-xs text-muted-foreground">Based on your rider profile</p>
        </div>
        <div className="h-12 w-12 shrink-0 rounded-full border-4 border-success/25 border-t-success" />
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-success" style={{ width: `${score}%` }} />
      </div>
      {reasons && reasons.length > 0 && (
        <ul className="mt-4 space-y-2">
          {reasons.map((reason) => (
            <li key={reason} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 text-xs text-muted-foreground">
        Matching uses your area, budget, bike type, working hours and experience — nothing hidden.
      </p>
    </div>
  );
}
