import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const volunteerProfiles = [
  {
    id: 1,
    name: "Hanka",
    role: "Animal Care Assistant",
    hours: 500,
    badges: ["🐴 Horse Whisperer", "🐶 Dog Lover", "🐱 Cat Mage"],
    quote: "These animals are my extended family!",
    joinedDate: "October 2024"
  },
  {
    id: 2,
    name: "Andres",
    role: "Weekend Warrior – Fence Building",
    hours: 230,
    badges: ["🏗️ Fence Builder", "🌟 Regular Helper"],
    quote: "Keeping the animals safe is a priority.",
    joinedDate: "2021"
  },
  {
    id: 3,
    name: "Thomas",
    role: "Land Management Volunteer",
    hours: 310,
    badges: ["🌳 Trees", "⛏️ Trenches", "🚜 Excavations"],
    quote: "Having so many 4 legged helpers has been a great experience.",
    joinedDate: "September 2025"
  },
  {
    id: 4,
    name: "Nazeera",
    role: "Animal Care Volunteer",
    hours: 330,
    badges: ["🐴 Horse Lover", "🐶 Spoiler of Dogs"],
    quote: "Caring and riding here has been spectacular!",
    joinedDate: "November 2025"
  }
];

const FreeHerdCircle = () => {
  return (
    <section className="py-16 px-6 bg-gradient-sanctuary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-foreground mb-4">
            The Free Herd Circle
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your hands are welcome in the place your heart already lives. 
            Meet the beautiful souls who help build our sanctuary, day by day.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {volunteerProfiles.map((volunteer) => (
            <Card key={volunteer.id} className="shadow-gentle hover:shadow-warm transition-gentle">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-sanctuary rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  🌾
                </div>
                <CardTitle className="text-lg font-medium text-foreground">
                  {volunteer.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{volunteer.role}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {volunteer.hours}
                  </div>
                  <p className="text-xs text-muted-foreground">hours contributed</p>
                </div>
                
                <div className="flex flex-wrap gap-1 justify-center">
                  {volunteer.badges.map((badge, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs bg-sanctuary-amber/20 text-foreground"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
                
                <blockquote className="text-xs text-muted-foreground italic text-center border-l-2 border-sanctuary-sage pl-3">
                  "{volunteer.quote}"
                </blockquote>
                
                <p className="text-xs text-center text-muted-foreground">
                  Part of the herd since {volunteer.joinedDate}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="sanctuary" size="lg" className="mb-4">
            Join Our Circle
          </Button>
          <p className="text-sm text-muted-foreground">
            Ready to get your hands in the earth? We'll match you with projects that call to your heart.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeHerdCircle;