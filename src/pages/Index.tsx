import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import SanctuaryHero from "@/components/SanctuaryHero";
import RescueLedger from "@/components/RescueLedger";
import FreeHerdCircle from "@/components/FreeHerdCircle";
import GivingWall from "@/components/GivingWall";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SanctuaryNavigation />
      
      <main>
        <SanctuaryHero />
        
        <section id="rescue">
          <RescueLedger />
        </section>
        
        <section id="volunteers">
          <FreeHerdCircle />
        </section>
        
        <section id="giving">
          <GivingWall />
        </section>
        
        {/* Call to Action Footer */}
        <footer className="py-16 px-6 bg-gradient-steward text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-4">
              Step Into the Sanctuary
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Whether your heart calls you to give or to serve with your hands, 
              you belong here. This is where transformation begins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/20 text-primary-foreground border border-white/30 hover:bg-white/30 transition-gentle px-8 py-3 rounded-xl">
                Become a Steward
              </button>
              <button className="bg-white text-primary hover:bg-white/90 transition-gentle px-8 py-3 rounded-xl font-medium">
                Join the Free Herd
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
