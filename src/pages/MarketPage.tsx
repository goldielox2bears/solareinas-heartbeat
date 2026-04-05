import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import TrustStrip from "@/components/shop/TrustStrip";
import ImpactGuaranteeBlock from "@/components/shop/ImpactGuaranteeBlock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Heart, TreePine, Users, Sparkles, Wine, Gift, BookOpen, Truck, Plus, Minus, ShoppingBag, Sun, Droplets, Hand, Flower2, Shirt, Star, Waves, LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import oliveOilLabel from "@/assets/olive-oil-label.png";
import oneOfOneBadge from "@/assets/one-of-one-tag.png";
import madeHereLogo from "@/assets/made-here-logo.png";

interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  description: string;
  icon: LucideIcon;
  highlight: boolean;
  originalPrice?: number;
  savings?: string;
  isHero?: boolean;
}

// Category: Olive Oil
const oliveOilProducts: Product[] = [
  {
    id: "single-bottle",
    name: "Single Bottle",
    subtitle: "750ml Recycled Wine Bottle",
    price: 25,
    description: "One elegant 750ml bottle of Estate Grown Extra Virgin Olive Oil, complete with pouring spout. Includes a pamphlet sharing the story of the Rescue and Regenerative Agriculture.",
    icon: Wine,
    highlight: false,
  },
  {
    id: "case-of-six",
    name: "Olive Oil — Case of Six",
    subtitle: "The Perfect Gift",
    price: 135,
    originalPrice: 150,
    description: "Six 750ml bottles — perfect for sharing with friends and family. Each bottle includes a pouring spout and story pamphlet. A thoughtful gift that gives back.",
    icon: Gift,
    highlight: true,
    savings: "SAVE 10%",
  },
];

// Category: Ranch Bar & Skincare
const skincareProducts: Product[] = [
  {
    id: "the-grove-bar",
    name: "THE GROVE BAR",
    subtitle: "Olive oil soap • Slow-cured • Ranch bar",
    price: 9,
    description: "Our signature olive oil soap is hand-crafted using estate-grown olives, pressed on solar power, and cured slowly for 6 months. No palm oil. No shortcuts.",
    icon: Droplets,
    highlight: true,
    isHero: true,
  },
  {
    id: "soap-three",
    name: "Olive Oil Soap Trio",
    subtitle: "Set of Three Bars",
    price: 25,
    description: "Three bars of authentic hand-crafted olive oil soap. A beautiful gift set, sustainably made with estate olives and 100% solar energy.",
    icon: Sun,
    highlight: false,
    savings: "SAVE €2",
  },
  {
    id: "workday-hand-balm",
    name: "workday hand balm",
    subtitle: "Nourish balm • Ranch-tested • 60ml tin",
    price: 12,
    description: "A rich, protective balm created for hands that work hard. Made with olive oil, shea butter, and ranch-grown lavender. Absorbs quickly without leaving residue.",
    icon: Hand,
    highlight: false,
  },
  {
    id: "balm-gift",
    name: "Hand Balm Gift Pack",
    subtitle: "Set of Three Tins",
    price: 30,
    description: "Three 60ml tins of our nourishing hand balm — the perfect gift for anyone who works with their hands. Olive oil, shea butter, and ranch-grown lavender.",
    icon: Flower2,
    highlight: true,
    savings: "SAVE €6",
  },
  {
    id: "ranch-glow-serum",
    name: "ranch glow serum",
    subtitle: "Fresh-air glow • Daily hydration • 30ml",
    price: 24,
    description: "A lightweight daily serum that delivers deep hydration without heaviness. Pure olive oil base enriched with rosehip and vitamin E for that healthy, outdoor glow.",
    icon: Sparkles,
    highlight: false,
  },
  {
    id: "soft-earth-polish",
    name: "soft earth powder polish",
    subtitle: "Polish + rinse • Glow • 100g jar",
    price: 18,
    description: "A gentle exfoliating powder that activates with water. Made with finely ground olive pits and white clay to polish away dullness and reveal fresh, glowing skin.",
    icon: Star,
    highlight: false,
  },
  {
    id: "afterglow-body-butter",
    name: "afterglow body butter",
    subtitle: "Lavender + Sage • Whipped • 200ml",
    price: 22,
    description: "A luxuriously whipped body butter that melts into skin, leaving it impossibly soft. Scented with ranch-grown lavender and wild sage.",
    icon: Waves,
    highlight: true,
  },
  {
    id: "its-all-about-the-mane",
    name: "it's all about the mane",
    subtitle: "Soothe + soften • Ranch-made • 100ml",
    price: 16,
    description: "A nourishing hair oil inspired by the care we give our horses' manes. Light yet deeply conditioning, it tames frizz and adds shine without weighing hair down.",
    icon: Heart,
    highlight: false,
  },
  {
    id: "bruised-ego",
    name: "Bruised Ego",
    subtitle: "Arnica lotion • Calming • Ranch life",
    price: 14,
    description: "Ranch life can be rough. Our arnica-based bruise calming lotion soothes bumps and knocks with gentle, natural care. A ranch bag essential.",
    icon: Heart,
    highlight: false,
  },
  {
    id: "the-beauty-balm",
    name: "THE Beauty Balm",
    subtitle: "Skin protector • Nourishing • 150ml",
    price: 28,
    description: "Your harsh weather saver or simply your nighttime best friend ritual. Infused with skin protecting and nourishing ingredients in a handy take-anywhere tin.",
    icon: Sparkles,
    highlight: true,
  },
  {
    id: "sea-silk-body-scrub",
    name: "Sea Silk Foaming Polish",
    subtitle: "Salt + sugar scrub • Reusable tin • 200g",
    price: 24,
    description: "A ranch-made body polish inspired by salt air, sun-warmed skin, and the wild cleansing energy of the sea. This rich foaming blend of salt and sugar smooths away roughness, softly cleanses, and leaves skin fresh, polished, and awakened with a clean coastal tingle. Shower-safe reusable tin.",
    icon: Waves,
    highlight: false,
  },
];

