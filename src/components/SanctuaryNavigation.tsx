import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { Menu, ChevronDown, Search, ShoppingBag } from "lucide-react";

const SanctuaryNavigation = () => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Choose Your Ritual", href: "/#rituals", scrollId: "rituals" },
    { label: "Meet the Animals", href: "/#meet-the-animals", scrollId: "meet-the-animals" },
    { label: "Our Impact", href: "/#impact", scrollId: "impact" },
    { label: "Sustainability", href: "/#sustainability", scrollId: "sustainability" },
    { label: "Free Herd", href: "/#volunteers", scrollId: "volunteers" },
  ];

  const retreatOptions = [
    { label: "Founders Riding Retreat", href: "/#giving", scrollId: "giving" },
    { label: "Family Camp", href: "/family-camp" },
    { label: "Cowgirls for Change", href: "/cowgirls-for-change" },
  ];

  const handleNavClick = (link: { label: string; href: string; scrollId?: string }) => {
    setMobileOpen(false);
    if (link.scrollId) {
      navigate(`/#${link.scrollId}`);
      if (window.location.pathname === '/') {
        setTimeout(() => {
          document.getElementById(link.scrollId!)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } else {
      navigate(link.href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/92 backdrop-blur-md border-b border-border/60">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Wordmark */}
          <button
            onClick={() => navigate('/')}
            className="flex flex-col items-start leading-none shrink-0"
            aria-label="Solareinas home"
          >
            <span className="font-display text-2xl sm:text-[1.65rem] tracking-tight text-foreground">
              Solareinas
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground mt-0.5">
              Life
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
                className="text-[0.78rem] uppercase tracking-[0.18em] text-foreground/75 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-[0.78rem] uppercase tracking-[0.18em] text-foreground/75 hover:text-primary transition-colors outline-none">
                Retreats <ChevronDown className="h-3 w-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="bg-card border-border">
                {retreatOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.label}
                    className="cursor-pointer text-sm"
                    onClick={() => handleNavClick(option)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a
              href="/#about"
              onClick={(e) => { e.preventDefault(); handleNavClick({ label: "About", href: "/#about", scrollId: "about" }); }}
              className="text-[0.78rem] uppercase tracking-[0.18em] text-foreground/75 hover:text-primary transition-colors"
            >
              About
            </a>
          </div>

          {/* Right utilities */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              aria-label="Search"
              onClick={() => navigate('/shop')}
            >
              <Search className="h-[1.05rem] w-[1.05rem]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Shop"
              onClick={() => navigate('/shop')}
            >
              <ShoppingBag className="h-[1.05rem] w-[1.05rem]" />
            </Button>

            {isAdmin && (
              <Button variant="outline" size="sm" className="hidden md:inline-flex" onClick={() => navigate('/admin')}>
                Admin
              </Button>
            )}
            {user ? (
              <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={() => signOut()}>
                Sign Out
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            )}

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-background">
                <SheetHeader>
                  <SheetTitle>
                    <span className="font-display text-2xl text-foreground">Solareinas</span>
                    <span className="block text-[0.6rem] uppercase tracking-[0.32em] text-muted-foreground">Life</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col mt-8 space-y-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.label}
                      className="text-left px-3 py-3 text-sm uppercase tracking-[0.18em] text-foreground hover:bg-secondary/40 rounded-md transition-colors"
                      onClick={() => handleNavClick(link)}
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="px-3 pt-4 pb-2 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">Retreats</div>
                  {retreatOptions.map((option) => (
                    <button
                      key={option.label}
                      className="text-left px-6 py-3 text-sm text-foreground hover:bg-secondary/40 rounded-md transition-colors"
                      onClick={() => handleNavClick(option)}
                    >
                      {option.label}
                    </button>
                  ))}
                  <button
                    className="text-left px-3 py-3 text-sm uppercase tracking-[0.18em] text-foreground hover:bg-secondary/40 rounded-md transition-colors"
                    onClick={() => handleNavClick({ label: "About", href: "/#about", scrollId: "about" })}
                  >
                    About
                  </button>
                  <div className="editorial-rule my-4" />
                  {isAdmin && (
                    <button className="text-left px-3 py-3 text-sm text-foreground hover:bg-secondary/40 rounded-md"
                      onClick={() => { setMobileOpen(false); navigate('/admin'); }}>
                      Admin Panel
                    </button>
                  )}
                  {user ? (
                    <button className="text-left px-3 py-3 text-sm text-foreground hover:bg-secondary/40 rounded-md"
                      onClick={() => { setMobileOpen(false); signOut(); }}>
                      Sign Out
                    </button>
                  ) : (
                    <Button className="mx-3" onClick={() => { setMobileOpen(false); navigate('/auth'); }}>
                      Sign In
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SanctuaryNavigation;
