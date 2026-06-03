import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    descriptor_line: string | null;
    price_cents: number;
    images: string[];
    image_url?: string | null;
    hero: boolean;
    category?: string | null;
    impact_summary?: string | null;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const priceDisplay = (product.price_cents / 100).toFixed(2);
  const firstImage = product.image_url || product.images?.[0] || "/placeholder.svg";
  const impactLine = product.impact_summary?.trim() || "Helps feed the farm.";

  return (
    <Link to={`/shop/${product.slug}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-warm hover:-translate-y-0.5 border border-border bg-card rounded-sm h-full flex flex-col">
        <div className="aspect-square overflow-hidden bg-secondary/30">
          <img
            src={firstImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <CardContent className="p-5 flex flex-col flex-1 gap-2">
          {product.category && (
            <p className="font-label uppercase tracking-[0.22em] text-[0.62rem] text-accent">
              {product.category}
            </p>
          )}

          <h3 className="font-prairie-display text-xl text-foreground leading-tight">
            {product.name}
          </h3>

          {product.descriptor_line && (
            <p className="font-prairie-body text-sm text-foreground/75 line-clamp-2">
              {product.descriptor_line}
            </p>
          )}

          <div className="mt-auto pt-3 flex items-end justify-between gap-3">
            <p className="font-prairie-display text-xl text-foreground">
              €{priceDisplay}
            </p>
            <span className="inline-flex items-center gap-1 text-[0.7rem] font-label uppercase tracking-[0.16em] text-primary">
              <Sprout className="w-3 h-3" />
              {impactLine}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
