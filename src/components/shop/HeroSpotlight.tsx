import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroSpotlightProps {
  product: {
    name: string;
    slug: string;
    descriptor_line: string | null;
    hero_hook: string | null;
    images: string[];
  } | null;
}

const HeroSpotlight = ({ product }: HeroSpotlightProps) => {
  if (!product) return null;

  const heroImage = product.images?.[0] || "/placeholder.svg";

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-copper rounded-full opacity-20 blur-2xl" />
            <img 
              src={heroImage} 
              alt={product.name}
              className="w-full max-w-lg mx-auto rounded-2xl shadow-warm"
            />
          </div>
          
          {/* Hero Text */}
          <div className="text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Hero Product</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight">
              {product.name}
            </h1>
            
            {product.descriptor_line && (
              <p className="text-xl text-muted-foreground font-light">
                {product.descriptor_line}
              </p>
            )}
            
            {product.hero_hook && (
              <p className="text-lg text-foreground/80 leading-relaxed max-w-xl">
                {product.hero_hook}
              </p>
            )}
            
            <Button asChild variant="steward" size="lg" className="mt-4">
              <Link to={`/shop/${product.slug}`}>
                Shop the hero bar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSpotlight;
