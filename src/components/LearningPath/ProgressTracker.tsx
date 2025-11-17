import { loadProgress, getProgressPercentage } from '../../utils/progressTracking';
import { getBadgeForXP, getNextBadge } from '../../data/badges';
import { motion } from 'motion/react';

export const ProgressTracker = () => {
  const progress = loadProgress();
  const percentage = getProgressPercentage();
  const currentBadge = getBadgeForXP(progress.totalXP);
  const nextBadge = getNextBadge(progress.totalXP);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="glass-card p-6 md:p-8"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">Il Tuo Progresso</h2>
        <p className="text-text-tertiary text-sm">
          {progress.completedMilestones.length} / 12 Milestone Completate
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-white">Progresso Totale</span>
          <span className="text-sm font-bold text-accent-cyan">{Math.round(percentage)}%</span>
        </div>
        <div className="progress-container h-3">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          />
        </div>
      </div>

      {/* XP Counter */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-tertiary mb-1">XP Totali</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">{progress.totalXP}</p>
          </div>
          {nextBadge && (
            <div className="text-right">
              <p className="text-sm text-text-tertiary mb-1">Prossimo Badge</p>
              <p className="text-3xl">{nextBadge.emoji}</p>
              <p className="text-xs text-text-tertiary">
                {nextBadge.xpRequired - progress.totalXP} XP rimanenti
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Current Badge */}
      {currentBadge && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="glass-card p-4 border-2 bg-white/5"
          style={{ borderColor: currentBadge.color }}
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">{currentBadge.emoji}</div>
            <div>
              <p className="text-sm text-text-tertiary mb-1">Badge Attuale</p>
              <p className="text-lg font-bold text-white">{currentBadge.name}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="glass-card p-4 bg-white/5">
          <p className="text-xs text-text-tertiary mb-1">Iniziato il</p>
          <p className="font-semibold text-white text-sm">
            {progress.startedAt.toLocaleDateString('it-IT')}
          </p>
        </div>
        <div className="glass-card p-4 bg-white/5">
          <p className="text-xs text-text-tertiary mb-1">Ultima attività</p>
          <p className="font-semibold text-white text-sm">
            {progress.lastActivity.toLocaleDateString('it-IT')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
