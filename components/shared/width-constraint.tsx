import { cn } from "@/lib/utils/utils";
import { ReactNode } from "react";

export default function WidthConstraint({
  className,
  children,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("container w-11/12 mx-auto overflow-hidden px-2", className)}>
      {children}
    </div>
  );
}
