import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mountain, UtensilsCrossed, Users, Star, MapPin, Calendar,
  Waves, Camera, Heart, Shield, Eye, Share2, Sparkles,
  Tent, Compass
} from "lucide-react";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import RetreatSignupForm from "@/components/RetreatSignupForm";
import explorelifeLogo from "@/assets/explorelife-logo.png";

import riderVista from "@/assets/summer-ride/rider-mountain-vista.jpeg";
import groupRiding from "@/assets/summer-ride/group-riding-mountains.jpeg";
import packMules from "@/assets/summer-ride/pack-mules-trail.jpeg";
import horsesGrazing from "@/assets/summer-ride/horses-grazing-pines.jpeg";
import paintedTent from "@/assets/summer-ride/painted-tent-exterior.jpeg";
import sunsetPaddleboard from "@/assets/summer-ride/sunset-paddleboard.jpeg";
import kayakCliffs from "@/assets/summer-ride/kayak-cliffs.jpeg";
import alhambraPalace from "@/assets/summer-ride/alhambra-palace.jpeg";

const photos = [
  { src: riderVista, alt: "Rider overlooking Sierra Nevada mountains", className: "col-span-2 row-span-2" },
  { src: groupRiding, alt: "Group riding through mountain trails", className: "col-span-2" },
  { src: horsesGrazing, alt: "Horses grazing in pine forests", className: "" },
  { src: paintedTent, alt: "Custom hand-painted tent in the wilderness", className: "" },
  { src: sunsetPaddleboard, alt: "Sunset at the coast", className: "" },
  { src: packMules, alt: "Pack mules on a forest trail", className: "" },
  { src: kayakCliffs, alt: "Dramatic sea cliffs", className: "" },
  { src: alhambraPalace, alt: "Cultural immersion in Andalusia", className: "" },
];

const rescueSteps = [
  { icon: Heart, title: "Choose", description: "Each participant is introduced to animals in need through trusted rescue relationships. You choose one animal to personally champion." },
  { icon: Shield, title: "Care", description: "Your chosen animal is placed into a managed care program — veterinary assessment, stabilisation, nutrition, rehabilitation, and rehoming support." },
  { icon: Eye, title: "Follow", description: "You receive updates and follow your chosen animal's progress over time, watching its story unfold beyond the retreat." },
  { icon: Share2, title: "Share", description: "Help amplify the rehoming journey by sharing the animal's story with your network, connecting animals with future adopters and supporters." },
];

const inclusions = [
  { icon: Mountain, label: "Sierra Nevada mountain riding" },
  { icon: Waves, label: "Ocean riding in Essaouira" },
  { icon: Sparkles, label: "Hammam & massage experience" },
  { icon: Camera, label: "Professional photo shoot" },
  { icon: Compass, label: "Medina market exploration" },
  { icon: Heart, label: "Personal animal rescue champion" },
  { icon: UtensilsCrossed, label: "All meals & accommodation" },
  { icon: Users, label: "Expert local guides" },
  { icon: Tent, label: "Mountain cabin stay" },
  { icon: MapPin, label: "Spain & Morocco immersion" },
  { icon: Star, label: "Founding Steward status" },
  { icon: Shield, label: "Managed animal care program" },
];

const itinerary = [
  {
    day: "Day 1",
    title: "Arrival in Málaga",
    description: "Arrive in Málaga and settle in. Meet the group, begin to step out of daily life, and open the door to a journey shaped by freedom, connection, and purpose.",
  },
  {
    day: "Day 2",
    title: "Into the Sierra Nevada",
    description: "Depart for the Alpujarras and the historic village of Laroles, where your riding journey begins. The pace softens, the mountains rise, and Andalusia reveals a quieter, wilder side of itself.",
  },
  {
    day: "Days 3–4",
    title: "High Sierra Riding & Mountain Cabin",
    description: "Spend two days riding through the high sierras — expansive views, fresh mountain air, and the kind of stillness that's hard to find in ordinary life. Stay in a mountain cabin. These are the soul days of the Spanish portion. During this phase, connect with the rescue purpose and learn about the animals whose lives are being supported.",
  },
  {
    day: "Day 5",
    title: "Málaga to Marrakesh",
    description: "Drive back to Málaga and continue to Marrakesh, beginning the second chapter. The landscape changes, textures shift, and the journey opens into a new sensory world as Spain gives way to Morocco.",
  },
  {
    day: "Day 6",
    title: "Hammam, Massage & Essaouira",
    description: "A restorative hammam and massage experience — a day of receiving, of being looked after, of stepping into the sensual, restorative side of the retreat. Then travel toward the Atlantic coast.",
  },
  {
    day: "Days 7–8",
    title: "Ocean Riding & Sand Dunes",
    description: "Two days riding beside the ocean and across the sand dunes near Essaouira. Wind, salt air, open horizons, and the exhilaration of movement along the coast. Freedom for the rider, and the hope of freedom for the animals whose journeys are being supported.",
  },
  {
    day: "Day 9",
    title: "Photo Shoot & Medina Market",
    description: "A professional photo shoot captures the beauty, strength, and spirit of the journey. Later, explore the medina market — atmosphere, craftsmanship, colours, and textures of Essaouira's coastal culture. A day for memory-making and celebration.",
  },
  {
    day: "Day 10",
    title: "Return to Málaga",
    description: "Travel back to Marrakesh and fly to Málaga for departure. You return with more than experiences — you return with a story still unfolding, the continued journey of the animal you chose to champion.",
  },
];

