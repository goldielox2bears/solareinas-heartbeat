import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Leaf, Flame, Gift, HeartHandshake } from "lucide-react";

const categories = [
  {
    title: "Skin + Body",
    icon: Sparkles,
    description:
      "Small-batch care for everyday rituals — balms, oils, soaps, and creams inspired by ranch life and natural ingredients.",
    href: "/shop?ritual=skin-body",
  },
  {
    title: "Equine + Ranch Care",
    icon: Leaf,
    description:
      "Useful care made for the animals we love, the hands that care for them, and the rhythms of daily farm life.",
    href: "/shop?ritual=equine-ranch",
  },
  {
    title: "Home + Calm",
    icon: Flame,
    description:
      "Candles, sprays, and simple rituals that bring the peace of the farm into your home.",
    href: "/shop?ritual=home-calm",
  },
  {
    title: "Gift Boxes",
    icon: Gift,
    description:
      "Thoughtful ranch-made gifts with purpose — ideal for animal lovers, nature lovers, and anyone who values meaningful care.",
    href: "/shop?ritual=gift-boxes",
  },
  {
    title: "Animal Support Collection",
    icon: HeartHandshake,
    description:
      "Products connected to specific animals and care needs — funding feed, supplements, shelter, farrier care, and wellbeing.",
    href: "/shop?ritual=animal-support",
  },
];

const ChooseYourRitual = () => {
  return (
    <section id="rituals" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="kicker mb-3">— THE COLLECTION</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Choose Your Ritual
          </h2>
          <p className="font-display text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Five ways to bring the farm into your day — and feed it back into the animals and land.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <Card
                key={c.title}
                className="group border-2 border-border hover:border-primary/40 hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-card"
              >
                <CardContent className="p-7 flex flex-col h-full">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-copper text-white mb-5 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-3">{c.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">{c.description}</p>
                  <Button asChild variant="outline" className="self-start">
                    <Link to={c.href}>Explore</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChooseYourRitual;
