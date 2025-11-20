import { UserProgress, MilestoneStatus } from '../types';

const STORAGE_KEY = 'claudecodeninja-progress';

// Initialize default progress
export const getDefaultProgress = (): UserProgress => ({
  completedMilestones: [],
  badges: [],
  totalXP: 0,
  startedAt: new Date(),
  lastActivity: new Date(),
  quizScores: {},
  currentMilestone: 1
});

// Load progress from localStorage
export const loadProgress = (): UserProgress => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultProgress();

    const progress = JSON.parse(stored);
    // Convert date strings back to Date objects
    return {
      ...progress,
      startedAt: new Date(progress.startedAt),
      lastActivity: new Date(progress.lastActivity)
    };
  } catch (error) {
    console.error('Failed to load progress:', error);
    return getDefaultProgress();
  }
};

// Save progress to localStorage
export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

// Complete a milestone
export const completeMilestone = (milestoneId: number, xp: number, quizScore?: number): void => {
  const progress = loadProgress();

  // Validate quiz score if provided (must be >= 80%)
  if (quizScore !== undefined && quizScore < 80) {
    console.warn(`Quiz score ${quizScore}% is below 80% threshold. Milestone not completed.`);
    return;
  }

  // Don't add if already completed
  if (!progress.completedMilestones.includes(milestoneId)) {
    progress.completedMilestones.push(milestoneId);
    progress.totalXP += xp;
  }

  // Update quiz score
  if (quizScore !== undefined) {
    progress.quizScores[milestoneId] = quizScore;
  }

  // Update activity time
  progress.lastActivity = new Date();

  // Set next milestone
  progress.currentMilestone = milestoneId + 1;

  saveProgress(progress);
};

// Get milestone status
export const getMilestoneStatus = (milestoneId: number): MilestoneStatus => {
  const progress = loadProgress();

  // Completed
  if (progress.completedMilestones.includes(milestoneId)) {
    return 'completed';
  }

  // In progress (is current milestone)
  if (progress.currentMilestone === milestoneId) {
    return 'in-progress';
  }

  // Milestone 0 e 1 sono sempre sbloccate
  if (milestoneId === 0 || milestoneId === 1) {
    return 'in-progress';
  }

  // Locked (prerequisite not completed)
  if (milestoneId > 1) {
    const prevCompleted = progress.completedMilestones.includes(milestoneId - 1);
    if (!prevCompleted) {
      return 'locked';
    }
  }

  // Otherwise available
  return 'in-progress';
};

// Check if milestone is unlocked
export const isMilestoneUnlocked = (milestoneId: number): boolean => {
  // Milestone 0 (prefazione) e Milestone 1 sono sempre accessibili
  if (milestoneId === 0 || milestoneId === 1) return true;

  const progress = loadProgress();
  return progress.completedMilestones.includes(milestoneId - 1);
};

// Get progress percentage
export const getProgressPercentage = (): number => {
  const progress = loadProgress();
  const totalMilestones = 13; // Milestone 0-12 (13 totali)
  return (progress.completedMilestones.length / totalMilestones) * 100;
};

// Reset progress (for testing)
export const resetProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
