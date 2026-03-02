import { useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import freeRangeLiving from "@/assets/gallery/free-range-living.jpg";
import dailyCare from "@/assets/gallery/daily-care.jpg";
import landHealing from "@/assets/gallery/land-healing.jpg";
import enrichmentPlay from "@/assets/gallery/enrichment-play.jpg";
import medicalCare from "@/assets/gallery/medical-care.jpg";
import education from "@/assets/gallery/education.jpg";
import peacefulEvening from "@/assets/gallery/peaceful-evening.jpg";
import sustainablePractices from "@/assets/gallery/sustainable-practices.jpg";
import whiteHorseVista from "@/assets/gallery/white-horse-vista.jpeg";
import dogOnRock from "@/assets/gallery/dog-on-rock.jpeg";
import almondBlossoms from "@/assets/gallery/almond-blossoms.jpeg";
import chestnutHorseTrail from "@/assets/gallery/chestnut-horse-trail.jpeg";
import lenticularSunset from "@/assets/gallery/lenticular-sunset.jpeg";
import dogsOnCouch from "@/assets/gallery/dogs-on-couch.jpeg";
import founderWithDogs from "@/assets/gallery/founder-with-dogs.jpeg";
import dogsSleeping from "@/assets/gallery/dogs-sleeping.jpeg";

const galleryImages = [
  { src: freeRangeLiving, alt: "Buffy recovered from cancer surgery and ranging freely again", title: "Successful Cancer Treatment" },
  { src: whiteHorseVista, alt: "White horse gazing over the mountain valley at sunset", title: "Mountain Vista" },
  { src: dailyCare, alt: "Volunteer families reconnecting with animal care", title: "Animal Care" },
  { src: chestnutHorseTrail, alt: "Chestnut horse on a mountain trail ride", title: "Trail Riding" },
  { src: landHealing, alt: "Removing diseased trees during olive harvest", title: "Land Treatment" },
  { src: almondBlossoms, alt: "Almond trees in bloom at sunset with mountain backdrop", title: "Almond Blossom Season" },
  { src: enrichmentPlay, alt: "Veterinarians treating a dermal condition in horses", title: "Medical Care: Dermal Treatment" },
  { src: dogOnRock, alt: "Dog silhouetted on a rocky peak overlooking the valley", title: "King of the Hill" },
  { src: medicalCare, alt: "Rescued horses and mules grazing freely", title: "Free Range Living" },
  { src: dogsOnCouch, alt: "Three rescue dogs resting together on the couch", title: "Couch Life" },
  { src: education, alt: "Young volunteer families learning hands-on animal care", title: "Education & Connection" },
  { src: founderWithDogs, alt: "Sanctuary founder relaxing with rescue dogs", title: "Family Time" },
  { src: peacefulEvening, alt: "Buffy supervising the olive harvest at 14 years old", title: "Olive Harvest" },
  { src: lenticularSunset, alt: "Dramatic lenticular clouds over the sanctuary at sunset", title: "Sanctuary Sunset" },
  { src: sustainablePractices, alt: "Regenerative pasture management", title: "Expert String Stalker" },
  { src: dogsSleeping, alt: "Bumbo and friend sleeping peacefully together", title: "Sweet Dreams" },
];

const SanctuaryGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="sanctuary-gallery" className="py-24 px-6 bg-gradient-peaceful">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
            Life at the Sanctuary
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take a glimpse into daily life at Solareinas Ranch through our curated photo collection
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-12">
          <div ref={emblaRef} className="overflow-hidden rounded-2xl">
            <div className="flex">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pl-4 first:pl-0"
                >
                  <div
                    className="group cursor-pointer overflow-hidden rounded-xl shadow-gentle hover:shadow-warm transition-all duration-300 relative"
                    onClick={() => setSelectedIndex(index)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
                      <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm font-medium">{image.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full shadow-gentle transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 rounded-full shadow-gentle transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
          <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
            {selectedIndex !== null && (
              <div className="relative">
                <img
                  src={galleryImages[selectedIndex].src}
                  alt={galleryImages[selectedIndex].alt}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                  <h3 className="font-medium mb-1">{galleryImages[selectedIndex].title}</h3>
                  <p className="text-sm opacity-90">{galleryImages[selectedIndex].alt}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Video Section */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-gentle">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-light mb-4 text-foreground">A Day in the Life</h3>
            <p className="text-muted-foreground">Experience a typical day at our sanctuary through the eyes of our dedicated volunteers</p>
          </div>
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">▶️</span>
              </div>
              <p className="text-muted-foreground">Video coming soon</p>
              <p className="text-sm text-muted-foreground mt-2">"Behind the Scenes: Morning Feeding & Care Routine"</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button variant="steward" size="lg" className="shadow-warm">🌍 Take Our Virtual 360° Tour</Button>
          <p className="text-sm text-muted-foreground mt-4">Explore our sanctuary from the comfort of your home</p>
        </div>
      </div>
    </section>
  );
};

export default SanctuaryGallery;
