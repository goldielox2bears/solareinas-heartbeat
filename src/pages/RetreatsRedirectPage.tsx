import SanctuaryNavigation from '@/components/SanctuaryNavigation';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';

export default function RetreatsRedirectPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Retreats are moving to ExploreLife.Live | Solareinas"
        description="To keep Solareinas clear and product-focused, our retreat and travel experiences now live at ExploreLife.Live."
        path="/retreats"
      />
      <SanctuaryNavigation />

      <main className="pt-40 pb-32 px-5 sm:px-8 max-w-[760px] mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground mb-6">
          Retreats are moving to ExploreLife.Live.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          To keep Solareinas clear and product-focused, our retreat and travel experiences
          now live at ExploreLife.Live.
        </p>
        <Button asChild size="lg">
          <a href="https://www.explorelife.live" target="_blank" rel="noopener noreferrer">
            Visit ExploreLife.Live
          </a>
        </Button>
        <p className="mt-12 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Existing retreat pages remain accessible for archival reference.
        </p>
      </main>
    </div>
  );
}
