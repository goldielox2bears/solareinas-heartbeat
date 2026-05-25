import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Animal {
  id: string;
  name: string;
  species: string;
  story: string | null;
  photo_url: string | null;
}

const MeetWhoYouHelp = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    supabase
      .from("animals")
      .select("id, name, species, story, photo_url")
      .eq("available_for_sponsorship", true)
      .limit(4)
      .then(({ data }) => {
        if (data) setAnimals(data as Animal[]);
      });
  }, []);

  return (
    <section id="meet-the-animals" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="kicker mb-3">— THE THANK-YOU</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-5">
            Meet Who Your Support Helps
          </h2>
          <p className="font-display text-lg md:text-xl text-muted-foreground">
            Each animal here has a story, a care need, and a reason to say thank you.
            When you choose a Solareinas product, you become part of theirs.
          </p>
        </div>

        {animals.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Meet the herd —{" "}
            <Link to="/sponsor-animal" className="underline text-primary">
              see all residents
            </Link>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {animals.map((a) => (
              <Card
                key={a.id}
                className="overflow-hidden border-2 border-border hover:border-primary/40 hover:shadow-warm transition-all"
              >
                <div className="h-56 bg-secondary/40 flex items-center justify-center overflow-hidden">
                  {a.photo_url ? (
                    <img
                      src={a.photo_url}
                      alt={a.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-6xl">🐴</div>
                  )}
                </div>
                <CardContent className="p-5">
                  <p className="kicker mb-1">THANK YOU FROM</p>
                  <h3 className="font-display text-2xl text-foreground mb-2">{a.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {a.story ||
                      `Your support helps with daily feed, supplements, hoof care and safe shelter for ${a.name}.`}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={`/sponsor/${a.id}`}>Meet {a.name}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild variant="bold" size="lg">
            <Link to="/sponsor-animal">Meet the Whole Herd</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MeetWhoYouHelp;
