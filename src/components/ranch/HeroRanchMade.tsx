import heroImage from "@/assets/library/olive-harvest.jpeg";
import logoSrc from "@/assets/srr-logo-white.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TransparentLogo from "@/components/TransparentLogo";
import Stamp from "@/components/wildheart/Stamp";

const HeroRanchMade = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden bg-ink">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/35 to-ink/85 pointer-events-none" />
      </div>

      <div className="absolute top-16 right-0 md:top-20 md:right-0 z-10">
        <TransparentLogo
          src={logoSrc}
          alt="Solareinas Ranch"
          className="h-32 md:h-52 w-auto"
          threshold={44}
          feather={26}
        />
      </div>

      <div className="relative z-10 flex-1 flex items-end pb-20 md:pb-28">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="kicker mb-4 !text-marigold">
              <span className="text-bone/70 mr-2">SIERRA NEVADA</span>
              <span className="text-marigold">— SMALL BATCH, RANCH MADE</span>
            </div>

            <h1 className="font-display font-black text-bone text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-6">
              Ranch-Made.{" "}
              <span className="font-hand text-marigold scribble-under font-bold italic">
                Small Batch.
              </span>{" "}
              Every Profit Feeds the Farm.
            </h1>

            <p className="font-display text-bone/85 text-xl md:text-2xl max-w-2xl mb-10">
              Skincare, equine care, home rituals, and meaningful gifts —
              made with purpose, supporting the animals, land, and daily care
              of Solareinas Farm.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild variant="bold" size="lg" className="min-w-56 text-base">
                <Link to="/shop">Shop Ranch-Made Goods</Link>
              </Button>
              <Button asChild variant="marigold" size="lg" className="min-w-48 text-base">
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

            <div className="mt-8 flex items-center gap-4">
              <Stamp rotation={-6}>profit feeds the farm</Stamp>
              <p className="font-hand text-bone text-xl">
                made by hand, with the animals in mind
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRanchMade;
