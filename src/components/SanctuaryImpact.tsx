import { useEffect, useState } from "react";

const SanctuaryImpact = () => {
  const [counts, setCounts] = useState({
    animals: 0,
    species: 0,
    volunteers: 0,
    acres: 0
  });

  const finalCounts = {
    animals: 180,
    species: 12,
    volunteers: 1200,
    acres: 25
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

  const outcomeData = [
    { label: "Successfully Released", percentage: 65, color: "bg-green-500" },
    { label: "Permanent Sanctuary", percentage: 25, color: "bg-primary" },
    { label: "Relocated to Reserves", percentage: 10, color: "bg-secondary" }
  ];

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

        {/* Outcome Infographic */}
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-gentle">
          <h3 className="text-2xl md:text-3xl font-light mb-8 text-center text-foreground">
            Rehabilitation Outcomes
          </h3>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Before & After Visualization */}
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg font-medium mb-4 text-foreground">Where Our Animals Go</h4>
                <div className="space-y-3">
                  {outcomeData.map((outcome, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-foreground">{outcome.label}</span>
                          <span className="text-sm text-muted-foreground">{outcome.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${outcome.color} transition-all duration-1000 ease-out`}
                            style={{ width: `${outcome.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Species Breakdown */}
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-center text-foreground">Species We Care For</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-xl">
                  <div className="text-2xl mb-2">🦅</div>
                  <div className="text-sm text-muted-foreground">Birds of Prey</div>
                  <div className="font-medium text-foreground">5 species</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl">
                  <div className="text-2xl mb-2">🦌</div>
                  <div className="text-sm text-muted-foreground">Mammals</div>
                  <div className="font-medium text-foreground">4 species</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl">
                  <div className="text-2xl mb-2">🐍</div>
                  <div className="text-sm text-muted-foreground">Reptiles</div>
                  <div className="font-medium text-foreground">2 species</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl">
                  <div className="text-2xl mb-2">🐸</div>
                  <div className="text-sm text-muted-foreground">Amphibians</div>
                  <div className="font-medium text-foreground">1 species</div>
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