import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, RotateCcw, Heart, Mail, CheckCircle } from "lucide-react";
import { type PersonalityProfile } from "./quizData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackQuizEvent } from "@/lib/quizAnalytics";
import QuizShareCard from "./QuizShareCard";

interface QuizResultProps {
  profile: PersonalityProfile;
  onRestart: () => void;
}

interface AnimalData {
  id: string;
  name: string;
  photo_url: string | null;
  species: string;
  story: string | null;
  monthly_sponsorship_cents: number | null;
}

const SOCIAL_LINKS = [
  { label: "Instagram", icon: "📸", url: "https://www.instagram.com/solareinas_ranch_rescue/" },
  { label: "Facebook", icon: "📘", url: "https://www.facebook.com/profile.php?id=61576548498498" },
  { label: "LinkedIn", icon: "💼", url: "https://www.linkedin.com/company/solareinas-ranch-rescue/" },
];

const QuizResult = ({ profile, onRestart }: QuizResultProps) => {
  const [animal, setAnimal] = useState<AnimalData | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    trackQuizEvent("quiz_result_viewed", {
      quiz_name: "sanctuary_retreat_quiz",
      final_result: profile.id,
    });
  }, [profile.id]);

  useEffect(() => {
    const fetchAnimal = async () => {
      const { data } = await supabase
        .from("animals")
        .select("id, name, photo_url, species, story, monthly_sponsorship_cents")
        .ilike("name", profile.animalMatch)
        .limit(1)
        .maybeSingle();
      if (data) setAnimal(data);
    };
    fetchAnimal();
  }, [profile.animalMatch]);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setSubscribing(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: email.trim(),
      name: name.trim() || null,
      source: "quiz",
    });
    setSubscribing(false);
    if (error && error.code === "23505") {
      setSubscribed(true);
      toast({ title: "You're already on the list — welcome back!" });
    } else if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      setSubscribed(true);
      trackQuizEvent("quiz_newsletter_signup", { quiz_name: "sanctuary_retreat_quiz", final_result: profile.id });
      toast({ title: "You're in! Watch your inbox for updates from the ranch." });
    }
  };

  const formatCurrency = (cents: number | null) => {
    if (!cents) return null;
    return `€${(cents / 100).toFixed(0)}`;
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.15em] text-muted-foreground">
            Your Trail Type is…
          </p>
          <div className="text-5xl">{profile.emoji}</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            {profile.name}
          </h1>
          <p className="text-lg text-muted-foreground italic">{profile.tagline}</p>
        </div>

        {/* Description */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-6 space-y-4">
            <p className="text-foreground leading-relaxed">{profile.description}</p>
            <div className="flex flex-wrap gap-2">
              {profile.traits.map((trait) => (
                <Badge key={trait} variant="secondary" className="text-sm">
                  {trait}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Animal match + sponsor CTA */}
        {animal && (
          <Card className="border-none shadow-lg overflow-hidden">
            <div className="sm:flex">
              {animal.photo_url && (
                <div className="sm:w-1/3 h-48 sm:h-auto">
                  <img
                    src={animal.photo_url}
                    alt={animal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-6 sm:w-2/3 space-y-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Your Animal Match
                </p>
                <h3 className="text-2xl font-semibold text-foreground">
                  {animal.name} the {animal.species}
                </h3>
                {animal.story && (
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {animal.story}
                  </p>
                )}
                <div className="pt-2 space-y-2">
                  <p className="text-sm text-foreground font-medium">
                    <Heart className="h-4 w-4 inline mr-1 text-primary" />
                    Become {animal.name}'s steward
                    {animal.monthly_sponsorship_cents && (
                      <span className="text-muted-foreground font-normal">
                        {" "}— from {formatCurrency(animal.monthly_sponsorship_cents)}/month
                      </span>
                    )}
                  </p>
                  <Button
                    variant="steward"
                    size="sm"
                    onClick={() => {
                      trackQuizEvent("quiz_sponsorship_cta_clicked", {
                        quiz_name: "sanctuary_retreat_quiz",
                        animal_name: animal.name,
                        final_result: profile.id,
                      });
                      window.open(`/sponsor/${animal.id}`, "_blank");
                    }}
                  >
                    Support {animal.name} <Heart className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Retreat recommendation */}
        <Card className="border-none shadow-lg bg-primary/5">
          <CardContent className="p-6 space-y-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Your Retreat Experience
            </p>
            <p className="text-foreground leading-relaxed">
              {profile.retreatRecommendation}
            </p>
            <Button
              variant="steward"
              size="sm"
              onClick={() => window.open("/", "_blank")}
            >
              Explore the Retreat <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Newsletter signup */}
        <Card className="border-none shadow-lg bg-secondary/30">
          <CardContent className="p-6 space-y-4 text-center">
            <Mail className="h-8 w-8 mx-auto text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              Stay Connected with the Herd
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Get occasional updates from the ranch — rescue stories, retreat news, and moments from the land. We respect your inbox and will never share your email.
            </p>
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-primary font-medium">
                <CheckCircle className="h-5 w-5" />
                You're on the list!
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                <Input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background"
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background"
                />
                <Button
                  variant="steward"
                  onClick={handleSubscribe}
                  disabled={subscribing}
                  className="whitespace-nowrap"
                >
                  {subscribing ? "Joining…" : "Join"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Social follow */}
        <div className="text-center space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Follow Our Journey
          </h3>
          <p className="text-sm text-muted-foreground">
            See daily life at the ranch — rescues, rides, and sunsets over the Sierra Nevada.
          </p>
          <div className="flex justify-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-card hover:bg-secondary/40 transition-colors"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-sm font-medium text-foreground">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Shareable card */}
        <div className="space-y-4">
          <h3 className="text-center text-lg font-medium text-foreground">
            Share Your Trail Type
          </h3>
          <QuizShareCard profile={profile} animalPhoto={animal?.photo_url} />
        </div>

        {/* Restart */}
        <div className="text-center pt-4">
          <Button variant="ghost" onClick={onRestart}>
            <RotateCcw className="h-4 w-4 mr-2" /> Take the quiz again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
