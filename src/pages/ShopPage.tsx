import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts, useHeroProduct } from "@/hooks/useProducts";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import TrustStrip from "@/components/shop/TrustStrip";
import HeroSpotlight from "@/components/shop/HeroSpotlight";
import ProductCard from "@/components/shop/ProductCard";
import ImpactGuaranteeBlock from "@/components/shop/ImpactGuaranteeBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const ShopPage = () => {
  const { data: products, isLoading } = useProducts();
  const { data: heroProduct } = useHeroProduct();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const nonHeroProducts = products?.filter(p => !p.hero) || [];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribing(true);
    // Simulate subscription - you can connect this to newsletter_subscribers table
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Welcome to the circle of care!", {
      description: "You'll be the first to know about new products.",
    });
    setEmail("");
    setSubscribing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <SanctuaryNavigation />
      
      {/* Trust Strip */}
      <div className="pt-20">
        <TrustStrip />
      </div>
      
      {/* Hero Spotlight */}
      {heroProduct && <HeroSpotlight product={heroProduct} />}
      
      {/* Product Grid Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm font-medium">Made Here, For You — by Solareinas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              The Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every product is crafted on the ranch with care. 100% of proceeds fund animal care and land regeneration.
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Products coming soon...</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Impact + Guarantee Block */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <ImpactGuaranteeBlock />
        </div>
      </section>
      
      {/* Email Capture */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-foreground/80 mb-6">
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">Stay Connected</span>
          </div>
          
          <h3 className="text-2xl font-light text-foreground mb-4">
            Join the circle of care
          </h3>
          <p className="text-muted-foreground mb-8">
            Be the first to know about new products, seasonal harvests, and ranch stories.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" variant="steward" disabled={subscribing}>
              {subscribing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-gradient-steward text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg opacity-90 mb-4">
            Made for you. Made for them.
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

export default ShopPage;
