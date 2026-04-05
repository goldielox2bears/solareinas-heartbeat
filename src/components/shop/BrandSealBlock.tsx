import srrLogo from "@/assets/srr-logo-transparent.png";

interface BrandSealBlockProps {
  className?: string;
}

const BrandSealBlock = ({ className = "" }: BrandSealBlockProps) => {
  return (
    <div className={`bg-card rounded-2xl border border-border p-8 text-center ${className}`}>
      <div className="flex flex-col items-center gap-4">
        {/* SR Logo */}
        <img 
          src={srrLogo} 
          alt="Solareinas Ranch" 
          className="w-20 h-20 object-contain"
        />
        
        {/* Brand Text */}
        <div className="space-y-2">
          <h4 className="text-lg font-medium text-foreground">
            Made Here, For You — by Solareinas
          </h4>
          <p className="text-sm text-muted-foreground italic">
            Made for you. Made for them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandSealBlock;
