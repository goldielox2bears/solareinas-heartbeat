import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import SanctuaryHero from "@/components/SanctuaryHero";
import RescueLedger from "@/components/RescueLedger";
import FreeHerdCircle from "@/components/FreeHerdCircle";
import GivingWall from "@/components/GivingWall";

const Index = () => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-peaceful flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading sanctuary...</p>
        </div>
      </div>
    );
  }

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
              Your generosity makes this possible. Your heart and hands are welcome here.
              This is where restoration begins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Button asChild variant="outline" className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                    <Link to="/volunteer-signup">Volunteer With Us</Link>
                  </Button>
                  <Button asChild variant="outline" className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                    <Link to="/sponsor-animal">Give Support</Link>
                  </Button>
                  <Button variant="outline" className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                    Welcome, {user.email}
                  </Button>
                  <Button 
                    onClick={handleSignOut}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                    <Link to="/volunteer-signup">Volunteer With Us</Link>
                  </Button>
                  <Button asChild variant="outline" className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                    <Link to="/sponsor-animal">Give Support</Link>
                  </Button>
                  <Button asChild className="bg-white text-primary hover:bg-white/90">
                    <Link to="/auth">Join the Free Herd</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
