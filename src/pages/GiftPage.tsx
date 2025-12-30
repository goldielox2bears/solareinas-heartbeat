import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SanctuaryNavigation from "@/components/SanctuaryNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, ArrowLeft, Check } from "lucide-react";

interface Animal {
  id: string;
  name: string;
  species: string;
  photo_url: string | null;
  monthly_sponsorship_cents: number | null;
  annual_sponsorship_cents: number | null;
}

interface Project {
  name: string;
  cost: number;
  icon: string;
}

const upcomingProjects: Project[] = [
  { name: "Free Herd Volunteer Cabin", cost: 9600, icon: "🏠" },
  { name: "Fencing", cost: 4000, icon: "🚧" },
  { name: "Shade Areas for Horses", cost: 1800, icon: "☀️" },
  { name: "Feed Storage", cost: 1600, icon: "🌾" },
  { name: "Animal Cleaning", cost: 400, icon: "🧹" },
  { name: "Carrots and Pumpkin Garden", cost: 350, icon: "🥕" }
];

const GiftPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<"project" | "animal" | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [giftForm, setGiftForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    fetchAnimals();
    
    // Check URL params for pre-selection
    const projectName = searchParams.get("project");
    const animalId = searchParams.get("animal");
    
    if (projectName) {
      const project = upcomingProjects.find(p => p.name === projectName);
      if (project) {
        setSelectedType("project");
        setSelectedProject(project);
      }
    } else if (animalId) {
      setSelectedType("animal");
    }
  }, [searchParams]);

  useEffect(() => {
    const animalId = searchParams.get("animal");
    if (animalId && animals.length > 0) {
      const animal = animals.find(a => a.id === animalId);
      if (animal) {
        setSelectedAnimal(animal);
      }
    }
  }, [animals, searchParams]);

  const fetchAnimals = async () => {
    try {
      const { data, error } = await supabase
        .from("animals")
        .select("id, name, species, photo_url, monthly_sponsorship_cents, annual_sponsorship_cents")
        .eq("available_for_sponsorship", true)
        .order("name");
      
      if (error) throw error;
      setAnimals(data || []);
    } catch (error) {
      console.error("Error fetching animals:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (cents: number) => `€${(cents / 100).toFixed(0)}`;

  const getSelectedAmount = () => {
    if (customAmount) return customAmount;
    if (selectedProject) return selectedProject.cost;
    if (selectedAnimal && selectedAnimal.monthly_sponsorship_cents) {
      return selectedAnimal.monthly_sponsorship_cents / 100;
    }
    return 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!giftForm.name || !giftForm.email) {
      toast({
        title: "Please complete the form",
        description: "Name and email are required.",
        variant: "destructive"
      });
      return;
    }

    const amount = getSelectedAmount();
    if (amount <= 0) {
      toast({
        title: "Please select a gift",
        description: "Choose a project or animal to support.",
        variant: "destructive"
      });
      return;
    }

    // For now, show success message - payment integration would go here
    toast({
      title: "Thank you for your generosity!",
      description: `Your gift of €${amount} will make a real difference. We'll be in touch soon.`,
    });

    // Reset form
    setGiftForm({ name: "", email: "", message: "" });
    setSelectedProject(null);
    setSelectedAnimal(null);
    setCustomAmount(null);
    setSelectedType(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <SanctuaryNavigation />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sanctuary
            </Button>
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Give a Gift
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your generosity becomes trees, care, and safe ground for those who need it most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Selection Column */}
            <div className="space-y-6">
              {/* Project Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    🏗️ Support a Project
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingProjects.map((project) => (
                    <button
                      key={project.name}
                      onClick={() => {
                        setSelectedType("project");
                        setSelectedProject(project);
                        setSelectedAnimal(null);
                        setCustomAmount(null);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        selectedProject?.name === project.name
                          ? "bg-primary/10 border-2 border-primary"
                          : "bg-card hover:bg-accent/50 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{project.icon}</span>
                        <span className="font-medium text-foreground text-left">{project.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-semibold">€{project.cost.toLocaleString()}</span>
                        {selectedProject?.name === project.name && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Animal Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    🐴 Support an Animal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p className="text-muted-foreground text-center py-4">Loading residents...</p>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {animals.map((animal) => (
                        <button
                          key={animal.id}
                          onClick={() => {
                            setSelectedType("animal");
                            setSelectedAnimal(animal);
                            setSelectedProject(null);
                            setCustomAmount(null);
                          }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                            selectedAnimal?.id === animal.id
                              ? "bg-primary/10 border-2 border-primary"
                              : "bg-card hover:bg-accent/50 border-2 border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {animal.photo_url ? (
                              <img 
                                src={animal.photo_url} 
                                alt={animal.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Heart className="w-5 h-5 text-primary" />
                              </div>
                            )}
                            <div className="text-left">
                              <span className="font-medium text-foreground block">{animal.name}</span>
                              <span className="text-sm text-muted-foreground">{animal.species}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-primary font-semibold text-sm">
                              {animal.monthly_sponsorship_cents 
                                ? `${formatPrice(animal.monthly_sponsorship_cents)}/mo`
                                : "Gift any amount"
                              }
                            </span>
                            {selectedAnimal?.id === animal.id && (
                              <Check className="w-5 h-5 text-primary" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Custom Amount */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    💝 Custom Gift Amount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">€</span>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount || ""}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setCustomAmount(value > 0 ? value : null);
                        if (value > 0) {
                          setSelectedProject(null);
                          setSelectedAnimal(null);
                          setSelectedType(null);
                        }
                      }}
                      className="flex-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form Column */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Complete Your Gift
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Summary */}
                    <div className="p-4 bg-primary/5 rounded-xl mb-6">
                      <p className="text-sm text-muted-foreground mb-1">Your Gift</p>
                      <p className="text-2xl font-light text-primary">
                        €{getSelectedAmount().toLocaleString()}
                      </p>
                      {selectedProject && (
                        <p className="text-sm text-foreground mt-1">
                          {selectedProject.icon} {selectedProject.name}
                        </p>
                      )}
                      {selectedAnimal && (
                        <p className="text-sm text-foreground mt-1">
                          Supporting {selectedAnimal.name} the {selectedAnimal.species}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        value={giftForm.name}
                        onChange={(e) => setGiftForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={giftForm.email}
                        onChange={(e) => setGiftForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Personal Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={giftForm.message}
                        onChange={(e) => setGiftForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Share why this gift matters to you..."
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="steward"
                      className="w-full mt-6"
                      disabled={getSelectedAmount() <= 0}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Give €{getSelectedAmount().toLocaleString()}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Your generosity transforms lives. Thank you for being part of our sanctuary family.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftPage;
