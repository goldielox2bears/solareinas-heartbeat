import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase, type Animal } from "@/lib/supabase";

const RescueLedger = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const { data, error } = await supabase
          .from('animals')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setAnimals(data || []);
      } catch (error) {
        console.error('Error fetching animals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6 bg-gradient-peaceful">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">Loading our rescue family...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-peaceful">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-foreground mb-4">
            Rescue Ledger
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the souls you've helped save. Each animal carries a story of transformation, 
            made possible by the generosity of our Stewards.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animals.map((animal) => (
            <Card key={animal.id} className="shadow-gentle hover:shadow-sanctuary transition-gentle">
              <CardHeader className="text-center">
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                  {animal.photo_url ? (
                    <img 
                      src={animal.photo_url} 
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-4xl">
                      {animal.species === 'Horse' ? '🐴' : 
                       animal.species === 'Goat' ? '🐐' : 
                       animal.species === 'Sheep' ? '🐑' : 
                       animal.species === 'Dog' ? '🐕' :
                       animal.species === 'Cat' ? '🐱' : '🐾'}
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl font-medium text-foreground">
                  {animal.name}
                </CardTitle>
                <p className="text-muted-foreground">{animal.species}</p>
                {animal.age && (
                  <p className="text-sm text-muted-foreground">Age: {animal.age}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {animal.story && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {animal.story}
                  </p>
                )}
                
                {animal.sponsor_status === 'sponsored' && animal.sponsor_name ? (
                  <div className="p-3 bg-sanctuary-sage/20 rounded-lg">
                    <p className="text-xs text-foreground font-medium">
                      Sponsored by {animal.sponsor_name}
                    </p>
                  </div>
                ) : animal.sponsor_status === 'pending' ? (
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <p className="text-xs text-foreground font-medium">
                      Sponsorship Pending
                    </p>
                  </div>
                ) : (
                  <Button variant="steward" size="sm" className="w-full">
                    Become {animal.name}'s Steward
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {animals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No animals in our sanctuary yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RescueLedger;