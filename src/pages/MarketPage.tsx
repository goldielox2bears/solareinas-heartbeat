import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import TrustStrip from "@/components/shop/TrustStrip";
import ImpactGuaranteeBlock from "@/components/shop/ImpactGuaranteeBlock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Heart, TreePine, Users, Sparkles, Wine, Gift, BookOpen, Truck, Plus, Minus, ShoppingBag, Sun, Droplets, Hand, Flower2, Shirt, Star, Waves, Moon, LucideIcon } from "lucide-react";
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
  heroIngredients?: string[];
  keyBenefits?: string[];
  texture?: string;
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
    heroIngredients: ["Estate-grown extra virgin olive oil", "Cold-pressed", "Recycled wine bottle"],
    keyBenefits: ["First cold pressed for peak flavor", "Grown in living, regenerative soil", "100% solar-pressed"],
    texture: "Fresh, peppery, golden-green",
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
    heroIngredients: ["Estate-grown extra virgin olive oil", "Cold-pressed", "Recycled wine bottles"],
    keyBenefits: ["Six bottles for sharing or stocking the kitchen", "10% savings vs single bottles", "Includes story pamphlet"],
    texture: "Fresh, peppery, golden-green",
  },
];

// Category: Ranch Apothecary
const skincareProducts: Product[] = [
  {
    id: "workday-hand-balm",
    name: "Ranch Hands Balm",
    subtitle: "Olive + beeswax balm • For hardworking hands • 60ml tin",
    price: 12,
    description: "A small-batch olive and beeswax balm for hardworking hands. Made with olive oil from our groves, shea butter, and ranch-grown lavender. Absorbs quickly without leaving residue.",
    icon: Hand,
    highlight: false,
    heroIngredients: ["Olive oil from our groves", "Beeswax", "Shea butter", "Ranch-grown lavender"],
    keyBenefits: ["Deep nourishment for working hands", "Quick absorption — no greasy residue", "Protective barrier against the elements", "Subtle lavender from our garden"],
    texture: "Rich, balm-soft, fast-absorbing",
  },
  {
    id: "balm-gift",
    name: "Ranch Hands Balm Gift Pack",
    subtitle: "Set of Three Tins",
    price: 30,
    description: "Three 60ml tins of Ranch Hands Balm — the perfect gift for anyone who works with their hands. Olive oil, shea butter, and ranch-grown lavender.",
    icon: Flower2,
    highlight: true,
    savings: "SAVE €6",
    heroIngredients: ["Olive oil from our groves", "Beeswax", "Shea butter", "Ranch-grown lavender"],
    keyBenefits: ["Three full-size tins", "Gift-ready set", "Save €6 vs single tins"],
    texture: "Rich, balm-soft, fast-absorbing",
  },
  {
    id: "ranch-glow-serum",
    name: "The Daily Dew",
    subtitle: "Hydrating serum • Hyaluronic acid + inulin + niacinamide • 30ml",
    price: 34,
    description: "A daily hydrating serum that pulls moisture from the air into the skin. Hyaluronic acid, inulin, and niacinamide plump, hydrate, and brighten — light, dewy, fast-absorbing. Mid-morning. Window light. Skin softening into the day.",
    icon: Droplets,
    highlight: false,
    heroIngredients: ["Hyaluronic acid", "Inulin", "Niacinamide", "Supporting humectants"],
    keyBenefits: ["Pulls moisture from the air into your skin", "Plumps, hydrates, and brightens", "Light, dewy, fast-absorbing finish", "The daily hydration anchor of the ritual"],
    texture: "Light, dewy water-gel",
  },
  {
    id: "soft-earth-polish",
    name: "Soft Earth Powder Polish",
    subtitle: "Polish + rinse • Glow • 100g jar",
    price: 18,
    description: "A gentle exfoliating powder that activates with water. Made with finely ground olive pits and white clay to polish away dullness and reveal fresh, glowing skin.",
    icon: Sparkles,
    highlight: false,
    heroIngredients: ["Olive pit powder from our pressing", "French white kaolin clay", "Oat flour"],
    keyBenefits: ["Gentle physical exfoliation", "Removes dead skin and dullness", "Doubles as a treatment mask", "Zero microplastics"],
    texture: "Powder that activates with water — fine, soft, earthy",
  },
  {
    id: "afterglow-body-butter",
    name: "Afterglow Body Butter",
    subtitle: "Lavender + Sage • Whipped • 200ml",
    price: 28,
    description: "A luxuriously whipped body butter that melts into skin, leaving it impossibly soft. Scented with ranch-grown lavender and wild sage.",
    icon: Flower2,
    highlight: true,
    heroIngredients: ["Shea butter", "Olive oil from our groves", "Coconut oil", "Ranch-grown lavender + wild sage"],
    keyBenefits: ["Intensely moisturizing without heaviness", "Whipped texture melts into skin", "Calming lavender + sage scent", "After-shower luxury"],
    texture: "Whipped, cloud-soft, slow-melting",
  },
  {
    id: "the-beauty-balm",
    name: "The Solareinas Balm",
    subtitle: "Overnight hero balm • Restore + golden • 30ml",
    price: 28,
    description: "The overnight beauty balm — to freshen, restore, and golden the skin while you sleep. A luxury botanical balm, slow-melting, deeply nourishing. End of day. Lamplight. The bottle on the bedside table.",
    icon: Moon,
    highlight: true,
    isHero: true,
    heroIngredients: ["Luxury botanical balm formulation", "Final ingredient list to be confirmed"],
    keyBenefits: ["Overnight skin freshening and restoration", "Multi-use luxury finish", "The hero of the ritual line", "End-of-day ritual"],
    texture: "Rich, golden, slow-melting",
  },
  {
    id: "sea-silk-body-scrub",
    name: "Andaluz Polish",
    subtitle: "Foaming body polish • Sugar + Mediterranean sea salt + ranch olive oil • 200g",
    price: 24,
    description: "Where the grove meets the sea. A small-batch foaming body polish made with Mediterranean sea salt, sugar, and Solareinas ranch olive oil — scent inspired by sea air and mountain herbs. Sugar smooths and polishes; sea salt awakens and exfoliates; ranch olive oil softens the rinse-off finish. Use 1–2 times weekly.",
    icon: Waves,
    highlight: false,
    heroIngredients: ["Mediterranean sea salt", "Sugar", "Ranch olive oil", "Sea air + mountain herb scent"],
    keyBenefits: ["Sugar smooths and polishes", "Sea salt awakens and exfoliates", "Olive oil softens the rinse-off finish", "Foaming, dual-grain texture"],
    texture: "Foaming, dual-grain — sugar + salt",
  },
];