// Category: Mane & Animal Care
const animalCareProducts: Product[] = [
  {
    id: "the-grove-bar-tack",
    name: "THE GROVE BAR",
    subtitle: "Olive oil soap • Slow-cured • Ranch bar",
    price: 9,
    description: "Our signature olive oil soap is hand-crafted using estate-grown olives, pressed on solar power, and cured slowly for 6 months. No palm oil. No shortcuts.",
    icon: Droplets,
    highlight: true,
    isHero: true,
  },
  {
    id: "tack-soap",
    name: "Tack Soap",
    subtitle: "Ranch-made • Deep clean • Leather care",
    price: 12,
    description: "Our ranch-made formula cleans the grit and grime, crafted specifically for saddles, bridles, and western tack. Gentle on leather, tough on dirt.",
    icon: Droplets,
    highlight: false,
  },
  {
    id: "tack-balm",
    name: "Tack Balm",
    subtitle: "Ranch-made • Conditioner • Leather protect",
    price: 14,
    description: "Protect your saddles, bridles, and western tack with our ranch-made tack conditioner. Keeps leather supple, nourished, and ready for the next ride.",
    icon: Star,
    highlight: false,
  },
];

const giftTiers = [
  {
    amount: 50,
    title: "One Litre of Regeneration",
    description: "Receive one litre bottle of Solareinas Estate Olive Oil — hand-picked, first cold pressed, grown in living soil.",
    icon: Leaf,
    highlight: false,
  },
  {
    amount: 100,
    title: "Share the Harvest",
    description: "Two bottles, plus a note from the harvest team. One for you and a gift for your best friend.",
    icon: Heart,
    highlight: false,
  },
  {
    amount: 250,
    title: "Sponsor an Olive Tree",
    description: "Sponsor an olive tree for a year — receive 5 litres from that tree and a photo of your tree's growth.",
    icon: TreePine,
    highlight: true,
  },
  {
    amount: 500,
    title: "Adopt a Grove",
    description: "Your support restores part of the estate. Receive 5 litres of oil, updates, and an invitation to join the next harvest in person.",
    icon: Users,
    highlight: false,
  },
];

const allProducts = [...oliveOilProducts, ...skincareProducts, ...animalCareProducts];

