import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import horseImage from "@/assets/library/horseback-riding-dog.jpeg";
import landImage from "@/assets/library/white-horse-grazing.jpeg";

const HeroRanchMade = () => {
  return (
    <section className="bg-background pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* Top editorial bento */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 mb-6">
          {/* Brand card */}
          <div className="md:col-span-4 editorial-card rounded-md p-8 md:p-10 flex flex-col justify-between min-h-[260px] md:min-h-[420px]">
            <div>
              <h2 className="font-display italic text-4xl md:text-5xl text-foreground leading-none">
                Solareinas
              </h2>
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground mt-1">
                Life
              </p>
              <div className="editorial-rule my-6 w-12" />
              <p className="text-xs uppercase tracking-[0.22em] text-foreground/80 leading-relaxed">
                Ranch-Made.<br />
                Small Batch.<br />
                Every Profit Feeds the Farm.
              </p>
            </div>
            <p className="font-hand text-2xl text-sanctuary-clay mt-8">
              made with love &amp; soil
            </p>
          </div>

          {/* Horse + woman photo */}
          <div className="md:col-span-4 rounded-md overflow-hidden min-h-[260px] md:min-h-[420px] relative">
            <img
              src={horseImage}
              alt="Ranch life at Solareinas"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-foreground/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-background">
              <p className="font-display italic text-2xl md:text-3xl leading-tight">
                Ranch-made goods<br />with a living purpose.
              </p>
              <p className="text-xs uppercase tracking-[0.22em] mt-4 opacity-85">
                Care for yourself · the animals · the land
              </p>
            </div>
          </div>

          {/* Headline card */}
          <div className="md:col-span-4 editorial-card rounded-md p-8 md:p-10 min-h-[260px] md:min-h-[420px] flex flex-col justify-center">
            <h1 className="font-display text-foreground leading-[1.05] mb-2">
              <span className="block text-3xl md:text-4xl">Ranch-Made.</span>
              <span className="block text-3xl md:text-4xl">Small Batch.</span>
              <span className="block font-serif-italic text-3xl md:text-4xl text-sanctuary-clay mt-1">
                Every Profit Feeds the Farm.
              </span>
            </h1>

            <p className="font-body text-foreground/75 text-base md:text-lg leading-relaxed mt-5 max-w-md">
              Skincare, equine care, home rituals, and meaningful gifts —
              made with purpose, supporting the animals, land, and daily care
              of Solareinas Farm.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <Button asChild size="lg" className="rounded-none uppercase text-[0.72rem] tracking-[0.22em] font-medium">
                <Link to="/shop">Shop Ranch-Made Goods</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none uppercase text-[0.72rem] tracking-[0.22em] font-medium border-foreground/30">
                <a
                  href="#meet-the-animals"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("meet-the-animals")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Meet Who You Help
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Lower editorial band — palette + landscape */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          <div className="md:col-span-3 editorial-card rounded-md p-6 flex flex-col justify-between">
            <div>
              <p className="kicker mb-4">The Feel</p>
              <ul className="space-y-1.5 font-display text-lg text-foreground">
                <li>Warm</li>
                <li>Earthy</li>
                <li>Authentic</li>
                <li>Natural</li>
                <li>Thoughtful</li>
                <li className="font-serif-italic text-sanctuary-clay">Rooted</li>
              </ul>
            </div>
            <div className="flex gap-1.5 mt-6">
              {[
                "hsl(82 14% 32%)",
                "hsl(78 14% 48%)",
                "hsl(36 22% 80%)",
                "hsl(32 28% 68%)",
                "hsl(22 38% 46%)",
                "hsl(24 22% 22%)",
              ].map((c, i) => (
                <span key={i} className="block w-7 h-7 rounded-full border border-border/60" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          <div className="md:col-span-9 rounded-md overflow-hidden min-h-[200px] md:min-h-[260px] relative">
            <img src={landImage} alt="Sierra Nevada ranch land" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/10 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-12">
              <div className="max-w-md">
                <p className="kicker mb-3">Estate · Sierra Nevada</p>
                <p className="font-display italic text-2xl md:text-3xl text-foreground leading-snug">
                  A small ranch, twelve acres,<br />
                  every profit poured back<br />
                  into the animals and the land.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRanchMade;
