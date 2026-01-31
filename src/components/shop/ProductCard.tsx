import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    descriptor_line: string | null;
    price_cents: number;
    images: string[];
    hero: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const priceDisplay = (product.price_cents / 100).toFixed(2);
  const firstImage = product.images?.[0] || "/placeholder.svg";

  return (
    <Link to={`/shop/${product.slug}`}>
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-warm hover:-translate-y-1 border-2 ${
        product.hero 
          ? 'border-primary bg-gradient-to-br from-primary/5 to-sanctuary-amber/10' 
          : 'border-border hover:border-primary/30'
      }`}>
        {product.hero && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-primary text-primary-foreground gap-1">
              <Sparkles className="w-3 h-3" />
              Hero
            </Badge>
          </div>
        )}
        
        <div className="aspect-square overflow-hidden bg-secondary/20">
          <img 
            src={firstImage} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <CardContent className="p-4 space-y-2">
          <h3 className={`font-medium text-foreground ${product.hero ? 'text-lg' : 'text-base'}`}>
            {product.name}
          </h3>
          
          {product.descriptor_line && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.descriptor_line}
            </p>
          )}
          
          <p className="text-lg font-semibold text-foreground">
            €{priceDisplay}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
