import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import impactReportImage from "@/assets/impact-report.jpg";

const SanctuaryImpact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [counts, setCounts] = useState({
    animals: 0,
    species: 0,
    volunteers: 0,
    acres: 0
  });

  const finalCounts = {
    animals: 46,
    species: 5,
    volunteers: 16420,
    acres: 4
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setCounts(prev => ({
        animals: Math.min(prev.animals + Math.ceil(finalCounts.animals / steps), finalCounts.animals),
        species: Math.min(prev.species + Math.ceil(finalCounts.species / steps), finalCounts.species),
        volunteers: Math.min(prev.volunteers + Math.ceil(finalCounts.volunteers / steps), finalCounts.volunteers),
        acres: Math.min(prev.acres + Math.ceil(finalCounts.acres / steps), finalCounts.acres),
      }));
    }, stepDuration);

    // Stop when all counts reach their final values
    const checkComplete = setInterval(() => {
      if (counts.animals >= finalCounts.animals && 
          counts.species >= finalCounts.species && 
          counts.volunteers >= finalCounts.volunteers && 
          counts.acres >= finalCounts.acres) {
        clearInterval(timer);
        clearInterval(checkComplete);
      }
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(checkComplete);
    };
  }, []);

  const upcomingProjects = [
    { name: "Free Herd Volunteer Cabin", cost: 9600, icon: "🏠" },
    { name: "Fencing", cost: 4000, icon: "🚧" },
    { name: "Shade Areas for Horses", cost: 1800, icon: "☀️" },
    { name: "Feed Storage", cost: 1600, icon: "🌾" },
    { name: "Animal Cleaning", cost: 400, icon: "🧹" },
    { name: "Carrots and Pumpkin Garden", cost: 350, icon: "🥕" }
  ];

  const totalProjectCost = upcomingProjects.reduce((sum, p) => sum + p.cost, 0);

  return (
    <section id="sanctuary-impact" className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground">
            Our Impact at a Glance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real numbers that tell the story of restoration, rehabilitation, and hope
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 bg-background/80 rounded-2xl shadow-gentle">
            <div className="text-4xl md:text-6xl font-light text-primary mb-2">
              {counts.animals}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
              Total Animals
            </div>
            <div className="text-foreground font-medium">
              Rescued to Date
            </div>
          </div>

          <div className="text-center p-6 bg-background/80 rounded-2xl shadow-gentle">
            <div className="text-4xl md:text-6xl font-light text-secondary mb-2">
              {counts.species}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
              Species
            </div>
            <div className="text-foreground font-medium">
              Represented
            </div>
          </div>

          <div className="text-center p-6 bg-background/80 rounded-2xl shadow-gentle">
            <div className="text-4xl md:text-6xl font-light text-accent mb-2">
              {counts.volunteers}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
              Volunteer Hours
            </div>
            <div className="text-foreground font-medium">
              This Year
            </div>
          </div>

          <div className="text-center p-6 bg-background/80 rounded-2xl shadow-gentle">
            <div className="text-4xl md:text-6xl font-light text-sanctuary-sage mb-2">
              {counts.acres}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
              Regenerative
            </div>
            <div className="text-foreground font-medium">
              Acres
            </div>
          </div>
        </div>

        {/* Projects and Visitors */}
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-gentle">
          <h3 className="text-2xl md:text-3xl font-light mb-8 text-center text-foreground">
            Upcoming Projects
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Upcoming Projects */}
            <div className="space-y-6">
              <div className="text-center mb-4">
                <p className="text-muted-foreground">Help us reach our goal of <span className="text-primary font-semibold">€{totalProjectCost.toLocaleString()}</span></p>
              </div>
              <div className="space-y-3">
                {upcomingProjects.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(`/gift?project=${encodeURIComponent(project.name)}`)}
                    className="w-full flex items-center justify-between p-3 bg-card rounded-xl hover:bg-accent/50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{project.icon}</span>
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">{project.name}</span>
                    </div>
                    <span className="text-primary font-semibold group-hover:underline">€{project.cost.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Countries Visitors Come From */}
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-center text-foreground">Countries Our Visitors Come From</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">🇺🇸</div>
                  <div className="text-sm font-medium text-foreground">USA</div>
                </div>
                <div className="text-center p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">🇨🇿</div>
                  <div className="text-sm font-medium text-foreground">Czech Republic</div>
                </div>
                <div className="text-center p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">🇩🇪</div>
                  <div className="text-sm font-medium text-foreground">Germany</div>
                </div>
                <div className="text-center p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">🇨🇦</div>
                  <div className="text-sm font-medium text-foreground">Canada</div>
                </div>
                <div className="text-center p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">🇿🇦</div>
                  <div className="text-sm font-medium text-foreground">South Africa</div>
                </div>
                <div className="text-center p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">🇳🇱</div>
                  <div className="text-sm font-medium text-foreground">Netherlands</div>
                </div>
                <div className="text-center p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">🇮🇪</div>
                  <div className="text-sm font-medium text-foreground">Ireland</div>
                </div>
                <div className="text-center p-3 bg-card rounded-xl">
                  <div className="text-2xl mb-1">🇪🇸</div>
                  <div className="text-sm font-medium text-foreground">Spain</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            Every number represents a life transformed through your support
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate("/gift")}>
              💝 Support Our Mission
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsReportOpen(true)}>
              📊 View Our Impact Report
            </Button>
          </div>
        </div>
      </div>

      {/* Impact Report Dialog */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light text-center">
              Two Years of Solareinas Ranch Rescue in Action
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <img 
              src={impactReportImage} 
              alt="Solareinas Impact Report - Two years of rescue in action" 
              className="w-full rounded-xl"
            />
            
            {/* Email Signup Form */}
            <div className="bg-card/50 rounded-xl p-6 space-y-4">
              <h4 className="text-lg font-medium text-center text-foreground">
                Stay Connected with Our Journey
              </h4>
              <p className="text-sm text-muted-foreground text-center">
                Receive updates on our animals, projects, and ways to support.
              </p>
              
              {isSubscribed ? (
                <div className="text-center py-4">
                  <div className="text-2xl mb-2">💚</div>
                  <p className="text-primary font-medium">Thank you for joining our community!</p>
                  <p className="text-sm text-muted-foreground mt-1">We will be in touch soon.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!email.trim()) return;
                    
                    setIsSubmitting(true);
                    // Simulate submission - in production, this would save to database
                    setTimeout(() => {
                      setIsSubscribed(true);
                      setIsSubmitting(false);
                      toast({
                        title: "Welcome to our community!",
                        description: "You will receive updates about our sanctuary.",
                      });
                    }, 500);
                  }}
                  className="space-y-3"
                >
                  <Input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background"
                  />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Joining..." : "Join Our Community"}
                  </button>
                </form>
              )}
            </div>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Every gift helps us continue this vital work for animals and land alike.
              </p>
              <button 
                onClick={() => {
                  setIsReportOpen(false);
                  navigate("/gift");
                }}
                className="bg-gradient-steward text-primary-foreground px-8 py-3 rounded-xl font-medium shadow-warm hover:shadow-sanctuary transition-all duration-300"
              >
                💝 Support Our Mission
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SanctuaryImpact;