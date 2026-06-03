import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import oliveImage from "@/assets/library/olive-harvest.jpeg";
import horseImage from "@/assets/library/white-horse-grazing.jpeg";
import dogImage from "@/assets/library/sanctuary-dog.jpeg";

const HeroProductFirst = () => {
  return (
    <section className="bg-background pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <p className="font-label text-[0.72rem] uppercase tracking-[0.3em] text-accent mb-5">
              — Solareinas · Sierra Nevada
            </p>
            <h1 className="font-prairie-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.02] mb-6">
              Ranch-Made.<br />
              Small Batch.<br />
              <span className="text-primary">Every Profit Feeds the Farm.</span>
            </h1>
            <p className="font-prairie-body text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl mb-8">
              Pure small-batch skincare, body care, and ranch goods made with love,
              soil, and purpose. Care for yourself while helping feed the animals
              and restore the land.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-none font-label uppercase text-[0.78rem] tracking-[0.22em] bg-primary text-primary-foreground hover:bg-primary/90 px-7"
              >
                <Link to="/shop">Shop Ranch-Made Goods</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-none font-label uppercase text-[0.78rem] tracking-[0.22em] border-foreground/40 text-foreground hover:bg-secondary/60 px-7"
              >
                <a
                  href="#farm-behind-goods"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("farm-behind-goods")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  See the Farm You Feed
                </a>
              </Button>
            </div>
            <p className="font-hand text-2xl text-accent mt-8">
              made with love &amp; soil
            </p>
          </div>

          {/* Image collage */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="grid grid-cols-6 grid-rows-6 gap-3 md:gap-4 aspect-[5/6] md:aspect-[4/5]">
              <div className="col-span-4 row-span-4 overflow-hidden rounded-sm shadow-warm">
                <img src={oliveImage} alt="Olive harvest at Solareinas ranch" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-2 row-span-3 overflow-hidden rounded-sm bg-accent flex items-center justify-center p-4 text-center">
                <p className="font-prairie-display text-background text-xl md:text-2xl leading-tight">
                  Small<br />Batch<br /><span className="font-hand text-base">since the ranch began</span>
                </p>
              </div>
              <div className="col-span-2 row-span-3 overflow-hidden rounded-sm shadow-warm">
                <img src={dogImage} alt="Ranch dog" className="w-full h-full object-cover" />
              </div>
              <div className="col-span-6 row-span-2 overflow-hidden rounded-sm shadow-warm">
                <img src={horseImage} alt="White horse grazing on ranch land" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroProductFirst;
