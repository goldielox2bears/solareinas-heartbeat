import { Wheat, Stethoscope, Hammer, Home, TreePine, Droplets } from "lucide-react";

const tiles = [
  { icon: Wheat, label: "Animal Feed" },
  { icon: Stethoscope, label: "Vet Care" },
  { icon: Hammer, label: "Farrier Care" },
  { icon: Home, label: "Shelter Repairs" },
  { icon: TreePine, label: "Land Regeneration" },
  { icon: Droplets, label: "Water & Farm Systems" },
];

const EveryProductHasPurpose = () => {
  return (
    <section id="impact" className="py-20 md:py-28 bg-secondary/30">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="kicker mb-4">— Where it goes</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
            Every Product Has<br />a <span className="font-serif-italic text-sanctuary-clay">Purpose</span>
          </h2>
          <div className="editorial-rule w-24 mx-auto my-6" />
          <p className="font-body text-base md:text-lg text-foreground/75 leading-relaxed">
            When you choose a Solareinas product, the profit helps care for the animals,
            the land, and the daily needs of the farm — feed, vet visits, farrier care,
            shelter, soil, water, and the quiet work that keeps it alive.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className="editorial-card rounded-sm p-5 text-center flex flex-col items-center gap-3"
              >
                <Icon className="w-7 h-7 text-sanctuary-clay" strokeWidth={1.2} />
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-foreground/80 leading-tight">
                  {t.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EveryProductHasPurpose;
