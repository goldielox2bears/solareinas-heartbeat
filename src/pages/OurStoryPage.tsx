import SanctuaryNavigation from '@/components/SanctuaryNavigation';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Story | Solareinas Ranch"
        description="Made with love, soil, and stubborn hope. Solareinas is a working ranch where products, animals, people, and land connect."
        path="/our-story"
      />
      <SanctuaryNavigation />

      <header className="pt-32 pb-12 px-5 sm:px-8 max-w-[900px] mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground mb-6">
          Made with love, soil, and stubborn hope.
        </h1>
      </header>

      <main className="max-w-[760px] mx-auto px-5 sm:px-8 pb-24 prose-quiet">
        <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
          <p>
            Solareinas is a working ranch in southern Spain. Not a retreat brand. Not a charity
            campaign. A real place — with mud, olive trees, rescued horses, and a small team
            who shows up every day.
          </p>
          <p>
            What started as one piece of land and a few animals became something bigger:
            a small-batch goods company built around the daily work of caring for animals and land.
            Soap from our olive oil. Salves from our herbs. Hand-poured candles, leather repair,
            and the slow craft of useful things.
          </p>
          <p>
            Every product you buy here funds the next bale of hay, the next farrier visit,
            the next round of immunizations, the next bit of fencing. We're not asking you to
            donate to a cause. We're asking you to buy beautiful, useful goods from a place
            where every euro has somewhere real to go.
          </p>
          <p>
            That's the deal. A product business with a purpose. Made by hand, made with care,
            made because the animals here are worth it.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/shop">Shop the Goods</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/animals">Meet the Animals</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
