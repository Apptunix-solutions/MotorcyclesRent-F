import { BadgeCheck, CircleAlert, CircleCheck, Clock, Info } from "lucide-react";
import type { ReactNode } from "react";

type Tone = "neutral" | "success" | "warning" | "action" | "danger";

const toneClass: Record<Tone, string> = {
  neutral: "bg-secondary text-secondary-foreground border-border",
  success: "bg-success/12 text-success border-success/30",
  warning: "bg-warning/15 text-warning-foreground border-warning/40",
  action: "bg-primary/12 text-primary border-primary/30",
  danger: "bg-destructive/12 text-destructive border-destructive/30",
};

export function StatusBadge({
  children,
  tone = "neutral",
  icon,
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-semibold ${toneClass[tone]}`}
    >
      {icon}
      {children}
    </span>
  );
}

export function VerificationBadge({ label = "Verified" }: { label?: string }) {
  return (
    <StatusBadge tone="success" icon={<BadgeCheck className="h-3.5 w-3.5" />}>
      {label}
    </StatusBadge>
  );
}

export function AvailabilityBadge({ availability }: { availability: string }) {
  if (availability === "Rented") {
    return (
      <StatusBadge tone="neutral" icon={<Clock className="h-3.5 w-3.5" />}>
        Rented
      </StatusBadge>
    );
  }
  if (availability.startsWith("Available now")) {
    return (
      <StatusBadge tone="success" icon={<CircleCheck className="h-3.5 w-3.5" />}>
        Available now
      </StatusBadge>
    );
  }
  return (
    <StatusBadge tone="warning" icon={<Clock className="h-3.5 w-3.5" />}>
      {availability}
    </StatusBadge>
  );
}

export function EstimateNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 flex gap-2 rounded-md bg-secondary p-3 text-xs leading-relaxed text-muted-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export function WarningNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2 rounded-md border border-warning/40 bg-warning/10 p-3 text-xs leading-relaxed text-foreground">
      <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" />
      <span>{children}</span>
    </p>
  );
}
