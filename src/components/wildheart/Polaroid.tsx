import { ReactNode } from "react";

interface PolaroidProps {
  children: ReactNode;
  caption?: string;
  rotation?: number;
  tape?: boolean;
  className?: string;
}

const Polaroid = ({
  children,
  caption,
  rotation = -2,
  tape = true,
  className = "",
}: PolaroidProps) => {
  return (
    <div
      className={`relative inline-block bg-bone p-3 pb-6 hard-shadow-ink-sm border border-ink/10 ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {tape && (
        <span
          className="tape-strip"
          style={{ top: "-10px", left: "30%", transform: "rotate(-6deg)" }}
        />
      )}
      <div className="overflow-hidden bg-muted">{children}</div>
      {caption && (
        <p className="font-hand text-ink text-xl text-center mt-2">{caption}</p>
      )}
    </div>
  );
};

export default Polaroid;
