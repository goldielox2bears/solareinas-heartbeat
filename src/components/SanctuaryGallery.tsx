import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

import freeRangeLiving from "@/assets/gallery/free-range-living.jpg";
import dailyCare from "@/assets/gallery/daily-care.jpg";
import landHealing from "@/assets/gallery/land-healing.jpg";
import enrichmentPlay from "@/assets/gallery/enrichment-play.jpg";
import medicalCare from "@/assets/gallery/medical-care.jpg";
import education from "@/assets/gallery/education.jpg";
import peacefulEvening from "@/assets/gallery/peaceful-evening.jpg";
import sustainablePractices from "@/assets/gallery/sustainable-practices.jpg";

const SanctuaryGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: freeRangeLiving,
      alt: "Rescued animals roaming freely in open pasture",
      title: "Free Range Living"
    },
    {
      src: dailyCare,
      alt: "Volunteer feeding time with rescued animals",
      title: "Daily Care"
    },
    {
      src: landHealing,
      alt: "Habitat restoration work in progress",
      title: "Land Healing"
    },
    {
      src: enrichmentPlay,
      alt: "A dermal condition affecting 3 horses - veterinarians are working to understand and treat the issue with topical ointments and regular deworming",
      title: "Medical Care: Dermal Treatment"
    },
    {
      src: medicalCare,
      alt: "Veterinary care session",
      title: "Medical Care"
    },
    {
      src: education,
      alt: "Community education program",
      title: "Education"
    },
    {
      src: peacefulEvening,
      alt: "Sunset over sanctuary grounds",
      title: "Peaceful Evening"
    },
    {
      src: sustainablePractices,
      alt: "Regenerative pasture management",
      title: "Sustainable Practices"
    }
  ];

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

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {galleryImages.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="group cursor-pointer overflow-hidden rounded-xl shadow-gentle hover:shadow-warm transition-all duration-300">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end">
                    <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium">{image.title}</p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                    <h3 className="font-medium mb-1">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.alt}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Video Section */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-gentle">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-light mb-4 text-foreground">
              A Day in the Life
            </h3>
            <p className="text-muted-foreground">
              Experience a typical day at our sanctuary through the eyes of our dedicated volunteers
            </p>
          </div>
          
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">▶️</span>
              </div>
              <p className="text-muted-foreground">Video coming soon</p>
              <p className="text-sm text-muted-foreground mt-2">
                "Behind the Scenes: Morning Feeding & Care Routine"
              </p>
            </div>
          </div>
        </div>

        {/* Virtual Tour */}
        <div className="mt-12 text-center">
          <Button variant="steward" size="lg" className="shadow-warm">
            🌍 Take Our Virtual 360° Tour
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Explore our sanctuary from the comfort of your home
          </p>
        </div>
      </div>
    </section>
  );
};

export default SanctuaryGallery;