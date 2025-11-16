import { loadProgress, getProgressPercentage } from '../../utils/progressTracking';
import { getBadgeForXP, getNextBadge } from '../../data/badges';
import { motion } from 'framer-motion';

export const ProgressTracker = () => {
  const progress = loadProgress();
  const percentage = getProgressPercentage();
  const currentBadge = getBadgeForXP(progress.totalXP);
  const nextBadge = getNextBadge(progress.totalXP);

  return (
    <div className="glass-card p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Il Tuo Progresso</h2>
        <p className="text-light/70">
          {progress.completedMilestones.length} / 12 Milestone Completate
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progresso Totale</span>
          <span className="text-sm font-medium">{Math.round(percentage)}%</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* XP Counter */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-light/70 mb-1">XP Totali</p>
            <p className="text-3xl font-bold text-accent">{progress.totalXP}</p>
          </div>
          {nextBadge && (
            <div className="text-right">
              <p className="text-sm text-light/70 mb-1">Prossimo Badge</p>
              <p className="text-2xl">{nextBadge.emoji}</p>
              <p className="text-xs text-light/50">
                {nextBadge.xpRequired - progress.totalXP} XP rimanenti
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Current Badge */}
      {currentBadge && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-4 border-2"
          style={{ borderColor: currentBadge.color }}
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">{currentBadge.emoji}</div>
            <div>
              <p className="text-sm text-light/70">Badge Attuale</p>
              <p className="text-lg font-bold">{currentBadge.name}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="glass-card p-4">
          <p className="text-sm text-light/70 mb-1">Iniziato il</p>
          <p className="font-medium">
            {progress.startedAt.toLocaleDateString('it-IT')}
          </p>
        </div>
        <div className="glass-card p-4">
          <p className="text-sm text-light/70 mb-1">Ultima attività</p>
          <p className="font-medium">
            {progress.lastActivity.toLocaleDateString('it-IT')}
          </p>
        </div>
      </div>
    </div>
  );
};
