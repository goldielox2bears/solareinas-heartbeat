import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import srrLogo from "@/assets/srr-logo-transparent.png";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

const SanctuaryNavigation = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Our Why", href: "/#sanctuary", scrollId: "sanctuary" },
    { label: "Residents", href: "/#rescue", scrollId: "rescue" },
    { label: "Free Herd Circle", href: "/#volunteers", scrollId: "volunteers" },
    { label: "Join Us", href: "/volunteer-signup" },
    { label: "Retreat", href: "/#giving", scrollId: "giving" },
    { label: "The Market", href: "/market" },
    { label: "Quiz", href: "/quiz" },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    setMobileOpen(false);
    if (link.scrollId) {
      navigate(`/#${link.scrollId}`);
      if (window.location.pathname === '/') {
        document.getElementById(link.scrollId)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(link.href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src={srrLogo} alt="SRR" className="h-10 sm:h-12 w-auto object-contain" />
            <span className="text-lg sm:text-xl font-light text-foreground">Solareinas Ranch</span>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-gentle"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
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

          {/* Mobile Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <img src={srrLogo} alt="SRR" className="h-8 w-auto object-contain" />
                  <span className="font-light">Solareinas Ranch</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col mt-6 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    className="text-left px-3 py-3 rounded-md text-foreground hover:bg-accent transition-colors"
                    onClick={() => handleNavClick(link)}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="border-t border-border my-3" />
                {isAdmin && (
                  <button
                    className="text-left px-3 py-3 rounded-md text-foreground hover:bg-accent transition-colors"
                    onClick={() => { setMobileOpen(false); navigate('/admin'); }}
                  >
                    Admin Panel
                  </button>
                )}
                {user ? (
                  <button
                    className="text-left px-3 py-3 rounded-md text-foreground hover:bg-accent transition-colors"
                    onClick={() => { setMobileOpen(false); signOut(); }}
                  >
                    Sign Out
                  </button>
                ) : (
                  <Button
                    variant="default"
                    className="mx-3"
                    onClick={() => { setMobileOpen(false); navigate('/auth'); }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default SanctuaryNavigation;
