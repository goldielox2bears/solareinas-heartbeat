import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SanctuaryNavigation = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
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
            <a 
              href="/volunteer-signup" 
              className="text-muted-foreground hover:text-foreground transition-gentle cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate('/volunteer-signup');
              }}
            >
              Join Us
            </a>
            <a href="#giving" className="text-muted-foreground hover:text-foreground transition-gentle">
              Gratitude Flows
            </a>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Welcome back
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => navigate('/auth')}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SanctuaryNavigation;