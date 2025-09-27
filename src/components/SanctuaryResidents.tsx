import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowRight } from "lucide-react";

const SanctuaryResidents = () => {
  const residents = [
    {
      id: 1,
      name: "Luna",
      species: "Great Horned Owl",
      image: "/lovable-uploads/36fe2001-2cab-427a-9506-1dba65888ffc.png",
      story: "Found as a nestling with a broken wing, Luna has made remarkable progress through dedicated rehabilitation.",
      status: "Learning to fly again",
      statusType: "recovery" as const,
      age: "2 years",
      arrivalDate: "March 2023",
      sponsorshipCost: "€25/month",
      progress: 75
    },
    {
      id: 2,
      name: "Phoenix",
      species: "Red-Tailed Hawk",
      image: "/lovable-uploads/36fe2001-2cab-427a-9506-1dba65888ffc.png",
      story: "Rescued after a car collision, Phoenix underwent extensive surgery and is now thriving in our flight enclosure.",
      status: "Ready for release",
      statusType: "ready" as const,
      age: "4 years",
      arrivalDate: "August 2023",
      sponsorshipCost: "€30/month",
      progress: 95
    },
    {
      id: 3,
      name: "Sage",
      species: "Fox",
      image: "/lovable-uploads/36fe2001-2cab-427a-9506-1dba65888ffc.png",
      story: "Orphaned kit who couldn't be reunited with his family. Sage is learning essential survival skills for future release.",
      status: "In training",
      statusType: "training" as const,
      age: "8 months",
      arrivalDate: "June 2024",
      sponsorshipCost: "€20/month",
      progress: 60
    },
    {
      id: 4,
      name: "Willow",
      species: "Barn Owl",
      image: "/lovable-uploads/36fe2001-2cab-427a-9506-1dba65888ffc.png",
      story: "Permanent sanctuary resident due to vision impairment. Willow serves as an education ambassador, helping visitors learn about owl conservation.",
      status: "Sanctuary resident",
      statusType: "permanent" as const,
      age: "6 years",
      arrivalDate: "January 2021",
      sponsorshipCost: "€35/month",
      progress: 100
    }
  ];

  const getStatusColor = (type: string) => {
    switch (type) {
      case "recovery": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "ready": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "training": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "permanent": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <section id="sanctuary-residents" className="py-24 px-6 bg-gradient-sanctuary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
            Meet Our Residents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every animal has a story of resilience. Get to know some of the incredible individuals in our care.
          </p>
        </div>

        {/* Residents Carousel */}
        <div className="relative">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-4">
              {residents.map((resident) => (
                <CarouselItem key={resident.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full bg-background/80 backdrop-blur-sm shadow-gentle hover:shadow-warm transition-all duration-300">
                    <CardHeader className="p-0">
                      <div className="relative">
                        <img
                          src={resident.image}
                          alt={`${resident.name} the ${resident.species}`}
                          className="w-full h-48 object-cover rounded-t-xl"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className={getStatusColor(resident.statusType)}>
                            {resident.status}
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white">
                            <div className="flex justify-between items-center text-sm">
                              <span>Recovery Progress</span>
                              <span>{resident.progress}%</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-1 mt-1">
                              <div 
                                className="bg-white h-1 rounded-full transition-all duration-1000"
                                style={{ width: `${resident.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6">
                      <CardTitle className="text-xl mb-2 text-foreground">
                        {resident.name}
                      </CardTitle>
                      <CardDescription className="text-primary font-medium mb-3">
                        {resident.species}
                      </CardDescription>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {resident.story}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground mb-4">
                        <div>
                          <span className="font-medium">Age:</span> {resident.age}
                        </div>
                        <div>
                          <span className="font-medium">Arrived:</span> {resident.arrivalDate}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-6 pt-0 space-y-3">
                      <div className="w-full text-center">
                        <div className="text-lg font-semibold text-primary mb-1">
                          {resident.sponsorshipCost}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Monthly sponsorship
                        </div>
                      </div>
                      
                      <div className="flex gap-2 w-full">
                        <Button variant="steward" size="sm" className="flex-1">
                          <Heart className="w-4 h-4 mr-1" />
                          Sponsor {resident.name}
                        </Button>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-gentle max-w-2xl mx-auto">
            <h3 className="text-2xl font-light mb-4 text-foreground">
              Every Sponsorship Makes a Difference
            </h3>
            <p className="text-muted-foreground mb-6">
              Your monthly support provides food, medical care, enrichment, and the specialized attention each animal needs to heal and thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="steward" size="lg" className="shadow-warm">
                🧡 View All Available Sponsorships
              </Button>
              <Button variant="outline" size="lg">
                📱 Download Sponsorship App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanctuaryResidents;