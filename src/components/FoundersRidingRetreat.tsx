import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Tent, UtensilsCrossed, Users, Star, MapPin, Calendar, Compass, Sunrise, Footprints, Waves, Ship, Music, Landmark } from "lucide-react";
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
import sunsetPaddleboard from "@/assets/summer-ride/sunset-paddleboard.jpeg";
import kayakGroupSelfie from "@/assets/summer-ride/kayak-group-selfie.jpeg";
import kayakCliffs from "@/assets/summer-ride/kayak-cliffs.jpeg";
import alhambraPalace from "@/assets/summer-ride/alhambra-palace.jpeg";
import alhambraGardens from "@/assets/summer-ride/alhambra-gardens.jpeg";

// span classes: col/row spans for collage layout — 4-col grid
const photos = [
  { src: riderVista, alt: "Rider overlooking Sierra Nevada mountains", className: "col-span-2 row-span-2" },
  { src: sunsetPaddleboard, alt: "Sunset paddleboarding at the coast", className: "col-span-2" },
  { src: groupRiding, alt: "Group riding through Sierra Nevada mountains", className: "" },
  { src: muleSummit, alt: "Mule on a rocky mountain summit", className: "" },
  { src: alhambraPalace, alt: "The Alhambra palace reflected in still water", className: "" },
  { src: alhambraGardens, alt: "The Alhambra gardens and ancient towers", className: "" },
  { src: ranchLifeDogs, alt: "Ranch life with horses and dogs", className: "col-span-2" },
  { src: kayakGroupSelfie, alt: "Group kayaking adventure selfie", className: "" },
  { src: packMules, alt: "Pack mules on a forest trail", className: "" },
  { src: tentInterior, alt: "Inside a cozy mountain tent", className: "" },
  { src: paintedTent, alt: "Custom hand-painted tent in the wilderness", className: "" },
  { src: kayakCliffs, alt: "Kayaking along dramatic sea cliffs", className: "" },
  { src: founderWithDog, alt: "Founder walking with a dog in the hills", className: "" },
];

const inclusions = [
  { icon: Music, label: "Flamenco dinner show" },
  { icon: Ship, label: "Mediterranean catamaran cruise" },
  { icon: Landmark, label: "Alhambra guided visit" },
  { icon: Mountain, label: "2-day horseback Sierra trek" },
  { icon: Tent, label: "Mountain camp under the stars" },
  { icon: Waves, label: "Kayaking & snorkeling" },
  { icon: UtensilsCrossed, label: "All meals & accommodation" },
  { icon: Users, label: "Expert local guides" },
  { icon: Compass, label: "Desert & film set experience" },
  { icon: MapPin, label: "Cultural & historical immersion" },
  { icon: Sunrise, label: "Coastal restoration days" },
  { icon: Star, label: "Founding Steward status" },
];

