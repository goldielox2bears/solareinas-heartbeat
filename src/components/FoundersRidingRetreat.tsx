import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Tent, UtensilsCrossed, Users, Star, MapPin, Calendar, Compass, Sunrise, Footprints } from "lucide-react";
import RetreatSignupForm from "@/components/RetreatSignupForm";

import tentInterior from "@/assets/summer-ride/tent-interior.jpeg";
import paintedTent from "@/assets/summer-ride/painted-tent-exterior.jpeg";
import horsesGrazing from "@/assets/summer-ride/horses-grazing-pines.jpeg";
import founderWithDog from "@/assets/summer-ride/founder-with-dog.jpeg";
import peacefulGrazing from "@/assets/summer-ride/peaceful-grazing.jpeg";
import packMules from "@/assets/summer-ride/pack-mules-trail.jpeg";
import riderVista from "@/assets/summer-ride/rider-mountain-vista.jpeg";
import muleSummit from "@/assets/summer-ride/mule-rocky-summit.jpeg";
import guidesWithHorse from "@/assets/summer-ride/guides-with-horse.jpeg";
import groupRiding from "@/assets/summer-ride/group-riding-mountains.jpeg";
import ranchLifeDogs from "@/assets/summer-ride/ranch-life-dogs.jpeg";

// span classes: col/row spans for collage layout — 4-col grid, 4 rows total
const photos = [
  { src: riderVista, alt: "Rider overlooking Sierra Nevada mountains", className: "col-span-2 row-span-2" },
  { src: guidesWithHorse, alt: "Guides preparing horses on the trail", className: "col-span-2" },
  { src: groupRiding, alt: "Group riding through Sierra Nevada mountains", className: "" },
  { src: muleSummit, alt: "Mule on a rocky mountain summit", className: "" },
  { src: tentInterior, alt: "Inside a cozy mountain tent", className: "" },
  { src: paintedTent, alt: "Custom hand-painted tent in the wilderness", className: "" },
  { src: ranchLifeDogs, alt: "Ranch life with horses and dogs", className: "col-span-2" },
  { src: horsesGrazing, alt: "Horses grazing under pine trees", className: "" },
  { src: packMules, alt: "Pack mules on a forest trail", className: "" },
  { src: peacefulGrazing, alt: "Peaceful moment with horses in the hills", className: "" },
  { src: founderWithDog, alt: "Founder walking with a dog in the hills", className: "" },
];

const inclusions = [
  { icon: Mountain, label: "3-day horse & mule trek" },
  { icon: Tent, label: "Custom painted tents" },
  { icon: UtensilsCrossed, label: "All meals included" },
  { icon: Users, label: "Expert local guides" },
  { icon: Compass, label: "Trail navigation & route finding" },
  { icon: Sunrise, label: "Mountain sunrise rituals" },
  { icon: Footprints, label: "Wilderness hiking" },
  { icon: MapPin, label: "Cultural & historical immersion" },
  { icon: Star, label: "Founding Steward status" },
];

const FoundersRidingRetreat = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-4 text-xs tracking-widest uppercase">
            6 Spots · July 2–5
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Founders Riding Retreat
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A pure equine experience in the Sierra Nevada mountains of southern Spain.
            Four days with horses and mules through epic terrain — sleep under the stars
            and become a Founding Steward of Solareinas.
          </p>
        </div>

        {/* Photo Collage */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12 md:mb-16 rounded-lg overflow-hidden" style={{ backgroundColor: '#8B4513' }}>
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`overflow-hidden ${photo.className}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Content: Itinerary + Details */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Itinerary */}
          <div>
            <h3 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Your Journey
            </h3>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-primary/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                  July 2 · Arrival
                </p>
                <h4 className="text-lg font-medium text-foreground mb-1">
                  Welcome to Solareinas
                </h4>
                <p className="text-muted-foreground">
                  Arrive at the ranch for a wood-fired pizza dinner under the stars.
                  Meet the resident animals and settle into the land.
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-primary/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                  July 3–5 · The Trek
                </p>
                <h4 className="text-lg font-medium text-foreground mb-1">
                  Into the Sierra Nevada
                </h4>
                <p className="text-muted-foreground">
                  Three days riding horses and mules through epic mountain terrain.
                  Hand-painted tents, home-cooked meals, wilderness hiking,
                  sunrise rituals, and deep cultural immersion —
                  guided by those who know these paths by heart.
                </p>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="space-y-6">
            <Card className="shadow-warm border-primary/10">
              <CardContent className="p-6 space-y-5">
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-3">What's Included</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {inclusions.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon className="h-4 w-4 text-primary shrink-0" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-copper-aged" />
                    <span className="text-sm font-medium text-foreground">Founding Steward Status</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Every participant becomes a Founding Steward — first access to newly built
                    volunteer cabins and a lasting place in the Solareinas story.
                  </p>
                </div>

                <div className="border-t border-border pt-4 flex items-baseline justify-between">
                  <div>
                    <p className="text-2xl font-light text-foreground">€1,000</p>
                    <p className="text-xs text-muted-foreground">contribution per person · all-inclusive</p>
                    <p className="text-xs text-primary font-medium mt-1">€300 deposit to reserve your spot</p>
                  </div>
                  <Badge variant="outline" className="text-xs">6 spots</Badge>
                </div>

                <p className="text-xs text-muted-foreground italic">
                  100% of contributions fund the sanctuary and its animals.
                </p>
              </CardContent>
            </Card>

            <Button variant="steward" size="lg" className="w-full text-base" onClick={() => setFormOpen(true)}>
              Reserve Your Spot
            </Button>
          </div>
        </div>
      </div>

      <RetreatSignupForm open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default FoundersRidingRetreat;
