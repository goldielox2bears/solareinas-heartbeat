import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  {
    title: "Skin + Body",
    description: "Nourish your body with nature — balms, oils, soaps, and creams inspired by ranch life.",
    href: "/shop?ritual=skin-body",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop",
  },
  {
    title: "Equine + Ranch Care",
    description: "Useful care for the animals we love, the hands that care for them, and daily farm life.",
    href: "/shop?ritual=equine-ranch",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&auto=format&fit=crop",
  },
  {
    title: "Home + Calm",
    description: "Bring the calm of the farm home — candles, sprays, and simple rituals.",
    href: "/shop?ritual=home-calm",
    image: "https://images.unsplash.com/photo-1602874801006-91d0b7e6e91d?w=800&auto=format&fit=crop",
  },
  {
    title: "Gift Boxes",
    description: "Thoughtful ranch-made gifts with purpose for the people you love.",
    href: "/shop?ritual=gift-boxes",
    image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&auto=format&fit=crop",
  },
  {
    title: "Animal Support",
    description: "Products tied to specific animals and care needs — feed, shelter, farrier, wellbeing.",
    href: "/shop?ritual=animal-support",
    image: "https://images.unsplash.com/photo-1553284965-e2815db2e5a3?w=800&auto=format&fit=crop",
  },
];

const ChooseYourRitual = () => {
  return (
    <section id="rituals" className="py-20 md:py-28 bg-background">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="kicker mb-4">— The Collection</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Choose Your <span className="font-serif-italic text-sanctuary-clay">Ritual</span>
          </h2>
          <div className="editorial-rule w-24 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
          {categories.map((c) => (
            <Link
              key={c.title}
              to={c.href}
              className="group editorial-card rounded-sm overflow-hidden flex flex-col hover:shadow-warm transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary/30">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 md:p-5 text-center flex flex-col flex-1">
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-foreground/80 mb-2">
                  {c.title}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1">
                  {c.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="ghost" className="font-display italic text-base text-foreground hover:text-sanctuary-clay">
            <Link to="/shop">Explore all products →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourRitual;
