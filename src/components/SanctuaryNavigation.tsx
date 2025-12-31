import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";

const SanctuaryNavigation = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-light text-foreground">Solareinas Ranch</span>
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/#sanctuary" 
              className="text-muted-foreground hover:text-foreground transition-gentle"
              onClick={(e) => {
                e.preventDefault();
                navigate('/#sanctuary');
                if (window.location.pathname === '/') {
                  document.getElementById('sanctuary')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              The Rescue
            </a>
            <a 
              href="/#rescue" 
              className="text-muted-foreground hover:text-foreground transition-gentle"
              onClick={(e) => {
                e.preventDefault();
                navigate('/#rescue');
                if (window.location.pathname === '/') {
                  document.getElementById('rescue')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Residents
            </a>
            <a 
              href="/#volunteers" 
              className="text-muted-foreground hover:text-foreground transition-gentle"
              onClick={(e) => {
                e.preventDefault();
                navigate('/#volunteers');
                if (window.location.pathname === '/') {
                  document.getElementById('volunteers')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
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
            <a 
              href="/market" 
              className="text-muted-foreground hover:text-foreground transition-gentle cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate('/market');
              }}
            >
              Market
            </a>
            <a 
              href="/sponsor-animal" 
              className="text-muted-foreground hover:text-foreground transition-gentle cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                navigate('/sponsor-animal');
              }}
            >
              Give Support
            </a>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {isAdmin && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin')}
              >
                Admin Panel
              </Button>
            )}
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