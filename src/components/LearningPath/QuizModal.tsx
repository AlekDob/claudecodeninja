import { useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quiz } from '../../types';
import { QuizQuestion } from './QuizQuestion';
import { QuizProgress } from './QuizProgress';
import { QuizResults } from './QuizResults';

interface QuizModalProps {
  quiz: Quiz;
  milestoneTitle: string;
  xpReward: number;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

type QuizStage = 'answering' | 'results';

export const QuizModal = ({
  quiz,
  milestoneTitle,
  xpReward,
  isOpen,
  onClose,
  onComplete
}: QuizModalProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(quiz.questions.length).fill(null)
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [stage, setStage] = useState<QuizStage>('answering');

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswer = selectedAnswers[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentAnswer === null) return;

    if (!showFeedback) {
      setShowFeedback(true);
    } else {
      if (isLastQuestion) {
        calculateResults();
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowFeedback(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0 && !showFeedback) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    setStage('results');
  };

  const getScore = (): number => {
    return selectedAnswers.reduce((score, answer, index) => {
      if (answer !== null && answer === quiz.questions[index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(quiz.questions.length).fill(null));
    setShowFeedback(false);
    setStage('answering');
  };

  const handleCompleteQuiz = () => {
    const score = getScore();
    const percentage = (score / totalQuestions) * 100;
    onComplete(percentage);
  };

  const score = getScore();
  const passed = (score / totalQuestions) >= 0.8;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
      >
        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border-normal)'
          }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 px-6 py-4 border-b" style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border-subtle)'
          }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Quiz: {milestoneTitle}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {stage === 'answering' && (
              <QuizProgress
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
              />
            )}
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            {stage === 'answering' && (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <QuizQuestion
                  question={currentQuestion}
                  selectedAnswer={currentAnswer}
                  onAnswerSelect={handleAnswerSelect}
                  showFeedback={showFeedback}
                />
              </motion.div>
            )}

            {stage === 'results' && (
              <QuizResults
                score={score}
                totalQuestions={totalQuestions}
                passed={passed}
                onRetry={handleRetry}
                onComplete={handleCompleteQuiz}
                xpReward={xpReward}
              />
            )}
          </div>

          {/* Footer Navigation */}
          {stage === 'answering' && (
            <div className="sticky bottom-0 px-6 py-4 border-t flex items-center justify-between" style={{
              background: 'var(--bg-primary)',
              borderColor: 'var(--border-subtle)'
            }}>
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0 || showFeedback}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors
                  ${currentQuestionIndex === 0 || showFeedback
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-white/5'}
                `}
                style={{ color: 'var(--text-secondary)' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Precedente
              </button>

              <button
                onClick={handleNext}
                disabled={currentAnswer === null}
                className={`
                  px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors
                  ${currentAnswer === null
                    ? 'opacity-40 cursor-not-allowed bg-blue-600'
                    : 'bg-blue-600 hover:bg-blue-500'}
                  text-white
                `}
              >
                {!showFeedback ? 'Conferma' : isLastQuestion ? 'Vedi Risultati' : 'Prossima'}
                {showFeedback && !isLastQuestion && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
