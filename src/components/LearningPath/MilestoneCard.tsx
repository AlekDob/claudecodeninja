import { Milestone } from '../../types';
import { getMilestoneStatus } from '../../utils/progressTracking';
import { Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

interface MilestoneCardProps {
  milestone: Milestone;
  onClick?: () => void;
}

export const MilestoneCard = ({ milestone, onClick }: MilestoneCardProps) => {
  const { theme } = useTheme();
  const status = getMilestoneStatus(milestone.id);

  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';

  const getStatusIcon = () => {
    if (isLocked) return <Lock className="w-6 h-6" />;
    if (isCompleted) return <CheckCircle2 className="w-6 h-6 text-success" />;
    return <PlayCircle className="w-6 h-6 text-primary" />;
  };

  const getBorderColor = () => {
    if (isCompleted) return 'border-emerald-500/30';
    if (isInProgress) return 'border-amber-500/30';
    if (isLocked) return 'border-white/5';
    return 'border-white/10';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isLocked ? { scale: 1.01 } : {}}
      whileTap={!isLocked ? { scale: 0.99 } : {}}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={`backdrop-blur-sm border ${getBorderColor()} rounded-lg p-6 cursor-pointer transition-colors ${
        isLocked ? 'opacity-60 cursor-not-allowed' : ''
      }`}
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)',
      }}
      onMouseEnter={(e) => {
        if (!isLocked) {
          e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.05)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.03)';
      }}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="flex items-start gap-4">
        {/* Numero Milestone */}
        <div className="flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border"
            style={{
              background: 'rgba(255, 107, 53, 0.1)',
              borderColor: 'rgba(255, 107, 53, 0.3)',
              color: '#FF6B35'
            }}
          >
            {milestone.id}
          </div>
        </div>

        {/* Contenuto */}
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{milestone.title}</h3>
            {getStatusIcon()}
          </div>

          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{milestone.subtitle}</p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">⚡</span>
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-xs font-medium">
                {milestone.xp} XP
              </span>
            </div>
            <div className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
              <span className="text-lg">⏱️</span>
              <span>{milestone.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="px-2.5 py-1 border rounded text-xs font-medium"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
                  color: 'var(--text-secondary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                {milestone.badge}
              </span>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mt-4">
            {milestone.topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 border rounded-lg text-xs font-medium transition-colors"
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
                  color: 'var(--text-tertiary)',
                  borderColor: 'var(--border-color)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.08)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)';
                  e.currentTarget.style.color = 'var(--text-tertiary)';
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
