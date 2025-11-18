import { Trophy, RotateCcw, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  passed: boolean;
  onRetry: () => void;
  onComplete: () => void;
  xpReward: number;
}

export const QuizResults = ({
  score,
  totalQuestions,
  passed,
  onRetry,
  onComplete,
  xpReward
}: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 py-8"
    >
      {/* Icon */}
      <div className="flex justify-center">
        {passed ? (
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-emerald-500" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center">
            <RotateCcw className="w-12 h-12 text-amber-500" />
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <h2
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {passed ? 'Quiz Superato! 🎉' : 'Quasi fatto! 💪'}
        </h2>
        <p
          className="text-lg"
          style={{ color: 'var(--text-secondary)' }}
        >
          {passed
            ? 'Ottimo lavoro! Hai dimostrato di padroneggiare gli argomenti.'
            : 'Riprova ancora, ce la puoi fare!'}
        </p>
      </div>

      {/* Score Display */}
      <div className="inline-flex flex-col items-center gap-3 px-8 py-6 rounded-xl bg-white/5 border border-white/10">
        <div className="text-5xl font-bold" style={{ color: passed ? '#10b981' : '#f59e0b' }}>
          {percentage}%
        </div>
        <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {score} corrette
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1">
            <XCircle className="w-4 h-4 text-red-500" />
            {totalQuestions - score} sbagliate
          </span>
        </div>
      </div>

      {/* Message */}
      <div
        className={`
          p-4 rounded-lg border-l-4
          ${passed ? 'border-emerald-500 bg-emerald-500/5' : 'border-amber-500 bg-amber-500/5'}
        `}
      >
        <p className="text-sm" style={{ color: passed ? '#10b981' : '#f59e0b' }}>
          {passed
            ? `Hai superato la soglia minima dell'80%! Guadagni ${xpReward} XP e puoi procedere al prossimo milestone.`
            : `Ti serve almeno l'80% (${Math.ceil(totalQuestions * 0.8)} risposte corrette) per procedere. Rileggi il contenuto e riprova!`}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center pt-4">
        {!passed && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
            style={{ color: 'var(--text-primary)' }}
          >
            <RotateCcw className="w-4 h-4" />
            Riprova Quiz
          </button>
        )}
        {passed && (
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            Completa Milestone (+{xpReward} XP)
          </button>
        )}
      </div>
    </motion.div>
  );
};
