import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import SanctuaryNavigation from '@/components/SanctuaryNavigation';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Animal {
  id: string;
  name: string;
  species: string;
  age?: number | null;
  story?: string | null;
  photo_url?: string | null;
  current_care_needs?: string | null;
  favorite_product_connection?: string | null;
  impact_story?: string | null;
  care_status?: string | null;
}

export default function AnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('animals')
      .select('id,name,species,age,story,photo_url,current_care_needs,favorite_product_connection,impact_story,care_status')
      .order('name')
      .then(({ data }) => {
        setAnimals((data as Animal[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Meet the Animals Your Purchases Help Support | Solareinas"
        description="Every animal at Solareinas Ranch has a story. Your purchases help provide their daily feed, medicine, hoof care, and shelter."
        path="/animals"
      />
      <SanctuaryNavigation />

      <header className="pt-32 pb-12 px-5 sm:px-8 max-w-[1200px] mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground mb-6">
          Meet the Animals Your Purchases Help Support
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Every animal here has a story. Your purchases help provide the daily feed,
          medicine, hoof care, and shelter that make their lives possible.
        </p>
      </header>

      <main className="max-w-[1200px] mx-auto px-5 sm:px-8 pb-24">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading animals…</p>
        ) : animals.length === 0 ? (
          <p className="text-center text-muted-foreground">No animals to show yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {animals.map((a) => (
              <Card key={a.id} className="overflow-hidden border-border/60 bg-card">
                {a.photo_url && (
                  <div className="h-64 bg-muted">
                    <img
                      src={a.photo_url}
                      alt={a.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                )}
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h2 className="font-display text-2xl text-foreground">{a.name}</h2>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">
                      {a.species}{a.age ? ` · ${a.age} yrs` : ''}
                    </p>
                  </div>
                  {a.story && (
                    <p className="text-sm text-foreground/80 leading-relaxed">{a.story}</p>
                  )}
                  {a.current_care_needs && (
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground mb-1">
                        Current Care Needs
                      </p>
                      <p className="text-sm text-foreground/80">{a.current_care_needs}</p>
                    </div>
                  )}
                  {a.favorite_product_connection && (
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground mb-1">
                        Products That Support {a.name}'s Care
                      </p>
                      <p className="text-sm text-foreground/80">{a.favorite_product_connection}</p>
                    </div>
                  )}
                  <div className="pt-2 space-y-2">
                    <Button asChild className="w-full">
                      <Link to="/shop">Shop Products That Support the Farm</Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground">
                      <Link to="/gift">Make a Direct Farm Gift</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
