import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const RetreatsMovedTeaser = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="bg-card border border-border rounded-sm p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <p className="font-label uppercase tracking-[0.3em] text-[0.68rem] text-accent mb-3">
              — Travel experiences
            </p>
            <h3 className="font-prairie-display text-2xl md:text-3xl text-foreground mb-3 leading-tight">
              Looking for retreats and nature escapes?
            </h3>
            <p className="font-prairie-body text-foreground/75 leading-relaxed">
              Our travel experiences now live at ExploreLife.Live.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-none font-label uppercase text-[0.74rem] tracking-[0.22em] border-foreground/40 hover:bg-secondary/60 shrink-0"
          >
            <a href="https://www.explorelife.live" target="_blank" rel="noopener noreferrer">
              Explore Nature Retreats
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RetreatsMovedTeaser;