const CowgirlsForChangePage = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <SanctuaryNavigation />

      <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <img src={explorelifeLogo} alt="ExploreLife.Live" className="w-24 h-24 mx-auto mb-4 rounded-full" />
            <Badge variant="secondary" className="mb-4 text-xs tracking-widest uppercase">
              Women's Journey · 10 Days · Spain & Morocco
            </Badge>
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-2">
              Cowgirls for Change
            </h1>
            <p className="text-lg md:text-xl text-primary font-light mb-4">
              Adventure for women. A second chance for animals.
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              A 10-day horseback journey through Spain and Morocco for women who want more than
              a beautiful escape. Blending mountain riding, ocean riding, culture, wellness,
              photography, and purpose into one unforgettable experience.
            </p>
          </div>

          {/* Photo Collage */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-12 md:mb-16 rounded-lg overflow-hidden" style={{ backgroundColor: '#8B4513' }}>
            {photos.map((photo, i) => (
              <div key={i} className={`overflow-hidden ${photo.className}`}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* The Experience */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6">The Experience</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ride through the Sierra Nevada mountains, sleep in a mountain cabin, cross into Morocco,
              restore yourself with hammam and massage, gallop beside the Atlantic, explore the medina,
              and capture the beauty of it all in a professional photo shoot.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At the same time, become part of a rescue story that is personal. Each woman chooses one
              animal to champion. That animal is placed into a professionally managed care pathway,
              and participants receive updates and can actively help by sharing the animal's story.
            </p>
            <p className="text-primary font-medium italic">
              The journey becomes something larger than travel alone. It becomes a personal act of advocacy.
            </p>
          </div>

          {/* Why Different */}
          <div className="max-w-3xl mx-auto mb-12 md:mb-16 bg-card rounded-xl p-8">
            <h2 className="text-2xl font-light text-foreground mb-6 text-center">Why Cowgirls for Change Is Different</h2>
            <p className="text-muted-foreground text-center mb-6">
              This retreat is built for women who want:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Real adventure, not just observation",
                "Beautiful experiences with depth and meaning",
                "Connection with horses, landscapes, and culture",
                "A way to contribute to something that matters",
                "A story they can continue to be part of",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Star className="h-3 w-3 text-primary shrink-0 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6 italic">
              You don't just leave with memories. You leave with an animal whose story you helped change.
            </p>
          </div>

          {/* Rescue Journey Steps */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-8 text-center">
              How the Rescue Journey Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rescueSteps.map(({ icon: Icon, title, description }) => (
                <Card key={title} className="border-primary/10">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4 italic">
              All rescue, transport, welfare, and placement decisions are professionally managed to ensure
              the process remains responsible, humane, and legally compliant.
            </p>
          </div>

          {/* Itinerary + Details */}
          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            {/* Itinerary - 3 cols */}
            <div className="md:col-span-3">
              <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Your 10-Day Journey
              </h2>
              <div className="space-y-4">
                {itinerary.map((day, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-primary/30">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                      {day.day}
                    </p>
                    <h3 className="text-base font-medium text-foreground mb-1">
                      {day.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {day.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Card - 2 cols */}
            <div className="md:col-span-2 space-y-6">
              <Card className="shadow-warm border-primary/10 sticky top-24">
                <CardContent className="p-6 space-y-5">
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-3">What's Included</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      <Heart className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">The Rescue Mission</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Each woman leaves with more than memories — she leaves with an animal whose story
                      she helped change. Your journey creates a bridge between meaningful adventure travel
                      and direct, personal rescue engagement.
                    </p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-copper-aged" />
                      <span className="text-sm font-medium text-foreground">Who This Is For</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Women who love horses, nature, and cultural adventure. Who value purpose as much
                      as beauty. Who feel most alive when freedom and compassion meet.
                    </p>
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground italic">
                      Contribution details coming soon. Limited group spaces available.
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">Small group</Badge>
                  </div>

                  <p className="text-xs text-muted-foreground italic">
                    Ride with freedom. Return with purpose.
                  </p>

                  <Button variant="steward" size="lg" className="w-full text-base" onClick={() => setFormOpen(true)}>
                    Register Your Interest
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Signature Promise */}
          <div className="max-w-3xl mx-auto text-center mt-16 py-12 border-t border-border">
            <p className="text-xl md:text-2xl font-light text-foreground italic">
              "Each woman leaves with more than memories — she leaves with an animal whose story she helped change."
            </p>
          </div>
        </div>
      </section>

      <RetreatSignupForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
};

export default CowgirlsForChangePage;
