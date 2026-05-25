import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import SanctuaryTestimonials from "@/components/SanctuaryTestimonials";
import SustainabilitySection from "@/components/SustainabilitySection";
import FreeHerdCircle from "@/components/FreeHerdCircle";
import FoundersRidingRetreat from "@/components/FoundersRidingRetreat";
import Marquee from "@/components/wildheart/Marquee";
import SEO from "@/components/SEO";

import HeroRanchMade from "@/components/ranch/HeroRanchMade";
import ChooseYourRitual from "@/components/ranch/ChooseYourRitual";
import EveryProductHasPurpose from "@/components/ranch/EveryProductHasPurpose";
import MeetWhoYouHelp from "@/components/ranch/MeetWhoYouHelp";
import RetreatSecondary from "@/components/ranch/RetreatSecondary";

const Index = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-peaceful flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading the ranch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title="Solareinas — Ranch-Made. Small Batch. Every Profit Feeds the Farm."
        description="Small-batch skincare, equine care, home rituals & meaningful gifts from a Sierra Nevada ranch. Every profit feeds the animals and the land."
        path="/"
      />
      <SanctuaryNavigation />

      <main>
        <HeroRanchMade />

        <Marquee
          items={[
            "RANCH-MADE",
            "SMALL BATCH",
            "EVERY PROFIT FEEDS THE FARM",
            "47 ANIMALS RESCUED",
            "ROOTED IN SIERRA NEVADA",
          ]}
        />

        <ChooseYourRitual />

        <EveryProductHasPurpose />

        <MeetWhoYouHelp />

        <section id="sustainability">
          <SustainabilitySection />
        </section>

        <section id="volunteers">
          <FreeHerdCircle />
        </section>

        <RetreatSecondary />

        <section id="giving">
          <FoundersRidingRetreat />
        </section>

        <SanctuaryTestimonials />

        <footer className="py-16 px-6 bg-gradient-steward text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-light mb-4">
              Every Product Has a Living Purpose
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Choose a ritual, support a resident, or join the FREE HERD.
              However you arrive, your care helps keep this ranch alive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                <Link to="/shop">Shop Ranch-Made Goods</Link>
              </Button>
              <Button asChild variant="outline" className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                <Link to="/sponsor-animal">Meet the Animals</Link>
              </Button>
              {user ? (
                <Button onClick={signOut} className="bg-white text-primary hover:bg-white/90">
                  Sign Out
                </Button>
              ) : (
                <Button asChild className="bg-white text-primary hover:bg-white/90">
                  <Link to="/volunteer-signup">Join the FREE HERD</Link>
                </Button>
              )}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