const itinerary = [
  {
    day: "Day 1",
    title: "Arrive in Málaga",
    description: "Arrive in the warmth and colour of southern Spain. Settle into a local hotel, then begin your Andalusian journey with an evening of traditional cuisine, music, and emotion at a flamenco dinner show.",
  },
  {
    day: "Day 2",
    title: "Mediterranean Reset & Granada",
    description: "Ease into holiday mode with a catamaran cruise on the Mediterranean. Let the sea air and open horizon wash away the residue of travel. Later, journey to Granada and settle into one of Spain's most enchanting historic cities.",
  },
  {
    day: "Day 3",
    title: "The Alhambra & Ancient Granada",
    description: "Spend the day exploring the Alhambra, one of the most extraordinary monumental complexes in Europe, where Islamic art, gardens, and royal architecture tell the story of centuries of cultural exchange. In the evening, enjoy a Moroccan-inspired dinner.",
  },
  {
    day: "Day 4",
    title: "Markets, Mountain Roads & Cortijo Stay",
    description: "Wander through Granada's market streets and test your skills in the traditional souk atmosphere — bargaining, browsing, tasting, and discovering artisan treasures. Then climb into the Sierra Nevada and sleep in an authentic mountain cortijo.",
  },
  {
    day: "Day 5",
    title: "Ride into the High Sierras",
    description: "Wake to crisp mountain air and a traditional herder's breakfast. Meet your horse or mule and begin your trek through routes that have connected communities and mountain life for generations. Tonight, sleep under the stars with comfort camps and stargazing.",
  },
  {
    day: "Day 6",
    title: "Sierra Crossing & Cabo de Gata",
    description: "Continue across the sierras to a memorable lunch stop at a renowned retreat setting, then descend from the mountains. Say goodbye to your trusted mount and transfer to Cabo de Gata, where protected coastline and sea air welcome you.",
  },
  {
    day: "Day 7",
    title: "Beach Restoration",
    description: "Spend the day at leisure among crystal-clear waters, quiet coves, and dramatic volcanic formations. Rest, swim, walk, journal, and simply breathe. After the mountain effort, the sea becomes medicine.",
  },
  {
    day: "Day 8",
    title: "Kayak, Snorkel & Reawaken",
    description: "Explore the nature reserve more actively by kayak and snorkel. Move your body again, reconnect with energy and play, and experience the coast from water level. These days by the sea are designed to feel deeply restorative.",
  },
  {
    day: "Day 9",
    title: "Into the Desert",
    description: "Leave the coast and head to Tabernas — Europe's only desert — where raw landscapes and old film legends collide. Enjoy a live Wild West experience in the territory of classic spaghetti westerns. Sleep in the Wild West and take in the strange beauty.",
  },
  {
    day: "Day 10",
    title: "Return to Málaga",
    description: "Travel back to Málaga for departure, carrying home not just memories, but the feeling of having truly moved through Andalusia — its sea, culture, mountains, silence, horses, and desert.",
  },
];

const FoundersRidingRetreat = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="py-16 md:py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-4 text-xs tracking-widest uppercase">
            Small Group · 10 Days · Purpose-Led
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-2">
            Sea to Mountains to Sea
          </h2>
          <p className="text-lg md:text-xl text-primary font-light mb-4">
            An Epic Andalusian Journey
          </p>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Discover Andalusia in its fullest form — sea, mountains, heritage, horses, desert, and soul —
            while helping support a ranch dedicated to animals, nature, and purposeful living.
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

        {/* Short description */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="text-muted-foreground leading-relaxed">
            From Málaga's flamenco spirit to Granada's ancient majesty, from horseback trails in the
            UNESCO-recognised Sierra Nevada to the crystalline waters of Cabo de Gata, and finally into
            the cinematic wildness of Europe's only true desert in Tabernas — this 10-day journey lets
            you experience Andalusia through all the senses. A meaningful portion of contributions
            supports the ranch and helps fund animal care, land stewardship, and the long-term rescue mission.
          </p>
        </div>

        {/* Itinerary + Details */}
        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          {/* Itinerary - 3 cols */}
          <div className="md:col-span-3">
            <h3 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Your 10-Day Journey
            </h3>
            <div className="space-y-4">
              {itinerary.map((day, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                    {day.day}
                  </p>
                  <h4 className="text-base font-medium text-foreground mb-1">
                    {day.title}
                  </h4>
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
                    Founding Stewards receive first access to newly built volunteer cabins and a
                    lasting place in the Solareinas story.
                  </p>
                </div>

                <div className="border-t border-border pt-4 flex items-baseline justify-between">
                  <div>
                    <p className="text-2xl font-light text-foreground">€2,900</p>
                    <p className="text-xs text-muted-foreground">contribution per person · all-inclusive</p>
                    <p className="text-xs text-primary font-medium mt-1">€870 deposit to reserve your place</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Small group</Badge>
                </div>

                <p className="text-xs text-muted-foreground italic">
                  Travel beautifully, and help support the ranch.
                </p>

                <Button variant="steward" size="lg" className="w-full text-base" onClick={() => setFormOpen(true)}>
                  Reserve Your Place
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <RetreatSignupForm open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default FoundersRidingRetreat;