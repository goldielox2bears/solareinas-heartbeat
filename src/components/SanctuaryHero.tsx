import heroImage from "@/assets/library/horse-mural.jpeg";
import heroLogoSrc from "@/assets/srr-logo-white.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TransparentLogo from "@/components/TransparentLogo";
import Stamp from "@/components/wildheart/Stamp";

const SanctuaryHero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-ink">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/80 pointer-events-none" />
      </div>

      {/* Logo - Top Right Corner */}
      <div className="absolute top-16 right-0 md:top-20 md:right-0 z-10">
        <TransparentLogo
          src={heroLogoSrc}
          alt="Solareinas Ranch - Sierra Nevada"
          className="h-36 md:h-60 w-auto"
          threshold={44}
          feather={26}
        />
      </div>

      {/* Editorial headline + actions, bottom-left aligned */}
      <div className="relative z-10 flex-1 flex items-end pb-20 md:pb-28">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="kicker mb-4 !text-marigold">
              <span className="text-bone/70 mr-2">EST. SIERRA NEVADA</span>
              <span className="text-marigold">— A LIVING SANCTUARY</span>
            </div>

            <h1 className="font-display font-black text-bone text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6">
              A sanctuary you helped{" "}
              <span className="font-hand text-marigold scribble-under font-bold italic">
                build
              </span>
              .
            </h1>

            <p className="font-display text-bone/85 text-xl md:text-2xl max-w-xl mb-10">
              A quiet invitation to step into the place your generosity made real.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button asChild variant="bold" size="lg" className="min-w-48 text-base">
                <Link to="/sponsor-animal">For Stewards</Link>
              </Button>
              <Button asChild variant="marigold" size="lg" className="min-w-48 text-base">
                <Link to="/volunteer-signup">Join the Free Herd</Link>
              </Button>
              <Button asChild variant="boldOutline" size="lg" className="min-w-48 text-base">
                <a
                  href="/#giving"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("giving")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Retreat
                </a>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Stamp rotation={-6}>steward approved</Stamp>
              <p className="font-hand text-bone text-xl">
                your heart &amp; hands are welcome here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — rotated stamp */}
      <div className="absolute bottom-6 right-8 z-10 hidden md:block">
        <Stamp rotation={6} className="text-sm">scroll ↓</Stamp>
      </div>
    </section>
  );
};

export default SanctuaryHero;
