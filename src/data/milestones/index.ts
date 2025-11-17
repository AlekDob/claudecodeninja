// Export individual milestones
export { milestone01 } from './milestone-01-primi-passi';
export { milestone02 } from './milestone-02-core-cli';
export { milestone03 } from './milestone-03-permissions';
export { milestone04 } from './milestone-04-settings';
export { milestone05 } from './milestone-05-architettura';
export { milestone06 } from './milestone-06-prompt-engineering';
export { milestone07 } from './milestone-07-advanced-prompting';

// Aggregate milestones array
import { Milestone } from '../../types';
import { milestone01 } from './milestone-01-primi-passi';
import { milestone02 } from './milestone-02-core-cli';
import { milestone03 } from './milestone-03-permissions';
import { milestone04 } from './milestone-04-settings';
import { milestone05 } from './milestone-05-architettura';
import { milestone06 } from './milestone-06-prompt-engineering';
import { milestone07 } from './milestone-07-advanced-prompting';

export const milestones: Milestone[] = [
  milestone01,
  milestone02,
  milestone03,
  milestone04,
  milestone05,
  milestone06,
  milestone07,
  // Milestone 8-12 saranno aggiunte qui quando generate dal content-enricher agent
];
