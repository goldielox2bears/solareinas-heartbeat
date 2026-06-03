import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import SanctuaryTestimonials from "@/components/SanctuaryTestimonials";
import SustainabilitySection from "@/components/SustainabilitySection";
import FreeHerdCircle from "@/components/FreeHerdCircle";
import Marquee from "@/components/wildheart/Marquee";
import SEO from "@/components/SEO";

import HeroProductFirst from "@/components/ranch/HeroProductFirst";
import ChooseYourRitual from "@/components/ranch/ChooseYourRitual";
import WhatYourPurchaseSupports from "@/components/ranch/WhatYourPurchaseSupports";
import NotTestedOnAnimals from "@/components/ranch/NotTestedOnAnimals";
import MeetWhoYouHelp from "@/components/ranch/MeetWhoYouHelp";
import RetreatsMovedTeaser from "@/components/ranch/RetreatsMovedTeaser";
import JoinTheRanchList from "@/components/ranch/JoinTheRanchList";

const Index = () => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-prairie-body">Loading the ranch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title="Solareinas — Ranch-Made. Small Batch. Every Profit Feeds the Farm."
        description="Small-batch skincare, body care & ranch goods from a Sierra Nevada ranch. Care for yourself while helping feed the animals and restore the land."
        path="/"
      />
      <SanctuaryNavigation />

      <main>
        <HeroProductFirst />

        <Marquee
          items={[
            "RANCH-MADE",
            "SMALL BATCH",
            "EVERY PROFIT FEEDS THE FARM",
            "NOT TESTED ON ANIMALS",
            "ROOTED IN SIERRA NEVADA",
          ]}
        />

        <ChooseYourRitual />

        <section id="impact">
          <WhatYourPurchaseSupports />
        </section>

        <NotTestedOnAnimals />

        <section id="meet-the-animals">
          <MeetWhoYouHelp />
        </section>

        <section id="farm-behind-goods">
          <div className="bg-background py-12 md:py-16">
            <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
              <p className="font-label uppercase tracking-[0.3em] text-[0.7rem] text-accent mb-4">— The proof</p>
              <h2 className="font-prairie-display text-4xl md:text-5xl text-foreground leading-tight">
                The Farm Your Purchase Feeds
              </h2>
              <div className="h-px w-20 bg-foreground/25 mx-auto mt-6" />
            </div>
          </div>
          <section id="our-story">
            <SustainabilitySection />
          </section>
        </section>

        <section id="volunteers">
          <FreeHerdCircle />
        </section>

        <RetreatsMovedTeaser />

        <JoinTheRanchList />

        <SanctuaryTestimonials />

        <footer className="py-16 px-6 bg-primary text-primary-foreground">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="font-prairie-display text-3xl md:text-4xl mb-3">
                Every Product Has a Living Purpose
              </h3>
              <p className="font-prairie-body text-primary-foreground/85 max-w-2xl mx-auto">
                Choose a ritual, support the ranch, or join the Free Herd.
              </p>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 font-label uppercase text-[0.72rem] tracking-[0.22em] text-primary-foreground/85">
              <Link to="/shop" className="hover:text-background">Shop</Link>
              <a href="#impact" className="hover:text-background">Impact</a>
              <Link to="/sponsor-animal" className="hover:text-background">Animals</Link>
              <a href="#volunteers" className="hover:text-background">Free Herd</a>
              <a href="https://www.explorelife.live" target="_blank" rel="noopener noreferrer" className="hover:text-background">ExploreLife.Live</a>
              <a href="#our-story" className="hover:text-background">Our Story</a>
              <a href="mailto:hello@solareinas.life" className="hover:text-background">Contact</a>
              <Link to="/privacy" className="hover:text-background">Privacy</Link>
              <Link to="/terms" className="hover:text-background">Terms</Link>
            </nav>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="rounded-none font-label uppercase text-[0.74rem] tracking-[0.22em] bg-background text-foreground hover:bg-background/90">
                <Link to="/shop">Shop Ranch-Made Goods</Link>
              </Button>
              {user ? (
                <Button onClick={signOut} variant="outline" className="rounded-none font-label uppercase text-[0.74rem] tracking-[0.22em] border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                  Sign Out
                </Button>
              ) : (
                <Button asChild variant="outline" className="rounded-none font-label uppercase text-[0.74rem] tracking-[0.22em] border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/volunteer-signup">Apply to the Free Herd</Link>
                </Button>
              )}
            </div>

            <p className="text-center font-prairie-body text-xs text-primary-foreground/60 mt-10">
              © {new Date().getFullYear()} Solareinas Ranch · Sierra Nevada
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
