import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, RotateCcw } from "lucide-react";
import { type PersonalityProfile } from "./quizData";
import { supabase } from "@/integrations/supabase/client";
import QuizShareCard from "./QuizShareCard";

interface QuizResultProps {
  profile: PersonalityProfile;
  onRestart: () => void;
}

interface AnimalData {
  name: string;
  photo_url: string | null;
  species: string;
  story: string | null;
}

const QuizResult = ({ profile, onRestart }: QuizResultProps) => {
  const [animal, setAnimal] = useState<AnimalData | null>(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      const { data } = await supabase
        .from("animals")
        .select("name, photo_url, species, story")
        .ilike("name", profile.animalMatch)
        .limit(1)
        .maybeSingle();
      if (data) setAnimal(data);
    };
    fetchAnimal();
  }, [profile.animalMatch]);

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

        {/* Animal match */}
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
              <CardContent className="p-6 sm:w-2/3 space-y-2">
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
