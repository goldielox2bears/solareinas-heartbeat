import { Sparkles } from "lucide-react";

const TrustStrip = () => {
  return (
    <div className="w-full py-3 bg-gradient-copper text-white">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium tracking-wide">
          Not mass-made. Ranch-made.
        </span>
        <Sparkles className="w-4 h-4" />
      </div>
    </div>
  );
};

export default TrustStrip;
