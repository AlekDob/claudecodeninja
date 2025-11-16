export type MilestoneStatus = 'locked' | 'in-progress' | 'completed';

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface Milestone {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  xp: number;
  badge: string;
  estimatedTime: string;
  topics: string[];
  quiz?: Quiz;
  challenge?: CodingChallenge;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CodingChallenge {
  title: string;
  description: string;
  instructions: string[];
  verificationSteps: string[];
}

export interface UserProgress {
  userId?: string;
  completedMilestones: number[];
  badges: BadgeTier[];
  totalXP: number;
  startedAt: Date;
  lastActivity: Date;
  quizScores: Record<number, number>;
  currentMilestone?: number;
}

export interface BadgeConfig {
  tier: BadgeTier;
  name: string;
  emoji: string;
  xpRequired: number;
  milestonesRequired: number[];
  color: string;
}
