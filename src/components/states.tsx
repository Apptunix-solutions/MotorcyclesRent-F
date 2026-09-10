import { Link } from "@tanstack/react-router";
import { SearchX, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-card flex flex-col items-center px-6 py-14 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary">
        <SearchX className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="surface-card h-32 animate-pulse" />
      ))}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="surface-card flex flex-col items-center px-6 py-12 text-center">
      <TriangleAlert className="h-6 w-6 text-destructive" />
      <h3 className="mt-3 text-lg font-semibold">Something went wrong</h3>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      <Link to="/" className="btn-outline mt-5">
        Back to home
      </Link>
    </div>
  );
}
