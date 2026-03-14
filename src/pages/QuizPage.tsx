import { useState } from "react";
import QuizIntro from "@/components/quiz/QuizIntro";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizResult from "@/components/quiz/QuizResult";
import { questions, calculateResult, type PersonalityProfile, type QuizResult as QuizResultType } from "@/components/quiz/quizData";
import { trackQuizEvent } from "@/lib/quizAnalytics";

type QuizStage = "intro" | "questions" | "result";

const QuizPage = () => {
  const [stage, setStage] = useState<QuizStage>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QuizResultType | null>(null);

  const handleStart = () => {
    setStage("questions");
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (optionIndex: number) => {
    const question = questions[currentQuestion];
    const newAnswers = { ...answers, [question.id]: optionIndex };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const profile = calculateResult(newAnswers);
      setResult(profile);
      trackQuizEvent("quiz_completed", {
        quiz_name: "sanctuary_retreat_quiz",
        total_questions: Object.keys(newAnswers).length,
        final_result: profile.id,
      });
      setStage("result");
    }
  };

  const handleRestart = () => {
    setStage("intro");
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {stage === "intro" && <QuizIntro onStart={handleStart} />}

      {stage === "questions" && (
        <div>
          <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm px-6 pt-6 pb-4">
            <QuizProgress current={currentQuestion + 1} total={questions.length} />
          </div>
          <QuizQuestion
            key={questions[currentQuestion].id}
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
          />
        </div>
      )}

      {stage === "result" && result && (
        <QuizResult profile={result} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default QuizPage;
