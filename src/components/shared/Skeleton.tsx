import React from "react";

/**
 * A reusable pulse skeleton block component.
 * Standard professional practice: Extend HTML attributes for flexibility.
 */
export const Skeleton = ({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} {...props} />
);
