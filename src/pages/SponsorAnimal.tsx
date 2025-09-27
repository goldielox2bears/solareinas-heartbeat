import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import SanctuaryNavigation from '@/components/SanctuaryNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Star, Gift, Calendar, Euro } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Animal {
  id: string;
  name: string;
  species: string;
  age?: number;
  story?: string;
  photo_url?: string;
  monthly_sponsorship_cents: number;
  annual_sponsorship_cents: number;
  available_for_sponsorship: boolean;
  current_sponsors_count: number;
  max_sponsors: number;
}

interface SponsorshipForm {
  sponsor_name: string;
  sponsor_email: string;
  sponsorship_type: 'monthly' | 'annual';
  special_requests: string;
}

export default function SponsorAnimal() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [form, setForm] = useState<SponsorshipForm>({
    sponsor_name: '',
    sponsor_email: '',
    sponsorship_type: 'monthly',
    special_requests: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimals();
  }, []);

  const fetchAnimals = async () => {
    try {
      const { data, error } = await supabase
        .from('animals')
        .select('*')
        .eq('available_for_sponsorship', true)
        .order('name');

      if (error) throw error;
      setAnimals(data || []);
    } catch (error) {
      console.error('Error fetching animals:', error);
      toast({
        title: "Error",
        description: "Failed to load animals. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (cents: number) => {
    return `€${(cents / 100).toFixed(0)}`;
  };

  const handleSponsorClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    setIsDialogOpen(true);
  };

  const handleSubmitSponsorship = async () => {
    if (!selectedAnimal || !form.sponsor_name || !form.sponsor_email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      const amount_cents = form.sponsorship_type === 'monthly' 
        ? selectedAnimal.monthly_sponsorship_cents 
        : selectedAnimal.annual_sponsorship_cents;

      const { error } = await supabase
        .from('sponsorships')
        .insert({
          animal_id: selectedAnimal.id,
          sponsor_name: form.sponsor_name,
          sponsor_email: form.sponsor_email,
          sponsorship_type: form.sponsorship_type,
          amount_cents,
          special_requests: form.special_requests,
          founding_guardian: true // Mark as founding guardian for pre-opening sponsors
        });

      if (error) throw error;

      toast({
        title: "Support Created!",
        description: `Thank you for supporting ${selectedAnimal.name}. You'll receive a confirmation email soon.`,
      });

      setIsDialogOpen(false);
      setForm({
        sponsor_name: '',
        sponsor_email: '',
        sponsorship_type: 'monthly',
        special_requests: ''
      });
      setSelectedAnimal(null);
    } catch (error) {
      console.error('Error creating sponsorship:', error);
      toast({
        title: "Error",
        description: "Failed to create your support. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getSponsorshipInfo = () => {
    return [
      "A personalized adoption certificate featuring the story of your chosen animal",
      "Twice-yearly updates with heartwarming photos and videos of your adopted friend",
      "A unique, hand-signed 'thank you' from your animal (with a little help from us!)",
      "Recognition on our online and on-ranch sponsor wall, celebrating your generosity",
      "Priority invitation to visit or spend time with your adopted animal at the sanctuary"
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SanctuaryNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading animals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SanctuaryNavigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Step into the sanctuary you've helped create
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Your generosity makes this possible. Your hands are welcome here.
          </p>
          <p className="text-lg mb-8 text-foreground">
            Support the care of a rescued animal and receive love, updates, and lasting impact.
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            When you support an animal, you're not taking them home — you're giving them a second chance to live freely, safely, and loved on our ranch. Your generous gift directly supports their daily needs, veterinary care, and overall well-being.
          </p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Your Gift of Support
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl">Horse / Mule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">€75</div>
                <div className="text-muted-foreground mb-4">Monthly Gift</div>
                <div className="text-xl font-semibold">€900</div>
                <div className="text-muted-foreground">Annual Gift</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl">Dog</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">€40</div>
                <div className="text-muted-foreground mb-4">Monthly Gift</div>
                <div className="text-xl font-semibold">€480</div>
                <div className="text-muted-foreground">Annual Gift</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl">Cat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">€20</div>
                <div className="text-muted-foreground mb-4">Monthly Gift</div>
                <div className="text-xl font-semibold">€240</div>
                <div className="text-muted-foreground">Annual Gift</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sponsorship Benefits */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            In Appreciation of Your Support
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getSponsorshipInfo().map((benefit, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {index === 0 && <Gift className="h-8 w-8 text-primary" />}
                    {index === 1 && <Heart className="h-8 w-8 text-primary" />}
                    {index === 2 && <Star className="h-8 w-8 text-primary" />}
                    {index === 3 && <Calendar className="h-8 w-8 text-primary" />}
                    {index === 4 && <Euro className="h-8 w-8 text-primary" />}
                  </div>
                  <p className="text-sm">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Animals Gallery */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
            Meet Our Residents
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animals.map((animal) => (
              <Card key={animal.id} className="overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  {animal.photo_url ? (
                    <img 
                      src={animal.photo_url} 
                      alt={animal.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">
                      {animal.species.toLowerCase().includes('horse') || animal.species.toLowerCase().includes('mule') ? '🐴' :
                       animal.species.toLowerCase().includes('dog') ? '🐕' :
                       animal.species.toLowerCase().includes('cat') ? '🐱' : '🐾'}
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{animal.name}</CardTitle>
                      <CardDescription>{animal.species}{animal.age && `, ${animal.age} years old`}</CardDescription>
                    </div>
                    <Badge variant="secondary">{animal.current_sponsors_count}/{animal.max_sponsors} sponsors</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {animal.story && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{animal.story}</p>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm">
                      <div className="font-semibold">{formatPrice(animal.monthly_sponsorship_cents)}/month</div>
                      <div className="text-muted-foreground">{formatPrice(animal.annual_sponsorship_cents)}/year</div>
                    </div>
                  </div>
                  <Dialog open={isDialogOpen && selectedAnimal?.id === animal.id} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        onClick={() => handleSponsorClick(animal)}
                        disabled={animal.current_sponsors_count >= animal.max_sponsors}
                      >
                        {animal.current_sponsors_count >= animal.max_sponsors ? 'Fully Supported' : 'Give Your Support'}
                      </Button>
                    </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Support {animal.name}</DialogTitle>
                          <DialogDescription>
                            Complete the form below to become a steward for {animal.name}.
                          </DialogDescription>
                        </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="sponsor_name">Your Name *</Label>
                          <Input
                            id="sponsor_name"
                            value={form.sponsor_name}
                            onChange={(e) => setForm(prev => ({ ...prev, sponsor_name: e.target.value }))}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sponsor_email">Email Address *</Label>
                          <Input
                            id="sponsor_email"
                            type="email"
                            value={form.sponsor_email}
                            onChange={(e) => setForm(prev => ({ ...prev, sponsor_email: e.target.value }))}
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sponsorship_type">Your Gift of Support</Label>
                          <div className="flex gap-2 mt-2">
                            <Button
                              variant={form.sponsorship_type === 'monthly' ? 'default' : 'outline'}
                              onClick={() => setForm(prev => ({ ...prev, sponsorship_type: 'monthly' }))}
                              className="flex-1"
                            >
                              Monthly Gift ({formatPrice(animal.monthly_sponsorship_cents)})
                            </Button>
                            <Button
                              variant={form.sponsorship_type === 'annual' ? 'default' : 'outline'}
                              onClick={() => setForm(prev => ({ ...prev, sponsorship_type: 'annual' }))}
                              className="flex-1"
                            >
                              Annual Gift ({formatPrice(animal.annual_sponsorship_cents)})
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="special_requests">Special Requests (Optional)</Label>
                          <Textarea
                            id="special_requests"
                            value={form.special_requests}
                            onChange={(e) => setForm(prev => ({ ...prev, special_requests: e.target.value }))}
                            placeholder="Any special messages or requests..."
                            rows={3}
                          />
                        </div>
                        <Button 
                          onClick={handleSubmitSponsorship} 
                          className="w-full"
                          disabled={submitting}
                        >
                          {submitting ? 'Creating Your Support...' : 'Give Your Support'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Your Gift Grows into Care, Trees, and Hope
          </h2>
          <p className="text-lg mb-8 text-muted-foreground">
            You can choose to support your animal on a monthly or annual basis. 100% of your generous gift goes directly to the food, veterinary care, enrichment, and loving environment for the animal you choose.
          </p>
          
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                Founding Steward Invitation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Support an animal before our official opening and receive exclusive "Founding Steward" recognition, including a special mention on our website and a small, handcrafted gift from the sanctuary as our thanks!
              </p>
            </CardContent>
          </Card>

          <Button 
            size="lg" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg px-8 py-4"
          >
            Step Into the Sanctuary
          </Button>
        </div>
      </section>
    </div>
  );
}