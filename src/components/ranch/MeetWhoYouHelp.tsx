import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
      .limit(3)
      .then(({ data }) => {
        if (data) setAnimals(data as Animal[]);
      });
  }, []);

  const featured = animals[0];

  return (
    <section id="meet-the-animals" className="py-20 md:py-28 bg-background">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="kicker mb-4">— The thank-you</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
            Meet Who Your Support <span className="font-serif-italic text-sanctuary-clay">Helps</span>
          </h2>
          <div className="editorial-rule w-24 mx-auto mt-6" />
        </div>

        {featured ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-stretch">
            <div className="rounded-md overflow-hidden bg-secondary/30 min-h-[360px] md:min-h-[480px]">
              {featured.photo_url ? (
                <img src={featured.photo_url} alt={featured.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">🐴</div>
              )}
            </div>

            <div className="editorial-card rounded-md p-8 md:p-12 flex flex-col justify-center">
              <p className="kicker mb-4">Meet who your support helps</p>
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-5">
                Thank you from{" "}
                <span className="font-serif-italic text-sanctuary-clay">{featured.name}</span> ♡
              </h3>
              <p className="font-body text-foreground/75 text-base md:text-lg leading-relaxed mb-8">
                {featured.story ||
                  `Your support helps provide feed, supplements, hoof care, and daily care for ${featured.name} and the other animals at Solareinas Farm.`}
              </p>
              <Button asChild className="self-start rounded-none uppercase text-[0.72rem] tracking-[0.22em]">
                <Link to={`/sponsor/${featured.id}`}>Meet {featured.name}</Link>
              </Button>
            </div>

            {animals.slice(1).map((a) => (
              <div key={a.id} className="md:col-span-1 editorial-card rounded-md overflow-hidden grid grid-cols-2">
                <div className="bg-secondary/30">
                  {a.photo_url ? (
                    <img src={a.photo_url} alt={a.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">🐴</div>
                  )}
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <p className="kicker mb-2">Thank you from</p>
                  <h4 className="font-display text-2xl text-foreground mb-2">{a.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {a.story || `Your gift cares for ${a.name}.`}
                  </p>
                  <Link to={`/sponsor/${a.id}`} className="text-xs uppercase tracking-[0.22em] text-sanctuary-clay hover:underline">
                    Meet {a.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <Link to="/sponsor-animal" className="underline text-sanctuary-clay">Meet the herd →</Link>
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild variant="ghost" className="font-display italic text-base text-foreground hover:text-sanctuary-clay">
            <Link to="/sponsor-animal">Meet the whole herd →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MeetWhoYouHelp;
