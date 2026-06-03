import SanctuaryNavigation from '@/components/SanctuaryNavigation';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Stat {
  id: string;
  stat_label: string;
  stat_value: string;
  stat_context?: string | null;
}

const SECTIONS = [
  { title: 'Daily Animal Care', body: 'Feed, fresh water, clean shelter, and the quiet work of being seen every day.' },
  { title: 'Vet + Farrier Support', body: 'Routine checks, emergencies, hoof care, dental care — the unglamorous backbone of a healthy herd.' },
  { title: 'Rescue + Recovery', body: 'Animals arriving thin, scared, or injured — and the slow climb back to trust and health.' },
  { title: 'Land + Soil Regeneration', body: 'Olive groves, pasture, compost, water — caring for the land that cares for everyone here.' },
  { title: 'Volunteers + The Free Herd', body: 'Hands, hearts, and seasons of people who show up to do the real work alongside us.' },
  { title: "What We've Done Together", body: 'Every batch sold, every gift sent, every visitor who walked the land — it adds up.' },
];

export default function ImpactPage() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    supabase
      .from('impact_stats')
      .select('id,stat_label,stat_value,stat_context')
      .eq('is_active', true)
      .order('display_order')
      .then(({ data }) => setStats((data as Stat[]) || []));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="The Farm Your Purchase Feeds | Solareinas Impact"
        description="Every profit supports the animals, the land, and the daily care that keeps Solareinas alive."
        path="/impact"
      />
      <SanctuaryNavigation />

      <header className="pt-32 pb-12 px-5 sm:px-8 max-w-[1200px] mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground mb-6">
          The Farm Your Purchase Feeds.
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Every profit supports the animals, the land, and the daily care that keeps Solareinas alive.
        </p>
      </header>

      {stats.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-5 sm:px-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.id} className="text-center p-6 rounded-lg bg-card border border-border/60">
                <div className="font-display text-3xl sm:text-4xl text-primary">{s.stat_value}</div>
                <div className="mt-2 text-sm font-medium text-foreground">{s.stat_label}</div>
                {s.stat_context && (
                  <div className="mt-1 text-xs text-muted-foreground">{s.stat_context}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <main className="max-w-[1100px] mx-auto px-5 sm:px-8 pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {SECTIONS.map((s) => (
            <div key={s.title} className="p-7 rounded-lg bg-card border border-border/60">
              <h2 className="font-display text-2xl text-foreground mb-3">{s.title}</h2>
              <p className="text-foreground/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg">
            <Link to="/shop">Shop to Support the Farm</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