// Category: The Tack Room
const animalCareProducts: Product[] = [
  {
    id: "the-grove-bar",
    name: "THE GROVE BAR",
    subtitle: "Olive oil soap • Slow-cured • Ranch bar",
    price: 9,
    description: "Our signature olive oil soap is hand-crafted using estate-grown olives, pressed on solar power, and cured slowly for 6 months. No palm oil. No shortcuts.",
    icon: Droplets,
    highlight: true,
    isHero: true,
    heroIngredients: ["100% extra virgin olive oil", "No palm oil — ever", "Naturally retained glycerin"],
    keyBenefits: ["Slow-cured for 6 months minimum", "Gentle on humans, horses, and dogs", "Long-lasting bar that gets better with age", "Solar-powered, zero-waste production"],
    texture: "Hard-milled castile bar, creamy lather",
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
    heroIngredients: ["100% extra virgin olive oil", "No palm oil", "Hand-cut bars"],
    keyBenefits: ["Three full bars in a gift-ready set", "Save €2 vs single bars", "Sustainably crafted from estate olives"],
    texture: "Hard-milled castile bar, creamy lather",
  },
  {
    id: "tack-soap",
    name: "Tack Soap",
    subtitle: "Ranch-made • Deep clean • Leather care",
    price: 12,
    description: "Our ranch-made formula cleans the grit and grime, crafted specifically for saddles, bridles, cowboy boots, leather work boots, and western tack. Gentle on leather, tough on dirt.",
    icon: Droplets,
    highlight: false,
    heroIngredients: ["Ranch olive oil base", "Traditional saddle-soap formula", "No palm oil"],
    keyBenefits: ["Cleans grit and grime from leather", "Saddles, bridles, boots, western tack", "Gentle on leather, tough on dirt", "Made on the same ranch the leather works"],
    texture: "Dense bar, deep lather",
  },
  {
    id: "tack-balm",
    name: "Tack Balm",
    subtitle: "Ranch-made • Conditioner • Leather protect",
    price: 14,
    description: "Protect your saddles, bridles, cowboy boots, leather work boots, and western tack with our ranch-made tack conditioner. Keeps leather supple, nourished, and ready for the next ride.",
    icon: Shirt,
    highlight: false,
    heroIngredients: ["Ranch olive oil", "Beeswax", "Conditioning oils"],
    keyBenefits: ["Conditions and protects leather", "Keeps tack supple and weather-ready", "Saddles, bridles, boots, western tack", "Companion to Tack Soap"],
    texture: "Soft balm, melts on contact",
  },
  {
    id: "its-all-about-the-mane",
    name: "It's All About the Mane",
    subtitle: "Soothe + soften • Ranch-made • 100ml",
    price: 16,
    description: "A nourishing hair oil inspired by the care we give our horses' manes. Light yet deeply conditioning, it tames frizz and adds shine without weighing hair down.",
    icon: Leaf,
    highlight: false,
    heroIngredients: ["Cold-pressed olive oil", "Argan oil", "Rosemary extract", "Natural vitamin E"],
    keyBenefits: ["Tames frizz and flyaways", "Adds healthy shine", "Nourishes without weighing hair down", "Safe for all hair types"],
    texture: "Light hair oil — never greasy",
  },
  {
    id: "bruised-ego",
    name: "Bruised Ego",
    subtitle: "Arnica lotion • Calming • Ranch life • 30ml",
    price: 14,
    description: "Ranch life can be rough. Our arnica-based bruise calming lotion soothes bumps and knocks with gentle, natural care. A ranch bag essential.",
    icon: Heart,
    highlight: false,
    heroIngredients: ["Arnica", "Olive oil base", "Calming botanicals"],
    keyBenefits: ["Soothes everyday bumps and knocks", "Gentle, natural, all-skin-types", "Born from a real volunteer story", "A ranch-bag essential"],
    texture: "Light lotion, fast-absorbing",
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

  const renderProductCard = (product: Product) => {
    const hasHoverInfo = !!(product.heroIngredients?.length || product.keyBenefits?.length || product.texture);

    const cardEl = (
      <Card
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

    if (!hasHoverInfo) {
      return <div key={product.id}>{cardEl}</div>;
    }

    return (
      <HoverCard key={product.id} openDelay={150} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div>{cardEl}</div>
        </HoverCardTrigger>
        <HoverCardContent
          side="top"
          align="center"
          className="w-72 md:w-80 border-2 border-primary/20 bg-gradient-to-br from-background to-sanctuary-amber/5 shadow-warm rounded-xl p-5 space-y-4"
        >
          {product.heroIngredients && product.heroIngredients.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1.5">
                Hero Ingredients
              </p>
              <ul className="space-y-0.5">
                {product.heroIngredients.map((ing, i) => (
                  <li key={i} className="text-sm text-foreground/90 leading-snug">
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.keyBenefits && product.keyBenefits.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1.5">
                Why You'll Love It
              </p>
              <ul className="space-y-0.5">
                {product.keyBenefits.map((benefit, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-snug">
                    — {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.texture && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1.5">
                Texture
              </p>
              <p className="text-sm text-foreground/90 italic leading-snug">
                {product.texture}
              </p>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    );
  };

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

      {/* The Olive Grove Category */}
      <section className="py-16 px-6 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Wine className="w-4 h-4" />
              <span className="text-sm font-medium">Estate Grown · First Cold Pressed</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              The Olive Grove
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hand-picked from our trees. First cold pressed. Grown in living soil. Bottled in
              recycled wine bottles with an elegant pouring spout — for the table, the kitchen, and
              the gift you're proud to give.
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

      {/* Ranch Apothecary Category */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-copper text-white mb-6">
              <Droplets className="w-4 h-4" />
              <span className="text-sm font-medium">Ranch Apothecary</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Ranch Apothecary
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The botica of the ranch. Daily skincare and body care, made by hand from what grows
              here — olive oil from our groves, lavender from our garden, herbs from the hills. For
              the small rituals that hold a day together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skincareProducts.map(renderProductCard)}
          </div>
        </div>
      </section>

      {/* The Tack Room Category */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-patina text-white mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">The Tack Room</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              The Tack Room
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The shelf of multi-purpose ranch staples — the soaps and balms made for hands,
              leather, horses, dogs, and the long days that need all of them. Olive-oil castile.
              Traditional methods passed through generations. Honest tools.
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
