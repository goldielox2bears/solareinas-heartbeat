import { useState } from "react";
import { type QuizQuestion as QuizQuestionType } from "./quizData";
import { trackQuizEvent } from "@/lib/quizAnalytics";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (optionIndex: number) => void;
}

const QuizQuestion = ({ question, onAnswer }: QuizQuestionProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState<number>(2);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (index: number) => {
    setSelected(index);
    trackQuizEvent("quiz_question_answered", {
      quiz_name: "sanctuary_retreat_quiz",
      question_id: question.id,
      answer_id: index,
      question_index: index + 1,
    });
    setTimeout(() => {
      onAnswer(index);
      setSelected(null);
    }, 400);
  };

  const handleSliderConfirm = () => {
    setConfirmed(true);
    trackQuizEvent("quiz_question_answered", {
      quiz_name: "sanctuary_retreat_quiz",
      question_id: question.id,
      answer_id: sliderValue,
      question_index: sliderValue + 1,
    });
    setTimeout(() => {
      onAnswer(sliderValue);
      setSliderValue(2);
      setConfirmed(false);
    }, 400);
  };

  const isSlider = question.type === "slider" && question.sliderStops;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-light text-foreground leading-snug">
            {question.text}
          </h2>
          {question.subtitle && (
            <p className="text-sm text-muted-foreground">{question.subtitle}</p>
          )}
        </div>

        {isSlider ? (
          <div className="space-y-8 pt-4">
            {/* Current selection display */}
            <div className="flex flex-col items-center gap-2 min-h-[80px] transition-all duration-300">
              <span className="text-4xl">{question.sliderStops![sliderValue].emoji}</span>
              <p className="text-foreground font-medium text-lg px-4">
                {question.sliderStops![sliderValue].label}
              </p>
            </div>

            {/* Slider */}
            <div className="px-2">
              <Slider
                value={[sliderValue]}
                onValueChange={(val) => setSliderValue(val[0])}
                min={0}
                max={question.sliderStops!.length - 1}
                step={1}
                className="w-full"
              />
              {/* End labels */}
              <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                <span>{question.sliderStops![0].emoji} {question.sliderStops![0].label.split("—")[0].trim()}</span>
                <span>{question.sliderStops![question.sliderStops!.length - 1].label.split("—")[0].trim()} {question.sliderStops![question.sliderStops!.length - 1].emoji}</span>
              </div>
            </div>

            {/* Confirm button */}
            <Button
              onClick={handleSliderConfirm}
              variant="default"
              size="lg"
              disabled={confirmed}
              className="mt-4"
            >
              {confirmed ? "Saved ✓" : "That's me"}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`
                  flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300
                  ${
                    selected === index
                      ? "border-primary bg-primary/10 scale-[1.02] shadow-md"
                      : "border-border bg-card hover:border-primary/40 hover:bg-secondary/30"
                  }
                `}
              >
                {option.imageIcon ? (
                  <img src={option.imageIcon} alt="" className="w-7 h-7 flex-shrink-0 object-contain" />
                ) : (
                  <span className="text-2xl flex-shrink-0">{option.icon}</span>
                )}
                <span className="text-foreground font-medium">{option.text}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
