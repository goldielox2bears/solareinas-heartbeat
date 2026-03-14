import { useRef } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { type PersonalityProfile } from "./quizData";
import { trackQuizEvent } from "@/lib/quizAnalytics";
import srrLogo from "@/assets/srr-logo-transparent.png";

interface QuizShareCardProps {
  profile: PersonalityProfile;
  animalPhoto?: string | null;
}

const QuizShareCard = ({ profile, animalPhoto }: QuizShareCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#1a1a1a",
      });
      const link = document.createElement("a");
      link.download = `my-trail-type-${profile.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: "#1a1a1a" });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `trail-type-${profile.id}.png`, { type: "image/png" });
      if (navigator.share) {
        await navigator.share({
          title: `I'm ${profile.name}!`,
          text: profile.tagline,
          files: [file],
        });
      }
    } catch {
      handleDownload();
    }
  };

  return (
    <div className="space-y-4">
      {/* The card to render */}
      <div
        ref={cardRef}
        className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden"
        style={{ aspectRatio: "4/5" }}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${profile.color}`} />

        {/* Animal photo overlay */}
        {animalPhoto && (
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url(${animalPhoto})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
          <div className="flex items-center gap-2 opacity-70">
            <img src={srrLogo} alt="" className="h-6 w-auto brightness-0 invert" />
            <span className="text-xs font-medium tracking-wider uppercase">
              Solareinas Ranch
            </span>
          </div>

          <div className="space-y-3">
            <span className="text-5xl">{profile.emoji}</span>
            <h3 className="text-3xl font-bold leading-tight">{profile.name}</h3>
            <p className="text-sm opacity-80 leading-relaxed">{profile.tagline}</p>
            <div className="flex flex-wrap gap-2 pt-2">
              {profile.traits.map((trait) => (
                <span
                  key={trait}
                  className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[10px] opacity-50 text-center">
            solareinas-heartbeat.lovable.app/quiz
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-center">
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-1" /> Download
        </Button>
        {typeof navigator !== "undefined" && "share" in navigator && (
          <Button variant="steward" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizShareCard;
