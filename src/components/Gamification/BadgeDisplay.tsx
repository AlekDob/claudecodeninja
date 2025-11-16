import { badgeConfigs } from '../../data/badges';
import { loadProgress } from '../../utils/progressTracking';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export const BadgeDisplay = () => {
  const progress = loadProgress();

  const isBadgeEarned = (badgeIndex: number) => {
    const badge = badgeConfigs[badgeIndex];
    return progress.totalXP >= badge.xpRequired;
  };

  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold mb-6">Badge Collection</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badgeConfigs.map((badge, index) => {
          const earned = isBadgeEarned(index);

          return (
            <motion.div
              key={badge.tier}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 text-center ${
                !earned && 'opacity-40'
              }`}
            >
              <div className="relative">
                <div className="text-6xl mb-4">{badge.emoji}</div>
                {!earned && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-light/50" />
                  </div>
                )}
              </div>

              <h3 className="font-bold text-sm mb-2">{badge.name}</h3>
              <p className="text-xs text-light/70">
                {earned ? (
                  <span className="text-success">✅ Sbloccato!</span>
                ) : (
                  <span>{badge.xpRequired} XP richiesti</span>
                )}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
