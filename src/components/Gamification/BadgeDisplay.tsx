import { badgeConfigs } from '../../data/badges';
import { loadProgress } from '../../utils/progressTracking';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

export const BadgeDisplay = () => {
  const progress = loadProgress();

  const isBadgeEarned = (badgeIndex: number) => {
    const badge = badgeConfigs[badgeIndex];
    return progress.totalXP >= badge.xpRequired;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="glass-card p-6 md:p-8"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Badge Collection</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {badgeConfigs.map((badge, index) => {
          const earned = isBadgeEarned(index);

          return (
            <motion.div
              key={badge.tier}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={earned ? { scale: 1.05, y: -4 } : {}}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className={`glass-card p-6 text-center bg-white/5 border transition-all ${
                earned
                  ? 'border-white/20 hover:border-white/40 cursor-pointer'
                  : 'border-white/10 opacity-40'
              }`}
            >
              <div className="relative">
                <div className="text-6xl mb-4 filter">{badge.emoji}</div>
                {!earned && (
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
                    <Lock className="w-10 h-10 text-text-tertiary" />
                  </div>
                )}
              </div>

              <h3 className="font-bold text-sm mb-2 text-white">{badge.name}</h3>
              <p className="text-xs">
                {earned ? (
                  <span className="badge-completed inline-block">Sbloccato</span>
                ) : (
                  <span className="text-text-tertiary">{badge.xpRequired} XP richiesti</span>
                )}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
