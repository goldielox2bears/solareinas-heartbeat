const heroImage = "/lovable-uploads/36fe2001-2cab-427a-9506-1dba65888ffc.png";
import { Button } from "@/components/ui/button";

const SanctuaryHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-light mb-6 animate-gentle-fade">
          Solareinas Ranch
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
          A quiet invitation to step into the sanctuary you've helped create
        </p>
        
        {/* Identity-based CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="steward" size="lg" className="min-w-48">
            🧡 For Stewards
          </Button>
          <Button variant="sanctuary" size="lg" className="min-w-48">
            🌾 Join the Free Herd
          </Button>
        </div>
        
        <p className="text-sm opacity-80 mt-6">
          Your generosity makes this possible — Your hands are welcome here
        </p>
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