const MarketPage = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutNotes, setCheckoutNotes] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleGiftSelect = (amount: number) => {
    setSelectedTier(amount);
    navigate(`/gift?amount=${amount}&source=olive-oil`);
  };

  const updateCart = (productId: string, delta: number) => {
    setCart(prev => {
      const newQty = Math.max(0, (prev[productId] || 0) + delta);
      if (newQty === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, qty]) => {
      const product = allProducts.find(p => p.id === productId);
      return total + (product?.price || 0) * qty;
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const handleCheckout = () => {
    if (getCartItemCount() === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setCheckoutOpen(true);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName.trim() || !checkoutEmail.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }

    const items = Object.entries(cart).map(([productId, qty]) => {
      const product = allProducts.find(p => p.id === productId)!;
      return { name: product.name, qty, price: product.price };
    });

    setCheckoutLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-market-order", {
        body: {
          name: checkoutName,
          email: checkoutEmail,
          phone: checkoutPhone || null,
          notes: checkoutNotes || null,
          items,
          total_eur: getCartTotal().toFixed(2),
        },
      });

      if (error) throw error;

      toast.success("Order received! Check your email for confirmation.", {
        description: "We'll be in touch shortly to arrange payment and shipping.",
      });
      setCheckoutOpen(false);
      setCart({});
      setCheckoutName("");
      setCheckoutEmail("");
      setCheckoutPhone("");
      setCheckoutNotes("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or contact us directly.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const renderProductCard = (product: Product) => (
    <Card
      key={product.id}
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-warm border-2 ${
        product.highlight
          ? 'border-primary bg-gradient-to-br from-primary/5 to-sanctuary-amber/10'
          : 'border-border'
      }`}
    >
      {product.highlight && 'savings' in product && product.savings && (
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            {product.savings}
          </span>
        </div>
      )}
      {'isHero' in product && product.isHero && (
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-gradient-copper text-white text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" /> Hero
          </span>
        </div>
      )}
      <CardContent className="p-8">
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${
            product.highlight ? 'bg-primary text-primary-foreground' : 'bg-secondary/50'
          }`}>
            <product.icon className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-medium text-foreground">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.subtitle}</p>
          </div>

          <div className="text-3xl font-semibold text-foreground">
            {'originalPrice' in product && product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through mr-2">€{product.originalPrice}</span>
            )}
            €{product.price}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => updateCart(product.id, -1)}
              disabled={(cart[product.id] || 0) === 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-xl font-medium w-8 text-center">
              {cart[product.id] || 0}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => updateCart(product.id, 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <SanctuaryNavigation />

      {/* Trust Strip */}
      <div className="pt-20">
        <TrustStrip />
      </div>

      {/* Hero Section - Made Here Brand */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Made Here Logo */}
            <div className="relative flex justify-center">
              <img
                src={madeHereLogo}
                alt="Made Here, For You — by Solareinas"
                className="w-48 md:w-64 h-auto mix-blend-multiply dark:mix-blend-screen"
              />
            </div>

            {/* Hero Text */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-foreground/80 mb-8">
                <Leaf className="w-4 h-4" />
                <span className="text-sm font-medium">Made Here, For You — by Solareinas</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
                The Market<br />
                <span className="text-primary">Ranch-Made. With Purpose.</span>
              </h1>

              <p className="text-xl text-muted-foreground font-light max-w-xl">
                Everything we create is born on this land, made with our hands, and shared with purpose.
                100% of profits support the animals and land.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Olive Oil Category */}
      <section className="py-16 px-6 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Wine className="w-4 h-4" />
              <span className="text-sm font-medium">Estate Grown · First Cold Pressed</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Olive Oil
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hand-picked. First cold pressed. Grown in living soil. Bottled in recycled wine bottles
              with an elegant pouring spout.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <img
              src={oliveOilLabel}
              alt="Solareinas Ranch Retreat Estate Grown Extra Virgin Olive Oil"
              className="w-full max-w-md rounded-2xl shadow-warm"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {oliveOilProducts.map(renderProductCard)}
          </div>
        </div>
      </section>

      {/* Ranch Bar & Skincare Category */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-copper text-white mb-6">
              <Droplets className="w-4 h-4" />
              <span className="text-sm font-medium">Ranch Bar & Skincare</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Ranch Bar & Skincare
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hand-crafted with estate olives, solar power, and love. Slow-cured. Never rushed.
              Made for skin that works hard and deserves to glow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skincareProducts.map(renderProductCard)}
          </div>
        </div>
      </section>

      {/* Mane & Animal Care Category */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-patina text-white mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Mane & Animal Care</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Mane & Animal Care
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Inspired by the care we give our horses. Made for you (and them).
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {animalCareProducts.map(renderProductCard)}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {getCartItemCount() > 0 && (
        <section className="py-8 px-6">
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-primary/30 bg-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-lg font-medium">€{getCartTotal()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    <span>Plus shipping (calculated at checkout)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>Includes story pamphlet with each order</span>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6"
                    onClick={handleCheckout}
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Impact + Guarantee Block */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <ImpactGuaranteeBlock />
        </div>
      </section>

      {/* One Of One Clothing Line Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background via-card/20 to-background">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* One Of One Badge/Logo */}
            <div className="relative flex justify-center">
              <img
                src={oneOfOneBadge}
                alt="One Of One - Singular Garments"
                className="w-64 md:w-80 h-auto drop-shadow-lg rotate-90"
              />
            </div>

            {/* One Of One Story */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-copper text-white">
                <Shirt className="w-4 h-4" />
                <span className="text-sm font-medium">One Of One Clothing</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-light text-foreground leading-tight">
                Singular Garments.<br />
                <span className="text-primary">Never Repeated.</span>
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                One Of One is our clothing line — each piece is truly singular. Made from upcycled and 
                natural materials, hand-finished on the ranch. When it's gone, it's gone.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Every garment tells a story of the land, the animals, and the hands that shaped it.
                100% of proceeds support the sanctuary.
              </p>

              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5"
                onClick={() => toast.info("One Of One drops coming soon. Join the list to be first.", { duration: 4000 })}
              >
                <Shirt className="w-4 h-4 mr-2" />
                Notify Me of the Next Drop
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Tiers Section */}
      <section className="py-16 px-6 bg-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-foreground/80 mb-6">
              <Gift className="w-4 h-4" />
              <span className="text-sm font-medium">Gift Tiers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Give the Gift of the Grove
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose a gift tier that supports the sanctuary and receive something beautiful in return.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftTiers.map((tier) => (
              <Card
                key={tier.amount}
                className={`cursor-pointer transition-all duration-300 hover:shadow-warm border-2 ${
                  selectedTier === tier.amount
                    ? 'border-primary bg-primary/5'
                    : tier.highlight
                    ? 'border-primary/40 bg-gradient-to-br from-primary/5 to-sanctuary-amber/10'
                    : 'border-border hover:border-primary/30'
                }`}
                onClick={() => handleGiftSelect(tier.amount)}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                    <tier.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-semibold text-foreground">€{tier.amount}</div>
                  <h3 className="font-medium text-foreground text-sm">{tier.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tier.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-light text-foreground">
            Every Purchase is an Act of Care
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            When you buy from Solareinas, you're not just buying a product. You're choosing regenerative 
            land practices, rescue animal care, and a return to making things with integrity.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            100% of profits flow directly to the sanctuary — the animals, the land, and the people 
            who tend both with love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild variant="outline">
              <Link to="/sponsor-animal">Meet the Animals</Link>
            </Button>
            <Button asChild>
              <Link to="/gift">Make a Gift</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-muted-foreground/70">
          <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
          <Link to="/sponsor-animal" className="hover:opacity-100 transition-opacity">Sponsor an Animal</Link>
          <Link to="/gift" className="hover:opacity-100 transition-opacity">Gift the Sanctuary</Link>
          <Link to="/market" className="hover:opacity-100 transition-opacity">The Market</Link>
          <a href="mailto:hello@solareinas.com" className="hover:opacity-100 transition-opacity">Contact</a>
        </div>
      </footer>

      {/* Checkout Modal */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-light text-foreground">Complete Your Order</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              We'll confirm your order and arrange payment & shipping by email.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitOrder} className="space-y-4 mt-2">
            {/* Order summary */}
            <div className="bg-secondary/30 rounded-lg p-4 space-y-2 text-sm">
              {Object.entries(cart).map(([productId, qty]) => {
                const product = allProducts.find(p => p.id === productId);
                if (!product) return null;
                return (
                  <div key={productId} className="flex justify-between">
                    <span>{product.name} ×{qty}</span>
                    <span className="font-medium">€{product.price * qty}</span>
                  </div>
                );
              })}
              <div className="flex justify-between font-semibold border-t border-border pt-2 mt-2">
                <span>Total (excl. shipping)</span>
                <span>€{getCartTotal()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-name">Full Name *</Label>
              <Input
                id="checkout-name"
                value={checkoutName}
                onChange={e => setCheckoutName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-email">Email Address *</Label>
              <Input
                id="checkout-email"
                type="email"
                value={checkoutEmail}
                onChange={e => setCheckoutEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-phone">Phone Number (optional)</Label>
              <Input
                id="checkout-phone"
                type="tel"
                value={checkoutPhone}
                onChange={e => setCheckoutPhone(e.target.value)}
                placeholder="+353 ..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkout-notes">Notes / Shipping Address (optional)</Label>
              <Textarea
                id="checkout-notes"
                value={checkoutNotes}
                onChange={e => setCheckoutNotes(e.target.value)}
                placeholder="Shipping address, gift note, special requests..."
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={checkoutLoading}
            >
              {checkoutLoading ? "Sending..." : "Submit Order"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarketPage;
