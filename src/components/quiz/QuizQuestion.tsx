import { useState } from "react";
import { type QuizQuestion as QuizQuestionType } from "./quizData";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (optionIndex: number) => void;
}

const QuizQuestion = ({ question, onAnswer }: QuizQuestionProps) => {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    setTimeout(() => {
      onAnswer(index);
      setSelected(null);
    }, 400);
  };

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
              <span className="text-2xl flex-shrink-0">{option.icon}</span>
              <span className="text-foreground font-medium">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
