interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export const QuizProgress = ({ currentQuestion, totalQuestions }: QuizProgressProps) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="space-y-2">
      {/* Counter */}
      <div className="flex items-center justify-between text-sm">
        <span style={{ color: 'var(--text-secondary)' }}>
          Domanda {currentQuestion} di {totalQuestions}
        </span>
        <span
          className="font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {Math.round(progressPercentage)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};
