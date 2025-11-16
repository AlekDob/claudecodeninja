import { Milestone } from '../../types';
import { getMilestoneStatus } from '../../utils/progressTracking';
import { Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={`glass-card p-6 cursor-pointer transition-all ${getStatusClass()}`}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="flex items-start gap-4">
        {/* Numero Milestone */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
            {milestone.id}
          </div>
        </div>

        {/* Contenuto */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold">{milestone.title}</h3>
            {getStatusIcon()}
          </div>

          <p className="text-light/70 mb-4">{milestone.subtitle}</p>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-accent">⚡</span>
              <span>{milestone.xp} XP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">⏱️</span>
              <span>{milestone.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent">{milestone.badge}</span>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mt-4">
            {milestone.topics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary/30 rounded text-xs"
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
