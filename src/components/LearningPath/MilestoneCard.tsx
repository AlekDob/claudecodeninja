import { Milestone } from '../../types';
import { getMilestoneStatus } from '../../utils/progressTracking';
import { Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface MilestoneCardProps {
  milestone: Milestone;
  onClick?: () => void;
}

export const MilestoneCard = ({ milestone, onClick }: MilestoneCardProps) => {
  const status = getMilestoneStatus(milestone.id);

  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isInProgress = status === 'in-progress';

  const getStatusIcon = () => {
    if (isLocked) return <Lock className="w-6 h-6" />;
    if (isCompleted) return <CheckCircle2 className="w-6 h-6 text-success" />;
    return <PlayCircle className="w-6 h-6 text-primary" />;
  };

  const getStatusClass = () => {
    if (isLocked) return 'milestone-locked';
    if (isCompleted) return 'milestone-completed';
    if (isInProgress) return 'milestone-in-progress';
    return '';
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
      className={`bg-white/5 backdrop-blur-sm border ${getBorderColor()} rounded-lg p-6 cursor-pointer hover:bg-white/10 transition-colors ${
        isLocked ? 'opacity-60 cursor-not-allowed' : ''
      }`}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="flex items-start gap-4">
        {/* Numero Milestone */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-white font-bold text-xl border border-white/10">
            {milestone.id}
          </div>
        </div>

        {/* Contenuto */}
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
            {getStatusIcon()}
          </div>

          <p className="text-white/60 mb-4">{milestone.subtitle}</p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">⚡</span>
              <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-xs font-medium">
                {milestone.xp} XP
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <span className="text-lg">⏱️</span>
              <span>{milestone.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 bg-white/5 text-white/70 border border-white/10 rounded text-xs font-medium">
                {milestone.badge}
              </span>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mt-4">
            {milestone.topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-text-tertiary hover:bg-white/10 hover:text-white transition-colors"
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
