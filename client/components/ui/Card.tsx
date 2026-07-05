import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white text-slate-900 p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}