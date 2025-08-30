import { Button } from "@/components/ui/button";

const SanctuaryNavigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-light text-foreground">Solareinas Ranch</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#sanctuary" className="text-muted-foreground hover:text-foreground transition-gentle">
              The Sanctuary
            </a>
            <a href="#rescue" className="text-muted-foreground hover:text-foreground transition-gentle">
              Rescue Ledger
            </a>
            <a href="#volunteers" className="text-muted-foreground hover:text-foreground transition-gentle">
              Free Herd Circle
            </a>
            <a href="#giving" className="text-muted-foreground hover:text-foreground transition-gentle">
              Gratitude Flows
            </a>
          </div>
          
          {/* Identity Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="gentle" size="sm">
              🧡 Steward Portal
            </Button>
            <Button variant="secondary" size="sm">
              🌾 Volunteer Hub
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SanctuaryNavigation;