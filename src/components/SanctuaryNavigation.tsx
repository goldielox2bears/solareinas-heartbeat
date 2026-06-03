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

  const navLinks: { label: string; href: string; scrollId?: string; external?: boolean }[] = [
    { label: "Shop", href: "/shop" },
    { label: "Impact", href: "/#impact", scrollId: "impact" },
    { label: "Animals", href: "/#meet-the-animals", scrollId: "meet-the-animals" },
    { label: "Our Story", href: "/#our-story", scrollId: "our-story" },
    { label: "Free Herd", href: "/#volunteers", scrollId: "volunteers" },
    { label: "ExploreLife.Live", href: "https://www.explorelife.live", external: true },
    { label: "Ranch List", href: "/#ranch-list", scrollId: "ranch-list" },
  ];

  const handleNavClick = (link: { label: string; href: string; scrollId?: string; external?: boolean }) => {
    setMobileOpen(false);
    if (link.external) {
      window.open(link.href, '_blank', 'noopener,noreferrer');
      return;
    }
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/60">
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
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link); }}
                className="font-label text-[0.78rem] uppercase tracking-[0.18em] text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
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
                      className="text-left px-3 py-3 font-label text-sm uppercase tracking-[0.18em] text-foreground hover:bg-secondary/40 rounded-md transition-colors"
                      onClick={() => handleNavClick(link)}
                    >
                      {link.label}
                    </button>
                  ))}
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
