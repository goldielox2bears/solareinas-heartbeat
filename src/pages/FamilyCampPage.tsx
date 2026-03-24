import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Tent, UtensilsCrossed, Users, Star, MapPin, Calendar, Compass, Sunrise, Waves, Ship, Camera, Baby, TreePine, Sun } from "lucide-react";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import RetreatSignupForm from "@/components/RetreatSignupForm";
import explorelifeLogo from "@/assets/explorelife-logo.png";

import sunsetPaddleboard from "@/assets/summer-ride/sunset-paddleboard.jpeg";
import kayakCliffs from "@/assets/summer-ride/kayak-cliffs.jpeg";
import ranchLifeDogs from "@/assets/summer-ride/ranch-life-dogs.jpeg";
import familyRidingTrail from "@/assets/family-camp/family-riding-trail.jpeg";
import beachMomDaughter from "@/assets/family-camp/beach-mom-daughter.jpeg";
import kidOnMule from "@/assets/family-camp/kid-on-mule.jpeg";
import trailSelfieFamily from "@/assets/family-camp/trail-selfie-family.jpeg";
import kidMuleTrail from "@/assets/family-camp/kid-mule-trail.jpeg";
import beachKid from "@/assets/family-camp/beach-kid-playing.jpeg";
import beachFamily from "@/assets/family-camp/beach-family-cropped.jpeg";
import snorkelingFamily from "@/assets/family-camp/snorkeling-family.jpeg";
import beachUmbrellas from "@/assets/family-camp/beach-umbrellas.jpeg";
import palmTreesBeach from "@/assets/family-camp/palm-trees-beach.jpeg";
import familySunsetMarshes from "@/assets/family-camp/family-sunset-marshes.jpeg";

const photos = [
  { src: familyRidingTrail, alt: "Family riding together on a trail", className: "col-span-2 row-span-2" },
  { src: beachKid, alt: "Kid playing on the beach in Andalusia", className: "" },
  { src: beachFamily, alt: "Family beach time together", className: "" },
  { src: snorkelingFamily, alt: "Family snorkeling adventure", className: "col-span-2" },
  { src: sunsetPaddleboard, alt: "Family catamaran cruise on the Mediterranean", className: "" },
  { src: palmTreesBeach, alt: "Palm trees on the Andalusian coast", className: "" },
  { src: kidOnMule, alt: "Kid riding with family in the mountains", className: "col-span-2" },
  { src: beachMomDaughter, alt: "Mom and daughter beach moment", className: "" },
  { src: beachUmbrellas, alt: "Beach umbrella vibes", className: "" },
  { src: ranchLifeDogs, alt: "Ranch life with animals", className: "col-span-2" },
  { src: kayakCliffs, alt: "Sea cliffs exploration", className: "" },
  { src: trailSelfieFamily, alt: "Family selfie on the trail", className: "" },
  { src: kidMuleTrail, alt: "Kid riding a mule on a mountain trail", className: "" },
  { src: familySunsetMarshes, alt: "Family holding hands at sunset by the marshes", className: "" },
];

const inclusions = [
  { icon: Ship, label: "Mediterranean catamaran cruise" },
  { icon: Mountain, label: "Extended Sierra Nevada mountain stay" },
  { icon: Waves, label: "Kayaking & snorkeling" },
  { icon: Compass, label: "Tabernas desert & cowboy village overnight" },
  { icon: Sun, label: "Beach days in Cabo de Gata" },
  { icon: TreePine, label: "Nature-based family activities" },
  { icon: UtensilsCrossed, label: "All meals & accommodation" },
  { icon: Users, label: "Max 3 families per tour" },
  { icon: Baby, label: "Family-friendly pace" },
  { icon: MapPin, label: "Cultural & historical immersion" },
  { icon: Sunrise, label: "Digital detox focus" },
  { icon: Star, label: "Founding Steward status" },
];

