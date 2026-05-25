import { Wheat, Stethoscope, Hammer, Home, TreePine, Droplets } from "lucide-react";

const tiles = [
  { icon: Wheat, label: "Animal feed", note: "Daily hay, grain, supplements" },
  { icon: Stethoscope, label: "Vet care", note: "Check-ups, treatments, medicine" },
  { icon: Hammer, label: "Farrier care", note: "Hoof trims & shoes, every cycle" },
  { icon: Home, label: "Shelter repairs", note: "Safe barns, fencing, fixes" },
  { icon: TreePine, label: "Land regeneration", note: "Soil, trees, native planting" },
  { icon: Droplets, label: "Water & farm systems", note: "Irrigation, troughs, infrastructure" },
];

const EveryProductHasPurpose = () => {
  return (
    <section id="impact" className="py-20 md:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="kicker mb-3">— WHERE IT GOES</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-5">
            Every Product Has a Purpose
          </h2>
          <p className="font-display text-lg md:text-xl text-muted-foreground">
            When you choose a Solareinas product, the profit helps care for the animals,
            land, and daily needs of the farm — feed, supplements, vet visits, farrier
            care, shelter, soil, water, and the quiet work that keeps it alive.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.label}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-copper text-white mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="font-display text-lg text-foreground mb-1">{t.label}</div>
                <div className="text-sm text-muted-foreground">{t.note}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EveryProductHasPurpose;
