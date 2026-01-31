import { Link } from "react-router-dom";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import TrustStrip from "@/components/shop/TrustStrip";
import BrandSealBlock from "@/components/shop/BrandSealBlock";
import ImpactGuaranteeBlock from "@/components/shop/ImpactGuaranteeBlock";
import { Button } from "@/components/ui/button";
import { Heart, Leaf, ShoppingBag, Sparkles, TreePine, Users } from "lucide-react";
import srrLogo from "@/assets/srr-logo-transparent.png";
import whiteHorse from "@/assets/library/white-horse-grazing.jpeg";
import oliveHarvest from "@/assets/library/olive-harvest.jpeg";
import sanctuaryDog from "@/assets/library/sanctuary-dog.jpeg";

const MadeHereForUsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SanctuaryNavigation />
      
      {/* Trust Strip */}
      <div className="pt-20">
        <TrustStrip />
      </div>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src={srrLogo} 
            alt="Solareinas Ranch" 
            className="w-24 h-24 object-contain mx-auto mb-8"
          />
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
            Made Here, For Us —<br />
            <span className="text-primary">by Solareinas</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything we create is born on this land, made with our hands, and shared with purpose. 
            Not for profit. For the animals. For the earth. For you.
          </p>
        </div>
      </section>
      
      {/* Brand Story Section */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Our Story</span>
              </div>
              
              <h2 className="text-3xl font-light text-foreground">
                We didn't start a brand.<br />
                We started a rescue.
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Solareinas Ranch began as a sanctuary — a place where horses, dogs, cats, and 
                  the land itself could heal. The olive groves were wild. The animals were wounded. 
                  We were just getting started.
                </p>
                <p>
                  Then we realized: the land could give back. The olives we harvested could become oil. 
                  The oil could become soap. And every product we made could fund another rescue, 
                  another acre restored, another life saved.
                </p>
                <p className="font-medium text-foreground italic">
                  We did this. Together.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={oliveHarvest} 
                alt="Olive harvest at Solareinas" 
                className="rounded-2xl shadow-warm w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Three Trust Lines */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Not Mass-Made</h3>
              <p className="text-muted-foreground">
                Every product is crafted in small batches, by hand, on the ranch. 
                No factories. No outsourcing. Just us.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">100% Regenerative</h3>
              <p className="text-muted-foreground">
                Our ingredients come from the land we're healing. Solar-powered. 
                Sustainable. Growing stronger every season.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground">Every Euro Matters</h3>
              <p className="text-muted-foreground">
                100% of proceeds fund animal care and land regeneration. 
                Your purchase is a gift to the sanctuary.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 100% Proceeds Explanation */}
      <section className="py-16 px-6 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-foreground mb-4">
              Where Your Support Goes
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every purchase directly funds the work that matters most.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Animal Care</h4>
              <p className="text-sm text-muted-foreground">Veterinary care, feed, and daily needs for rescued animals</p>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Land Regeneration</h4>
              <p className="text-sm text-muted-foreground">Restoring olive groves and healing the ecosystem</p>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Rescue Operations</h4>
              <p className="text-sm text-muted-foreground">Transportation, intake, and rehabilitation of new rescues</p>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium text-foreground mb-2">Sustainable Growth</h4>
              <p className="text-sm text-muted-foreground">Solar power, water systems, and infrastructure</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Photo Grid */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img 
                src={whiteHorse} 
                alt="Horse at Solareinas Ranch" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img 
                src={sanctuaryDog} 
                alt="Sanctuary dog" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl">
              <img 
                src={oliveHarvest} 
                alt="Olive harvest" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact + Guarantee */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-2xl mx-auto">
          <ImpactGuaranteeBlock />
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-light text-foreground mb-4">
            Ready to make a difference?
          </h3>
          <p className="text-muted-foreground mb-8">
            Every product you choose directly supports the sanctuary.
          </p>
          <Button asChild variant="steward" size="lg">
            <Link to="/shop">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop the Collection
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Brand Seal */}
      <section className="py-8 px-6">
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
            <Link to="/made-here-for-us" className="hover:opacity-100 transition-opacity">Our Story</Link>
            <Link to="/#rescue" className="hover:opacity-100 transition-opacity">Impact</Link>
            <a href="mailto:hello@solareinas.com" className="hover:opacity-100 transition-opacity">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MadeHereForUsPage;
