import { Sun, Leaf, TreeDeciduous, Zap, Wind } from "lucide-react";

const SustainabilitySection = () => {
  const impactStats = [
    {
      icon: Zap,
      value: "100%",
      label: "Solar Powered",
      description: "All sanctuary operations run on clean solar energy"
    },
    {
      icon: Leaf,
      value: "12",
      label: "Tonnes CO₂ Saved",
      description: "Annual carbon emissions avoided compared to grid power"
    },
    {
      icon: TreeDeciduous,
      value: "550+",
      label: "Trees Equivalent",
      description: "Carbon offset equal to planting over 550 trees yearly"
    },
    {
      icon: Wind,
      value: "Zero",
      label: "Grid Dependency",
      description: "Fully independent from fossil fuel-based electricity"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sun className="w-5 h-5" />
            <span className="font-medium">Powered by the Sun</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            100% Solar Sanctuary
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our commitment to the earth extends beyond animal care. The entire sanctuary 
            operates on renewable solar energy, leaving a lighter footprint on the land we steward.
          </p>
        </div>

        {/* Impact Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-primary mb-2">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Carbon Footprint Comparison */}
        <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
            Our Carbon Footprint Comparison
          </h3>
          
          <div className="space-y-6">
            {/* Average Ranch */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">Average Ranch (Grid Power)</span>
                <span className="text-sm font-bold text-muted-foreground">~15 tonnes CO₂/year</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-destructive/60 rounded-full transition-all duration-1000"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Our Sanctuary */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Solareinas Sanctuary (Solar)</span>
                <span className="text-sm font-bold text-primary">~0.5 tonnes CO₂/year</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000"
                  style={{ width: '3.3%' }}
                />
              </div>
            </div>

            {/* Net Positive */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">With Land Regeneration</span>
                <span className="text-sm font-bold text-green-600">Net Carbon Positive</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                  style={{ width: '15%' }}
                >
                  <Leaf className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto">
            Through solar energy and regenerative land practices, our sanctuary actively 
            contributes to healing the environment while providing a safe haven for rescued animals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
