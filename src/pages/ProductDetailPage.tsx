import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProductBySlug } from "@/hooks/useProducts";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import TrustStrip from "@/components/shop/TrustStrip";
import ImpactGuaranteeBlock from "@/components/shop/ImpactGuaranteeBlock";
import BrandSealBlock from "@/components/shop/BrandSealBlock";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Check, Droplets, Leaf, Loader2, Minus, Plus, ShoppingBag, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProductBySlug(slug || "");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} × ${product?.name} to cart`, {
      description: "Thank you for supporting the ranch!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SanctuaryNavigation />
        <div className="pt-32 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <SanctuaryNavigation />
        <div className="pt-32 text-center px-6">
          <h1 className="text-2xl font-light text-foreground mb-4">Product not found</h1>
          <Button asChild variant="outline">
            <Link to="/shop">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const priceDisplay = (product.price_cents / 100).toFixed(2);
  const images = product.images?.length > 0 ? product.images : ["/placeholder.svg"];

  return (
    <div className="min-h-screen bg-background">
      <SanctuaryNavigation />
      
      {/* Trust Strip */}
      <div className="pt-20">
        <TrustStrip />
      </div>
      
      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shop</span>
        </Link>
      </div>
      
      {/* Product Hero Section */}
      <section className="py-8 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-2xl bg-secondary/20">
                <img 
                  src={images[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-light text-foreground mb-2">
                  {product.name}
                </h1>
                {product.descriptor_line && (
                  <p className="text-lg text-muted-foreground">
                    {product.descriptor_line}
                  </p>
                )}
              </div>
              
              <div className="text-3xl font-semibold text-foreground">
                €{priceDisplay}
                {product.size && (
                  <span className="text-base font-normal text-muted-foreground ml-2">
                    / {product.size}
                  </span>
                )}
              </div>
              
              {product.short_description && (
                <p className="text-foreground/80 leading-relaxed">
                  {product.short_description}
                </p>
              )}
              
              {product.scent && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Droplets className="w-4 h-4" />
                  <span>Scent: {product.scent}</span>
                </div>
              )}
              
              {/* Quantity & Add to Cart */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  variant="steward" 
                  size="lg" 
                  className="w-full py-6 text-lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart — €{(product.price_cents * quantity / 100).toFixed(2)}
                </Button>
              </div>
              
              {/* Impact + Guarantee Block */}
              <ImpactGuaranteeBlock variant="compact" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Benefits */}
      {product.key_benefits && product.key_benefits.length > 0 && (
        <section className="py-12 px-6 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-light text-foreground">Key Benefits</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.key_benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* How To Use */}
      {product.how_to_use && product.how_to_use.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-light text-foreground">How To Use</h2>
            </div>
            <div className="space-y-3">
              {product.how_to_use.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-foreground/80 pt-1">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Why It's Different */}
      {product.why_its_different && product.why_its_different.length > 0 && (
        <section className="py-12 px-6 bg-gradient-to-b from-secondary/20 to-background">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Leaf className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-light text-foreground">Why It's Different</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {product.why_its_different.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-background rounded-lg border border-border">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  <span className="text-foreground/80">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Ingredient Philosophy */}
      {product.ingredient_philosophy && product.ingredient_philosophy.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Droplets className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-light text-foreground">Ingredient Philosophy</h2>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
              <ul className="space-y-4">
                {product.ingredient_philosophy.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
      
      {/* FAQ */}
      {product.faq && product.faq.length > 0 && (
        <section className="py-12 px-6 bg-card/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-light text-foreground mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {product.faq.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`} className="bg-background rounded-lg border border-border px-4">
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}
      
      {/* Brand Seal Block */}
      <section className="py-16 px-6">
        <div className="max-w-md mx-auto">
          <BrandSealBlock />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-steward text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg opacity-90 mb-4">
            Made for us. Made for them.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <Link to="/shop" className="hover:opacity-100 transition-opacity">Shop</Link>
            <Link to="/made-here-for-you" className="hover:opacity-100 transition-opacity">Our Story</Link>
            <Link to="/#rescue" className="hover:opacity-100 transition-opacity">Impact</Link>
            <a href="mailto:hello@solareinas.com" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;
