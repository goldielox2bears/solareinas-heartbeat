import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const rescueAnimals = [
  {
    id: 1,
    name: "Luna",
    type: "Horse",
    story: "Rescued from neglect, Luna now roams freely across our meadows, her spirit restored.",
    sponsored: false,
    image: "🐴"
  },
  {
    id: 2,
    name: "Oliver",
    type: "Goat",
    story: "Once alone, Oliver now leads his herd with gentle confidence through the oak groves.",
    sponsored: true,
    sponsor: "The Johnson Family",
    image: "🐐"
  },
  {
    id: 3,
    name: "Sage",
    type: "Sheep",
    story: "Found wandering, Sage has become the peaceful heart of our flock.",
    sponsored: false,
    image: "🐑"
  }
];

const RescueLedger = () => {
  return (
    <section className="py-16 px-6 bg-gradient-peaceful">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-foreground mb-4">
            Rescue Ledger
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the souls you've helped save. Each animal carries a story of transformation, 
            made possible by the generosity of our Stewards.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rescueAnimals.map((animal) => (
            <Card key={animal.id} className="shadow-gentle hover:shadow-sanctuary transition-gentle">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{animal.image}</div>
                <CardTitle className="text-xl font-medium text-foreground">
                  {animal.name}
                </CardTitle>
                <p className="text-muted-foreground">{animal.type}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {animal.story}
                </p>
                
                {animal.sponsored ? (
                  <div className="p-3 bg-sanctuary-sage/20 rounded-lg">
                    <p className="text-xs text-foreground font-medium">
                      Sponsored by {animal.sponsor}
                    </p>
                  </div>
                ) : (
                  <Button variant="steward" size="sm" className="w-full">
                    Become {animal.name}'s Steward
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RescueLedger;