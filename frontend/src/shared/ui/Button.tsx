import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "danger-solid";
type Size = "sm" | "md" | "icon";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white border border-accent shadow-sm hover:bg-accent-hover focus-visible:ring-accent/40",
  secondary:
    "bg-white text-zinc-700 border border-subtle shadow-sm hover:bg-zinc-50 hover:border-strong focus-visible:ring-accent/30",
  ghost:
    "bg-transparent text-zinc-500 border border-transparent hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-accent/30",
  danger:
    "bg-transparent text-zinc-500 border border-transparent hover:bg-red-50 hover:text-red-600 focus-visible:ring-red-500/30",
  "danger-solid":
    "bg-red-600 text-white border border-red-600 shadow-sm hover:bg-red-700 focus-visible:ring-red-500/40",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  icon: "h-8 w-8 p-0",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium whitespace-nowrap transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:opacity-40 disabled:pointer-events-none select-none";

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
