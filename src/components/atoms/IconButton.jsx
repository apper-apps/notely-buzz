import React from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const IconButton = forwardRef(({ 
  className, 
  variant = "ghost", 
  size = "md", 
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700",
    accent: "bg-accent text-white hover:bg-accent/90",
    danger: "bg-error text-white hover:bg-error/90",
  };

  const sizes = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

IconButton.displayName = "IconButton";

export default IconButton;