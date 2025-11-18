import { QuizQuestion as QuizQuestionType } from '../../types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  showFeedback: boolean;
}

export const QuizQuestion = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  showFeedback
}: QuizQuestionProps) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="space-y-6">
      {/* Question Text */}
      <div className="mb-8">
        <h3
          className="text-xl font-semibold leading-relaxed"
          style={{ color: 'var(--text-primary)' }}
        >
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectAnswer = index === question.correctAnswer;
          const showCorrect = showFeedback && isCorrectAnswer;
          const showWrong = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => !showFeedback && onAnswerSelect(index)}
              disabled={showFeedback}
              className={`
                w-full text-left p-4 rounded-lg border transition-all
                ${!showFeedback && 'hover:border-blue-500/50 cursor-pointer'}
                ${isSelected && !showFeedback && 'border-blue-500 bg-blue-500/10'}
                ${showCorrect && 'border-emerald-500 bg-emerald-500/10'}
                ${showWrong && 'border-red-500 bg-red-500/10'}
                ${!isSelected && !showFeedback && 'border-white/10'}
                ${showFeedback && 'cursor-not-allowed'}
              `}
              style={{
                color: showCorrect
                  ? '#10b981'
                  : showWrong
                  ? '#ef4444'
                  : isSelected
                  ? 'var(--text-primary)'
                  : 'var(--text-secondary)'
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex-1">{option}</span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                {showWrong && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation (shown after feedback) */}
      {showFeedback && (
        <div
          className={`
            p-4 rounded-lg border-l-4
            ${isCorrect ? 'border-emerald-500 bg-emerald-500/5' : 'border-amber-500 bg-amber-500/5'}
          `}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: isCorrect ? '#10b981' : '#f59e0b' }}
          >
            <strong>{isCorrect ? '✅ Corretto!' : '💡 Suggerimento:'}</strong>
            {' '}
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};
