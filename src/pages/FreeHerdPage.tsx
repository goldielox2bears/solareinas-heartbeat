import SanctuaryNavigation from '@/components/SanctuaryNavigation';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function FreeHerdPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Join the Free Herd | Solareinas Volunteer"
        description="Come with useful hands, an open heart, and realistic expectations. Volunteer at Solareinas Ranch."
        path="/free-herd"
      />
      <SanctuaryNavigation />

      <header className="pt-32 pb-12 px-5 sm:px-8 max-w-[900px] mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground mb-6">
          Join the Free Herd.
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Come with useful hands, an open heart, and realistic expectations. This is a working
          farm — beautiful, muddy, meaningful, and real.
        </p>
      </header>

      <main className="max-w-[800px] mx-auto px-5 sm:px-8 pb-24">
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {[
            { t: 'Useful Hands', b: 'Animal care, garden work, harvest, building, mending.' },
            { t: 'Open Heart', b: 'You will meet animals with stories and people with grit.' },
            { t: 'Realistic Days', b: 'Early mornings, dust, weather, and quiet evenings.' },
          ].map((x) => (
            <div key={x.t} className="p-6 rounded-lg bg-card border border-border/60">
              <h3 className="font-display text-xl text-foreground mb-2">{x.t}</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">{x.b}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/volunteer-signup">Apply to Volunteer</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
