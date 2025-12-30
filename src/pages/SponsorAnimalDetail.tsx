import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import SanctuaryNavigation from '@/components/SanctuaryNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, Star, Gift, Calendar, Euro, ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

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

const sponsorshipSchema = z.object({
  sponsor_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  sponsor_email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  special_requests: z.string().max(500, "Special requests must be less than 500 characters").optional()
});

export default function SponsorAnimalDetail() {
  const { animalId } = useParams<{ animalId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [sponsorshipType, setSponsorshipType] = useState<'monthly' | 'one-time'>('monthly');
  const [form, setForm] = useState({
    sponsor_name: '',
    sponsor_email: '',
    special_requests: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (animalId) {
      fetchAnimal();
    }
  }, [animalId]);

  const fetchAnimal = async () => {
    try {
      const { data, error } = await supabase
        .from('animals')
        .select('*')
        .eq('id', animalId)
        .single();

      if (error) throw error;
      setAnimal(data);
    } catch (error) {
      console.error('Error fetching animal:', error);
      toast({
        title: "Animal not found",
        description: "We couldn't find this animal. Returning to the sanctuary.",
        variant: "destructive"
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (cents: number) => {
    return `€${(cents / 100).toFixed(0)}`;
  };

  const validateForm = () => {
    try {
      sponsorshipSchema.parse(form);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmitSponsorship = async () => {
    if (!animal) return;
    
    if (!validateForm()) {
      toast({
        title: "Please check the form",
        description: "There are some issues with your information.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      const amount_cents = sponsorshipType === 'monthly' 
        ? animal.monthly_sponsorship_cents 
        : animal.annual_sponsorship_cents;

      const { error } = await supabase
        .from('sponsorships')
        .insert({
          animal_id: animal.id,
          sponsor_name: form.sponsor_name.trim(),
          sponsor_email: form.sponsor_email.trim(),
          sponsorship_type: sponsorshipType === 'monthly' ? 'monthly' : 'one-time',
          amount_cents,
          special_requests: form.special_requests?.trim() || null,
          founding_guardian: true
        });

      if (error) throw error;

      toast({
        title: "Thank you for your support!",
        description: `You are now a steward for ${animal.name}. You'll receive a confirmation email soon.`,
      });

      navigate('/');
    } catch (error) {
      console.error('Error creating sponsorship:', error);
      toast({
        title: "Something went wrong",
        description: "We couldn't process your support. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getSponsorshipBenefits = () => [
    "A personalized adoption certificate featuring your animal's story",
    "Twice-yearly updates with photos and videos",
    "A hand-signed 'thank you' from your animal",
    "Recognition on our sponsor wall",
    "Priority invitation to visit the sanctuary"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SanctuaryNavigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!animal) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SanctuaryNavigation />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sanctuary
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Animal Info Card */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                {animal.photo_url ? (
                  <img 
                    src={animal.photo_url} 
                    alt={animal.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-8xl">
                    {animal.species.toLowerCase().includes('horse') || animal.species.toLowerCase().includes('mule') ? '🐴' :
                     animal.species.toLowerCase().includes('dog') ? '🐕' :
                     animal.species.toLowerCase().includes('cat') ? '🐱' :
                     animal.species.toLowerCase().includes('pig') ? '🐷' :
                     animal.species.toLowerCase().includes('goat') ? '🐐' :
                     animal.species.toLowerCase().includes('sheep') ? '🐑' : '🐾'}
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-3xl">{animal.name}</CardTitle>
                <CardDescription className="text-lg">
                  {animal.species}{animal.age && ` • ${animal.age} years old`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {animal.story && (
                  <p className="text-muted-foreground leading-relaxed">{animal.story}</p>
                )}
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Gift className="w-5 h-5 text-primary" />
                  In Appreciation of Your Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {getSponsorshipBenefits().map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sponsorship Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Become {animal.name}'s Steward</CardTitle>
                <CardDescription>
                  Your generous gift directly supports {animal.name}'s daily needs, veterinary care, and well-being.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sponsorship Type Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Choose Your Gift</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSponsorshipType('monthly')}
                      className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                        sponsorshipType === 'monthly' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {sponsorshipType === 'monthly' && (
                        <div className="absolute top-2 right-2">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-medium">Monthly</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(animal.monthly_sponsorship_cents)}
                      </div>
                      <div className="text-xs text-muted-foreground">per month</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSponsorshipType('one-time')}
                      className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                        sponsorshipType === 'one-time' 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {sponsorshipType === 'one-time' && (
                        <div className="absolute top-2 right-2">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-primary" />
                        <span className="font-medium">One-Time</span>
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(animal.annual_sponsorship_cents)}
                      </div>
                      <div className="text-xs text-muted-foreground">annual gift</div>
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sponsor_name">Your Name *</Label>
                    <Input
                      id="sponsor_name"
                      value={form.sponsor_name}
                      onChange={(e) => setForm(prev => ({ ...prev, sponsor_name: e.target.value }))}
                      placeholder="Enter your full name"
                      className={errors.sponsor_name ? 'border-destructive' : ''}
                    />
                    {errors.sponsor_name && (
                      <p className="text-sm text-destructive mt-1">{errors.sponsor_name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="sponsor_email">Email Address *</Label>
                    <Input
                      id="sponsor_email"
                      type="email"
                      value={form.sponsor_email}
                      onChange={(e) => setForm(prev => ({ ...prev, sponsor_email: e.target.value }))}
                      placeholder="Enter your email"
                      className={errors.sponsor_email ? 'border-destructive' : ''}
                    />
                    {errors.sponsor_email && (
                      <p className="text-sm text-destructive mt-1">{errors.sponsor_email}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="special_requests">Special Message (Optional)</Label>
                    <Textarea
                      id="special_requests"
                      value={form.special_requests}
                      onChange={(e) => setForm(prev => ({ ...prev, special_requests: e.target.value }))}
                      placeholder="Any message for the sanctuary team..."
                      rows={3}
                      className={errors.special_requests ? 'border-destructive' : ''}
                    />
                    {errors.special_requests && (
                      <p className="text-sm text-destructive mt-1">{errors.special_requests}</p>
                    )}
                  </div>
                </div>

                {/* Founding Steward Badge */}
                <div className="bg-primary/5 rounded-lg p-4 flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Founding Steward</p>
                    <p className="text-xs text-muted-foreground">
                      As an early supporter, you'll receive exclusive Founding Steward recognition and a handcrafted thank-you gift.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleSubmitSponsorship} 
                  className="w-full"
                  size="lg"
                  disabled={submitting || !animal.available_for_sponsorship || animal.current_sponsors_count >= animal.max_sponsors}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      Give Your Support — {formatPrice(sponsorshipType === 'monthly' ? animal.monthly_sponsorship_cents : animal.annual_sponsorship_cents)}
                      {sponsorshipType === 'monthly' && '/month'}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  100% of your generous gift goes directly to the care and well-being of {animal.name}.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}