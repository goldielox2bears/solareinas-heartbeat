import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, TreePine, Users, Sparkles, Wine, Gift, BookOpen, Truck, Plus, Minus, ShoppingBag, Sun, Droplets, Hand, Flower2, Shirt } from "lucide-react";
import { toast } from "sonner";
import oliveOilLabel from "@/assets/olive-oil-label.png";
import oneOfOneBadge from "@/assets/one-of-one-tag.png";

const products = [
  {
    id: "single-bottle",
    name: "Single Bottle",
    subtitle: "750ml Recycled Wine Bottle",
    price: 25,
    description: "One elegant 750ml bottle of Estate Grown Extra Virgin Olive Oil, complete with pouring spout. Includes a pamphlet sharing the story of the Rescue and Regenerative Agriculture.",
    icon: Wine,
    highlight: false,
    category: "olive-oil",
  },
  {
    id: "case-of-six",
    name: "Case of Six",
    subtitle: "The Perfect Gift",
    price: 135,
    originalPrice: 150,
    description: "Six 750ml bottles — perfect for sharing with friends and family. Each bottle includes a pouring spout and story pamphlet. A thoughtful gift that gives back.",
    icon: Gift,
    highlight: true,
    savings: "SAVE 10%",
    category: "olive-oil",
  },
  {
    id: "soap-single",
    name: "Olive Oil Soap",
    subtitle: "Single Bar",
    price: 9,
    description: "Hand-crafted estate soap made with our own hand-picked olives. No palm oil, 100% sustainable, made on our solar-powered ranch.",
    icon: Droplets,
    highlight: false,
    category: "soap",
  },
  {
    id: "soap-three",
    name: "Olive Oil Soap Trio",
    subtitle: "Set of Three Bars",
    price: 25,
    description: "Three bars of authentic hand-crafted olive oil soap. A beautiful gift set, sustainably made with estate olives and 100% solar energy.",
    icon: Sun,
    highlight: true,
    savings: "SAVE €2",
    category: "soap",
  },
  {
    id: "balm-single",
    name: "Hand Balm",
    subtitle: "60ml Tin",
    price: 12,
    description: "100% ranch-made with olive oil and shea butter. Keeps your skin beautifully nourished with purest, sustainably sourced ingredients. Lightly scented with ranch-grown lavender.",
    icon: Hand,
    highlight: false,
    category: "balm",
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
    category: "balm",
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

const taglines = [
  "A harvest of hope, pressed for you.",
  "Every drop saves land and lives.",
  "Hand-picked with care, shared with gratitude.",
  "Taste regeneration. Share culture.",
  "Not just oil. A gift of Solareinas.",
];

const MarketPage = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

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
      const product = products.find(p => p.id === productId);
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
    // For now, show a toast - payment integration can be added later
    toast.success("Thank you for your interest! We'll be in touch about your order.", {
      description: "Shipping details will be confirmed via email.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SanctuaryNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative">
              <img 
                src={oliveOilLabel} 
                alt="Solareinas Ranch Retreat Estate Grown Extra Virgin Olive Oil" 
                className="w-full max-w-lg mx-auto rounded-2xl shadow-warm"
              />
            </div>
            
            {/* Hero Text */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-foreground/80 mb-8">
                <Leaf className="w-4 h-4" />
                <span className="text-sm font-medium">Estate Grown · First Cold Pressed</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
                More Than Olive Oil.<br />
                <span className="text-primary">A Bottle of Regeneration.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground font-light max-w-xl">
                Hand-picked. First cold pressed. Grown in living soil. 100% of profits support the animals and land. Thank you for sharing our love!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products for Purchase Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <ShoppingBag className="w-4 h-4" />
              <span className="text-sm font-medium">Shop the Harvest</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Bring Regeneration to Your Table
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Purchase our Estate Grown Extra Virgin Olive Oil directly. Bottled in recycled wine bottles 
              with an elegant pouring spout — perfect for your kitchen or as a meaningful gift.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {products.map((product) => (
              <Card 
                key={product.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-warm border-2 ${
                  product.highlight 
                    ? 'border-primary bg-gradient-to-br from-primary/5 to-sanctuary-amber/10' 
                    : 'border-border'
                }`}
              >
                {product.highlight && product.savings && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {product.savings}
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
            ))}
          </div>

          {/* Cart Summary */}
          {getCartItemCount() > 0 && (
            <div className="mt-10 max-w-md mx-auto">
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
          )}

          {/* Pamphlet Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-secondary/30 border border-border">
              <BookOpen className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                Every purchase includes a pamphlet sharing the story of how your support helps 
                the Rescue and Regenerative Agriculture.
              </p>
            </div>
          </div>
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
                Second Chances,<br />
                <span className="text-copper-aged">Worn Beautifully</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                One-of-one quality garments transformed by hand to fund rescue and regeneration.
              </p>
              
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-6 border border-border">
                <p className="text-muted-foreground leading-relaxed italic">
                  "Solareinas / One of One creates singular garments from existing pieces—transformed 
                  by hand and never replicated. Each item directly funds animal rescue and regenerative 
                  care at Solareinas Ranch in Spain. This is impact expressed through fashion."
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-gradient-patina text-white text-sm">
                  Hand-Transformed
                </span>
                <span className="px-4 py-2 rounded-full bg-gradient-copper text-white text-sm">
                  Never Replicated
                </span>
                <span className="px-4 py-2 rounded-full bg-secondary/50 text-foreground text-sm">
                  100% Impact
                </span>
              </div>
              
              <Button 
                variant="steward" 
                size="lg"
                className="mt-4"
                onClick={() => toast.info("One Of One collection coming soon!", { description: "Sign up for updates to be the first to know." })}
              >
                <Shirt className="w-5 h-5 mr-2" />
                Explore the Collection
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-light text-foreground">
                At Solareinas, every drop of olive oil tells a story.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This is not mass-produced. It is the highest-quality, Extra Virgin, First Cold Pressed oil, 
                  harvested by hand on our private estate in southern Spain.
                </p>
                <p>
                  The groves are tended with care, the olives picked at dawn when they are richest in flavor, 
                  and pressed within hours to capture their true vitality.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/30 to-sanctuary-earth/30 rounded-2xl p-8 space-y-6">
              <h3 className="text-xl font-medium text-foreground">Each bottle is:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">A symbol of authentic effort</span>
                    <p className="text-sm text-muted-foreground">Every olive touched by human hands.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">A gift of culture</span>
                    <p className="text-sm text-muted-foreground">Honoring centuries-old Andalusian tradition.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TreePine className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">A promise of regeneration</span>
                    <p className="text-sm text-muted-foreground">Funding animal care and healing the land where the trees grow.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Tiers Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Give & Receive Your Bottle of Regeneration
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              When you support Solareinas with your gift, this olive oil is our thank-you. 
              It's more than flavor for your table — it's a reminder that you are part of something 
              living, lasting, and rooted in purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {giftTiers.map((tier) => (
              <Card 
                key={tier.amount}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-warm border-2 ${
                  tier.highlight 
                    ? 'border-primary bg-gradient-to-br from-primary/5 to-sanctuary-amber/10' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleGiftSelect(tier.amount)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      tier.highlight ? 'bg-primary text-primary-foreground' : 'bg-secondary/50'
                    }`}>
                      <tier.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-foreground">{tier.title}</h3>
                        <span className={`text-xl font-semibold ${tier.highlight ? 'text-primary' : 'text-foreground'}`}>
                          €{tier.amount}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {tier.description}
                      </p>
                      {tier.highlight && (
                        <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                          <Sparkles className="w-3 h-3" />
                          Most Popular
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-warm"
              onClick={() => navigate('/gift?source=olive-oil')}
            >
              <Leaf className="w-5 h-5 mr-2" />
              Give & Receive Your Bottle of Regeneration
            </Button>
          </div>
        </div>
      </section>

      {/* Harvest Story Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-card/30 to-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sanctuary-amber/20 text-foreground/80 mb-6">
            <span className="text-sm font-medium">Limited Edition · This Year's Harvest</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-8">
            This Year's Harvest
          </h2>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              In the winter sun, our team of caretakers and volunteers walk the groves, 
              hand-picking olives at the perfect ripeness. They are pressed within hours — 
              never stored, never delayed — to preserve the vibrant green-gold taste of Andalusia.
            </p>
            <p>
              This year's harvest is limited. Every bottle is a testament to authentic effort, 
              community, and the regenerative cycle you've made possible.
            </p>
          </div>

          {/* Taglines */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {taglines.slice(0, 3).map((tagline, index) => (
              <span 
                key={index}
                className="px-4 py-2 rounded-full bg-secondary/30 text-foreground/70 text-sm italic"
              >
                "{tagline}"
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Elegant Details Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-border bg-card/50">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-light text-foreground">
                  Bottled in Recycled Wine Bottles
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Complete with a pouring spout, each bottle is an elegant addition to your kitchen or dining table. 
                  A beautiful reminder of the land and lives your generosity supports.
                </p>
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => navigate('/gift?source=olive-oil')}
                  >
                    Support Our Mission
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Tagline */}
      <section className="py-12 px-6 text-center">
        <p className="text-lg text-muted-foreground italic">
          "Not just oil. A gift of Solareinas."
        </p>
      </section>
    </div>
  );
};

export default MarketPage;
