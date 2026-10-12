import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  message: string;
  children?: ReactNode;
};

export function EmptyState({
  icon: Icon,
  title,
  message,
  children
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon">
        <Icon size={26} aria-hidden="true" />
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
      {children}
    </div>
  );
}
