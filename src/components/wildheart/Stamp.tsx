import { ReactNode } from "react";

interface StampProps {
  children: ReactNode;
  rotation?: number;
  className?: string;
}

const Stamp = ({ children, rotation = -4, className = "" }: StampProps) => {
  return (
    <span
      className={`inline-flex items-center justify-center font-hand font-bold text-lg bg-marigold text-ink border-2 border-ink px-3 py-1 hard-shadow-ink-sm ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </span>
  );
};

export default Stamp;
