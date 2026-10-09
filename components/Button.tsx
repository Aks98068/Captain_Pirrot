import { type ReactNode } from "react";
import Icon from "@/components/Icon";

export default function Button({
  children,
  variant = "primary",
  icon = "arrow",
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: string;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} className={`btn btn-${variant}`}>
      <span>{children}</span>
      {icon && <Icon name={icon} />}
    </button>
  );
}
