import { Button } from "@/components/ui/button";
import srrLogo from "@/assets/srr-logo-transparent.png";
import { trackQuizEvent } from "@/lib/quizAnalytics";

interface QuizIntroProps {
  onStart: () => void;
}

const QuizIntro = ({ onStart }: QuizIntroProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-md w-full text-center space-y-8">
        <img src={srrLogo} alt="Solareinas Ranch" className="h-16 w-auto mx-auto opacity-80" />
        
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">
            Solareinas Ranch Rescue
          </p>
          <h1 className="text-4xl sm:text-5xl font-light text-foreground leading-tight">
            Discover Your <br />
            <span className="font-semibold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              Trail Type
            </span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
            Answer 10 quick questions and we'll match you to your travel personality, a sanctuary animal, and your ideal retreat experience.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
          {["🌿 Personality type", "🐾 Animal match", "⛺ Retreat pick"].map((item) => (
            <span key={item} className="bg-secondary/60 px-3 py-1.5 rounded-full">
              {item}
            </span>
          ))}
        </div>

        <Button
          variant="steward"
          size="lg"
          className="text-lg px-10 py-6"
          onClick={() => {
            trackQuizEvent("quiz_started", { quiz_name: "sanctuary_retreat_quiz" });
            onStart();
          }}
        >
          Start the Quiz
        </Button>

        <p className="text-xs text-muted-foreground/60">
          Takes about 60 seconds · No sign-up required
        </p>
      </div>
    </div>
  );
};

export default QuizIntro;
