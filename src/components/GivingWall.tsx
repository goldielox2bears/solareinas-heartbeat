import { Card, CardContent } from "@/components/ui/card";

const recentContributions = [
  {
    id: 1,
    contributor: "Sarah M.",
    action: "sponsored Luna the horse",
    timeAgo: "2 hours ago",
    type: "steward"
  },
  {
    id: 2,
    contributor: "The Rodriguez Family",
    action: "donated olive trees for the restoration grove",
    timeAgo: "1 day ago",
    type: "steward"
  },
  {
    id: 3,
    contributor: "Marcus K.",
    action: "volunteered 8 hours building fence repairs",
    timeAgo: "3 days ago",
    type: "volunteer"
  },
  {
    id: 4,
    contributor: "Emily & David",
    action: "sponsored feed for the rescued sheep",
    timeAgo: "5 days ago",
    type: "steward"
  },
  {
    id: 5,
    contributor: "Local Hiking Group",
    action: "cleared 2 miles of trail maintenance",
    timeAgo: "1 week ago",
    type: "volunteer"
  }
];

const GivingWall = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-foreground mb-4">
            Gratitude Flows
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every act of generosity creates ripples of healing across our sanctuary. 
            Here we honor those who make transformation possible.
          </p>
        </div>
        
        <div className="space-y-4">
          {recentContributions.map((contribution) => (
            <Card 
              key={contribution.id} 
              className={`p-4 shadow-gentle transition-gentle hover:shadow-warm ${
                contribution.type === 'steward' 
                  ? 'border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent' 
                  : 'border-l-4 border-accent bg-gradient-to-r from-accent/5 to-transparent'
              }`}
            >
              <CardContent className="p-0 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {contribution.type === 'steward' ? '🧡' : '🌾'}
                  </span>
                  <div>
                    <p className="text-foreground font-medium">
                      {contribution.contributor}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {contribution.action}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {contribution.timeAgo}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm italic">
            "In giving, we receive the gift of purpose. In receiving, we honor the giver's heart."
          </p>
        </div>
      </div>
    </section>
  );
};

export default GivingWall;