import { Progress } from "@/components/ui/progress";

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress = ({ current, total }: QuizProgressProps) => {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Question {current} of {total}</span>
        <span>{percent}%</span>
      </div>
      <Progress value={percent} className="h-2" />
    </div>
  );
};

export default QuizProgress;
