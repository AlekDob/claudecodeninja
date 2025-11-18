import { loadProgress, getProgressPercentage } from '../../utils/progressTracking';
import { getBadgeForXP, getNextBadge } from '../../data/badges';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

export const ProgressTracker = () => {
  const { theme } = useTheme();
  const progress = loadProgress();
  const percentage = getProgressPercentage();
  const currentBadge = getBadgeForXP(progress.totalXP);
  const nextBadge = getNextBadge(progress.totalXP);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="backdrop-blur-sm border rounded-lg p-6 md:p-8"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)',
        borderColor: 'var(--border-color)'
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Il Tuo Progresso</h2>
        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {progress.completedMilestones.length} / 12 Milestone Completate
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Progresso Totale</span>
          <span className="text-sm font-bold text-cyan-400">{Math.round(percentage)}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #FF6B35 0%, #F7931E 100%)'
            }}
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
            <p className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>XP Totali</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">{progress.totalXP}</p>
          </div>
          {nextBadge && (
            <div className="text-right">
              <p className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>Prossimo Badge</p>
              <p className="text-3xl">{nextBadge.emoji}</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
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
          className="backdrop-blur-sm border-2 rounded-lg p-4"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)',
            borderColor: currentBadge.color
          }}
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">{currentBadge.emoji}</div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--text-tertiary)' }}>Badge Attuale</p>
              <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{currentBadge.name}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div
          className="backdrop-blur-sm border rounded-lg p-4"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)',
            borderColor: 'var(--border-color)'
          }}
        >
          <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Iniziato il</p>
          <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {progress.startedAt.toLocaleDateString('it-IT')}
          </p>
        </div>
        <div
          className="backdrop-blur-sm border rounded-lg p-4"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)',
            borderColor: 'var(--border-color)'
          }}
        >
          <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>Ultima attività</p>
          <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {progress.lastActivity.toLocaleDateString('it-IT')}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
