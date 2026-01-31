import heroImage from "@/assets/library/horse-mural.jpeg";
import heroLogoSrc from "@/assets/srr-logo-source.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TransparentLogo from "@/components/TransparentLogo";

const SanctuaryHero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 pointer-events-none" />
      </div>
      
      {/* Logo - Top Right Corner */}
      <div className="absolute top-16 right-4 md:top-20 md:right-8 z-10">
        <TransparentLogo
          src={heroLogoSrc}
          alt="Solareinas Ranch - Sierra Nevada"
          className="h-36 md:h-60 w-auto"
          threshold={44}
          feather={26}
        />
      </div>
      
      {/* Hero Actions - Bottom Third */}
      <div className="relative z-10 flex-1 flex items-end justify-center pb-24 md:pb-32">
        <div className="text-center text-white px-6 max-w-4xl">
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-8">
            A quiet invitation to step into the sanctuary you've helped create
          </p>
          {/* Identity-based CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button asChild variant="steward" size="lg" className="min-w-48">
              <Link to="/sponsor-animal">🧡 For Stewards</Link>
            </Button>
            <Button asChild variant="sanctuary" size="lg" className="min-w-48">
              <Link to="/volunteer-signup">🌾 Join the Free Herd</Link>
            </Button>
          </div>
          
          <p className="text-sm opacity-80">
            Your generosity makes this possible — Your heart and hands are welcome here
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-sanctuary-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-gentle-fade" />
        </div>
      </div>
    </section>
  );
};

export default SanctuaryHero;