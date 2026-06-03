import { Sprout, Hand, HeartPulse, Gift, Fence } from "lucide-react";

// NOTE: Hardcoded for now. Move to product_impact/farm_needs tables in a follow-up
// additive migration if admin editability is needed.
const supports = [
  { icon: Hand, item: "1 soap bar", outcome: "helps provide feed for a rescued animal" },
  { icon: Sprout, item: "1 balm", outcome: "helps support hoof care and daily maintenance" },
  { icon: HeartPulse, item: "1 serum", outcome: "helps fund health checks, supplements, or medicine" },
  { icon: Gift, item: "1 gift box", outcome: "helps cover a larger farm care need" },
  { icon: Fence, item: "1 bundle", outcome: "helps support fencing, shelter, or land restoration" },
];

const WhatYourPurchaseSupports = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/40">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="font-label uppercase tracking-[0.3em] text-[0.7rem] text-accent mb-4">— Real outcomes</p>
          <h2 className="font-prairie-display text-4xl md:text-5xl text-foreground leading-tight">
            What Your Purchase Supports
          </h2>
          <div className="h-px w-20 bg-foreground/25 mx-auto my-6" />
          <p className="font-prairie-body text-foreground/75 leading-relaxed">
            Every order helps care for the animals, the land, and the daily
            needs of a working ranch. No exact dollar promises — just honest
            contribution toward what keeps this farm alive.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {supports.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.item}
                className="bg-card border border-border rounded-sm p-6 flex flex-col items-start gap-4 hover:shadow-warm transition-shadow"
              >
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.4} />
                </div>
                <p className="font-prairie-display text-xl text-foreground leading-tight">
                  {s.item}
                </p>
                <p className="font-prairie-body text-sm text-foreground/75 leading-relaxed">
                  {s.outcome}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYourPurchaseSupports;
