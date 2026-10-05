import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, className = "", id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[13px] font-medium text-zinc-600"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={[
              "w-full h-9 rounded-lg bg-white border text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm",
              "transition-colors outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent",
              "disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-zinc-50",
              leftIcon ? "pl-9 pr-3" : "px-3",
              error ? "border-red-400" : "border-subtle hover:border-strong",
              className,
            ].join(" ")}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
