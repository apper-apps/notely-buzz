import React from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    outline: "border border-gray-300 bg-transparent text-gray-700",
    success: "bg-success text-white",
    warning: "bg-warning text-white",
    error: "bg-error text-white",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Badge.displayName = "Badge";

export default Badge;