const itinerary = [
  {
    day: "Day 1",
    title: "Arrival in Málaga",
    description: "Arrive in Málaga and settle in. Enjoy a special family dinner and soak in the lively energy of southern Spain, with local music and traditional ambience introducing families to the rich spirit of Andalusian culture.",
  },
  {
    day: "Day 2",
    title: "Catamaran Cruise & Sea Time",
    description: "Step into holiday mode with a catamaran cruise on the Mediterranean. Feel the sea breeze, enjoy the sunshine, and let the children experience the excitement of being out on the water. A natural reset after travel.",
  },
  {
    day: "Day 3",
    title: "Into the Sierra Nevada Mountains",
    description: "Leave the city and travel into the Sierra Nevada, where nature takes centre stage. Arrive at your authentic mountain accommodation and settle into the slower rhythm of mountain life. Fresh air, quiet surroundings, and the simple joy of being together.",
  },
  {
    day: "Day 4",
    title: "Mountain Life & Family Adventure",
    description: "Wake to clean mountain air and a traditional breakfast. Today is dedicated to enjoying the Sierra Nevada at a family-friendly pace — guided walks, time with animals, nature-based activities, and scenic exploration. Evening stargazing in the mountains.",
  },
  {
    day: "Day 5",
    title: "Epic Mountain Experience",
    description: "Your deeper mountain day — experience the magic and scale of the high sierras. Depending on ages, this could include a guided riding experience, a scenic mountain outing, or a special family excursion. The kind of day children talk about long after the trip.",
  },
  {
    day: "Day 6",
    title: "From Mountains to Cabo de Gata",
    description: "Journey south toward the coast and the protected beauty of Cabo de Gata. Green heights give way to dramatic coastlines, open skies, and the healing presence of the Mediterranean. Settle near the sea and enjoy beach time.",
  },
  {
    day: "Day 7",
    title: "Beach Day in Cabo de Gata",
    description: "Crystal-clear waters, volcanic formations, and quiet natural beaches. An intentionally unhurried day — swim, rest, play, walk, collect little memories, and enjoy the freedom of not needing to be anywhere else.",
  },
  {
    day: "Day 8",
    title: "Kayak, Snorkel & Explore",
    description: "An active adventure in the nature reserve. Explore the coastline by kayak and discover the beauty of the sea through snorkeling. This day combines adventure with play, often becoming a family favourite.",
  },
  {
    day: "Day 9",
    title: "Into the Desert: Tabernas",
    description: "Head into the dramatic landscapes of Tabernas — Europe's only desert. Explore the famous cowboy village setting, enjoy old western film history, and stay overnight at the zoo cowboy village. For children, it's like stepping into another world.",
  },
  {
    day: "Day 10",
    title: "Return to Málaga",
    description: "Travel back to Málaga for departure. Families leave with more than photos — real memories, renewed connection, and the feeling of having truly experienced Andalusia together.",
  },
];

const FamilyCampPage = () => {
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
              Family Adventure · 10 Days · Max 3 Families
            </Badge>
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-2">
              Family Camp: Sea, Mountains & Desert
            </h1>
            <p className="text-lg md:text-xl text-primary font-light mb-4">
              Unplug. Reconnect. Adventure Together.
            </p>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              A private-style Andalusian family adventure designed to help you unplug from electronics,
              reconnect through shared experiences, and create unforgettable memories together.
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

          {/* Description */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Imagine a family holiday where phones fade into the background, conversations come back to life,
              and each day brings a new shared adventure. With more time in the mountains and by the sea,
              this package is intentionally slower, deeper, and more family-centred.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Spend meaningful time in the Sierra Nevada mountains, relax and play by the Mediterranean,
              sail together on a catamaran, and step into the wild cinematic world of Tabernas for a desert
              stay unlike anything your children will ever forget. Limited to just three families per tour.
            </p>
          </div>

          {/* Emotional Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 md:mb-16 max-w-3xl mx-auto">
            {[
              "Unplugging from electronics",
              "Reconnecting as a family",
              "Learning through real experience",
              "Exploring Andalusian culture",
              "Sharing epic outdoor adventures",
              "Creating lasting memories",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-3 w-3 text-primary shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Itinerary + Details */}
          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            {/* Itinerary - 3 cols */}
            <div className="md:col-span-3">
              <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Your 10-Day Family Journey
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
                      <Star className="h-4 w-4 text-copper-aged" />
                      <span className="text-sm font-medium text-foreground">Travel With Purpose</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Every journey helps protect another life. When you travel with us, you are also
                      helping support the animals and land that make the ranch's mission possible.
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-border pt-4 space-y-3">
                    <div>
                      <p className="text-2xl font-light text-foreground">€11,000</p>
                      <p className="text-xs text-muted-foreground">per family of 4 · all-inclusive</p>
                      <p className="text-xs text-muted-foreground mt-1">2 adults + 2 children (up to 15) or 1 parent + 3 children</p>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Additional child: <span className="text-foreground font-medium">€1,600</span></p>
                    </div>
                  </div>

                  {/* Private option */}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Private Family Tour</span>
                    </div>
                    <p className="text-2xl font-light text-foreground">€15,000</p>
                    <p className="text-xs text-muted-foreground">
                      The entire experience dedicated to your family — your own pace, full flexibility,
                      and a truly personal reconnection escape.
                    </p>
                  </div>

                  {/* Photographer add-on */}
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Camera className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Optional: Professional Photographer</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      A professional photographer can accompany the journey and capture special moments
                      throughout the trip. Stay fully present while bringing home lasting visual memories.
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">Max 3 families</Badge>
                  </div>

                  <p className="text-xs text-muted-foreground italic">
                    Less screen time. More story time.
                  </p>

                  <Button variant="steward" size="lg" className="w-full text-base" onClick={() => setFormOpen(true)}>
                    Reserve Your Family Adventure
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <RetreatSignupForm open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
};

export default FamilyCampPage;
