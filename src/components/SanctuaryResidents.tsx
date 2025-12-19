import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Animal {
  id: string;
  name: string;
  species: string;
  photo_url: string | null;
  story: string | null;
  sponsor_status: string;
  age: number | null;
  monthly_sponsorship_cents: number | null;
  available_for_sponsorship: boolean | null;
}

const SanctuaryResidents = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      const { data, error } = await supabase
        .from("animals")
        .select("*")
        .eq("available_for_sponsorship", true)
        .limit(6);
      
      if (error) {
        console.error("Error fetching animals:", error);
      } else {
        setAnimals(data || []);
      }
      setLoading(false);
    };

    fetchAnimals();
  }, []);

  const formatCurrency = (cents: number | null) => {
    if (!cents) return "Contact us";
    return `€${(cents / 100).toFixed(0)}/month`;
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case "recovery": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "ready": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "training": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "permanent": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <section id="sanctuary-residents" className="py-24 px-6 bg-gradient-sanctuary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
            Meet Our Residents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every animal has a story of resilience. Get to know some of the incredible individuals in our care.
          </p>
        </div>

        {/* Residents Carousel */}
        <div className="relative">
          {loading ? (
            <div className="text-center text-muted-foreground">Loading residents...</div>
          ) : animals.length === 0 ? (
            <div className="text-center text-muted-foreground">No animals available at the moment.</div>
          ) : (
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent className="-ml-4">
                {animals.map((animal) => (
                  <CarouselItem key={animal.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full bg-background/80 backdrop-blur-sm shadow-gentle hover:shadow-warm transition-all duration-300">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <img
                            src={animal.photo_url || "/lovable-uploads/36fe2001-2cab-427a-9506-1dba65888ffc.png"}
                            alt={`${animal.name} the ${animal.species}`}
                            className="w-full h-48 object-cover rounded-t-xl"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className={getStatusColor(animal.sponsor_status)}>
                              {animal.sponsor_status === "available" ? "Needs Sponsor" : animal.sponsor_status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-6">
                        <CardTitle className="text-xl mb-2 text-foreground">
                          {animal.name}
                        </CardTitle>
                        <CardDescription className="text-primary font-medium mb-3">
                          {animal.species}
                        </CardDescription>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {animal.story || "A beautiful soul waiting for your support."}
                        </p>
                        
                        {animal.age && (
                          <div className="text-xs text-muted-foreground mb-4">
                            <span className="font-medium">Age:</span> {animal.age} years
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="p-6 pt-0 space-y-3">
                        <div className="w-full text-center">
                          <div className="text-lg font-semibold text-primary mb-1">
                            {formatCurrency(animal.monthly_sponsorship_cents)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Monthly sponsorship
                          </div>
                        </div>
                        
                        <div className="flex gap-2 w-full">
                          <Button 
                            variant="steward" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => navigate(`/sponsor/${animal.id}`)}
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            Sponsor {animal.name}
                          </Button>
                          <Button variant="outline" size="sm">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-gentle max-w-2xl mx-auto">
            <h3 className="text-2xl font-light mb-4 text-foreground">
              Every Sponsorship Makes a Difference
            </h3>
            <p className="text-muted-foreground mb-6">
              Your monthly support provides food, medical care, enrichment, and the specialized attention each animal needs to heal and thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="steward" size="lg" className="shadow-warm">
                🧡 View All Available Sponsorships
              </Button>
              <Button variant="outline" size="lg">
                📱 Download Sponsorship App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanctuaryResidents;