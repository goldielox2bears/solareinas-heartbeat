import { Button } from "@/components/ui/button";

const SanctuaryWelcome = () => {
  return (
    <section id="sanctuary" className="relative py-24 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-peaceful opacity-50" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-light mb-6 text-foreground">
            Welcome to Our Ranch Rescue
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A Safe Haven for animals where we honour their soul with love and purpose. We are nurturing life and habitat through rehabilitation, 
            regenerative land stewardship, and community impact.
          </p>
        </div>

        {/* Why We Exist */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-gentle">
          <h3 className="text-2xl md:text-3xl font-light mb-6 text-center text-foreground">
            Why We Exist
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-steward rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🌿</span>
              </div>
              <h4 className="text-lg font-medium text-foreground">Retreat Experiences</h4>
              <p className="text-muted-foreground">
                Unplug your life, feel the earth under your feet and fur through your fingers. We offer connection and grounding to living in the moment.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-sanctuary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🌱</span>
              </div>
              <h4 className="text-lg font-medium text-foreground">Regenerative Stewardship</h4>
              <p className="text-muted-foreground">
                Healing the land through sustainable practices that restore ecosystems and create thriving habitats.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-steward rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-lg font-medium text-foreground">Community Impact</h4>
              <p className="text-muted-foreground">
                Building connections between people and nature through education, volunteer opportunities, and shared purpose.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-sanctuary rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🐾</span>
              </div>
              <h4 className="text-lg font-medium text-foreground">Animal Welfare</h4>
              <p className="text-muted-foreground">
                We help animals in need and provide a safe haven for them, helping more animals through partnerships and an extended, loving community.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">Explore our sanctuary</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href="#sanctuary-gallery">Photo Gallery</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="#sanctuary-impact">Our Impact</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="#sanctuary-residents">Meet Our Residents</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href="#sanctuary-testimonials">Stories</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanctuaryWelcome;