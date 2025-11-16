import { BadgeConfig } from '../types';

export const badgeConfigs: BadgeConfig[] = [
  {
    tier: 'bronze',
    name: 'Claude Code Apprentice',
    emoji: '🥉',
    xpRequired: 600,
    milestonesRequired: [1, 2, 3, 4],
    color: '#CD7F32'
  },
  {
    tier: 'silver',
    name: 'Claude Code Developer',
    emoji: '🥈',
    xpRequired: 1500,
    milestonesRequired: [1, 2, 3, 4, 5, 6, 7, 8],
    color: '#C0C0C0'
  },
  {
    tier: 'gold',
    name: 'Claude Code Expert',
    emoji: '🥇',
    xpRequired: 2500,
    milestonesRequired: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    color: '#FFD700'
  },
  {
    tier: 'platinum',
    name: 'Claude Code Master',
    emoji: '💎',
    xpRequired: 2500,
    milestonesRequired: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    color: '#E5E4E2'
  }
];

export const getBadgeForXP = (xp: number): BadgeConfig | null => {
  // Returns highest earned badge
  const earned = badgeConfigs
    .filter(badge => xp >= badge.xpRequired)
    .sort((a, b) => b.xpRequired - a.xpRequired);

  return earned[0] || null;
};

export const getNextBadge = (currentXP: number): BadgeConfig | null => {
  const next = badgeConfigs
    .filter(badge => currentXP < badge.xpRequired)
    .sort((a, b) => a.xpRequired - b.xpRequired);

  return next[0] || null;
};
