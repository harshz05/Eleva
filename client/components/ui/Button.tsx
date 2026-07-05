import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "rounded-lg px-5 py-3 font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg",

    secondary:
      "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 hover:shadow-md",

    outline:
      "border border-slate-300 bg-transparent text-slate-900 hover:bg-slate-100",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}