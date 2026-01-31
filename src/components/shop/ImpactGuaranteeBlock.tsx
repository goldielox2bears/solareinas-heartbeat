import { Heart, Leaf, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImpactGuaranteeBlockProps {
  variant?: "default" | "compact";
  className?: string;
}

const ImpactGuaranteeBlock = ({ variant = "default", className = "" }: ImpactGuaranteeBlockProps) => {
  const isCompact = variant === "compact";

  return (
    <div className={`bg-gradient-to-br from-secondary/40 to-sanctuary-earth/20 rounded-2xl border border-border ${isCompact ? 'p-4' : 'p-6 md:p-8'} ${className}`}>
      <div className={`space-y-${isCompact ? '3' : '4'} text-center`}>
        {/* Impact Message */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Heart className="w-5 h-5" />
            <span className={`font-medium ${isCompact ? 'text-sm' : 'text-base'}`}>
              Every purchase funds the ranch.
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-foreground/80">
            <Leaf className="w-4 h-4 text-primary" />
            <span className={`${isCompact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
              100% of proceeds fund animal care + land regeneration.
            </span>
          </div>
          
          <p className={`${isCompact ? 'text-sm' : 'text-lg'} font-light text-foreground italic`}>
            We did this. Together.
          </p>
        </div>
        
        {/* Guarantee CTA */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Shield className="w-4 h-4 text-primary" />
            <span className={`${isCompact ? 'text-xs' : 'text-sm'} font-medium text-foreground`}>
              Try it. Love it. Or we refund it.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactGuaranteeBlock;
