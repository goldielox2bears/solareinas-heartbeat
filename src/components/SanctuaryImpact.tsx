import { useEffect, useState } from "react";

const SanctuaryImpact = () => {
  const [counts, setCounts] = useState({
    animals: 0,
    species: 0,
    volunteers: 0,
    acres: 0
  });

  const finalCounts = {
    animals: 46,
    species: 7,
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
                  <div key={index} className="flex items-center justify-between p-3 bg-card rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{project.icon}</span>
                      <span className="font-medium text-foreground">{project.name}</span>
                    </div>
                    <span className="text-primary font-semibold">€{project.cost.toLocaleString()}</span>
                  </div>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-steward text-primary-foreground px-8 py-3 rounded-xl font-medium shadow-warm hover:shadow-sanctuary transition-all duration-300">
              💝 Support Our Mission
            </button>
            <button className="bg-gradient-sanctuary text-foreground px-8 py-3 rounded-xl font-medium shadow-gentle hover:shadow-warm transition-all duration-300">
              📊 Download Impact Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanctuaryImpact;