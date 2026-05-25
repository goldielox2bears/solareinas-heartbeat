import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const retreats = [
  {
    title: "Founders Riding Retreat",
    desc: "A 10-day epic journey across Sierra Nevada — for adults seeking the deepest experience.",
    href: "/#giving",
    scrollId: "giving",
  },
  {
    title: "Family Camp",
    desc: "Unplugged family days on the ranch — for grown-ups and little ones alike.",
    href: "/family-camp",
  },
  {
    title: "Cowgirls for Change",
    desc: "An advocacy retreat for women ready to ride, gather, and act.",
    href: "/cowgirls-for-change",
  },
];

const RetreatSecondary = () => {
  return (
    <section id="retreats" className="py-20 md:py-24 bg-secondary/20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="kicker mb-3">— STAY A WHILE</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Want to Experience the Farm in Person?
          </h2>
          <p className="font-display text-lg text-muted-foreground">
            Our retreats are the deeper invitation — a chance to slow down,
            reconnect, meet the animals, and experience the land behind the products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {retreats.map((r) => (
            <Card key={r.title} className="border-2 border-border hover:border-primary/40 transition-all">
              <CardContent className="p-6 flex flex-col h-full">
                <h3 className="font-display text-2xl text-foreground mb-2">{r.title}</h3>
                <p className="text-muted-foreground mb-5 flex-1">{r.desc}</p>
                <Button asChild variant="outline" className="self-start">
                  {r.scrollId ? (
                    <a
                      href={r.href}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(r.scrollId!)?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Explore Retreat
                    </a>
                  ) : (
                    <Link to={r.href}>Explore Retreat</Link>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RetreatSecondary;
