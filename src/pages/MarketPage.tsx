import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, TreePine, Users, Sparkles } from "lucide-react";

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

  const handleGiftSelect = (amount: number) => {
    setSelectedTier(amount);
    // Navigate to gift page with pre-selected amount
    navigate(`/gift?amount=${amount}&source=olive-oil`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SanctuaryNavigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-foreground/80 mb-8">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-medium">Estate Grown · First Cold Pressed</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-light text-foreground mb-6 leading-tight">
            More Than Olive Oil.<br />
            <span className="text-primary">A Bottle of Regeneration.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
            Hand-picked. First cold pressed. Grown in living soil restored by your support.
          </p>
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
