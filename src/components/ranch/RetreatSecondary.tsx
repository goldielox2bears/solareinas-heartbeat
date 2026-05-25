import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import retreatImage from "@/assets/library/horseback-riding-bw.jpeg";

const RetreatSecondary = () => {
  return (
    <section id="retreats" className="py-20 md:py-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 items-stretch">
          <div className="editorial-card rounded-md p-8 md:p-12 flex flex-col justify-center">
            <p className="kicker mb-4">— Stay a while</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-5 leading-tight">
              Want to Experience the <span className="font-serif-italic text-sanctuary-clay">Farm?</span>
            </h2>
            <p className="font-body text-foreground/75 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Our retreats are the deeper invitation — a chance to slow down, reconnect,
              meet the animals, and experience the land behind the products.
            </p>

            <div className="flex flex-col gap-2 mb-8">
              <Link to="/family-camp" className="text-sm text-foreground/80 hover:text-sanctuary-clay border-b border-border pb-2 transition-colors">
                <span className="font-display italic text-lg">Family Camp</span>
                <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">Unplugged family days on the ranch</span>
              </Link>
              <Link to="/cowgirls-for-change" className="text-sm text-foreground/80 hover:text-sanctuary-clay border-b border-border pb-2 transition-colors">
                <span className="font-display italic text-lg">Cowgirls for Change</span>
                <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">An advocacy retreat for women</span>
              </Link>
              <a
                href="#giving"
                onClick={(e) => { e.preventDefault(); document.getElementById('giving')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-sm text-foreground/80 hover:text-sanctuary-clay pb-2 transition-colors"
              >
                <span className="font-display italic text-lg">Founders Riding Retreat</span>
                <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">A 10-day epic journey for adults</span>
              </a>
            </div>

            <Button asChild className="self-start rounded-none uppercase text-[0.72rem] tracking-[0.22em]">
              <a
                href="#giving"
                onClick={(e) => { e.preventDefault(); document.getElementById('giving')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Explore Retreats
              </a>
            </Button>
          </div>

          <div className="rounded-md overflow-hidden min-h-[360px] md:min-h-[480px] relative">
            <img src={retreatImage} alt="Solareinas retreats" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RetreatSecondary;
