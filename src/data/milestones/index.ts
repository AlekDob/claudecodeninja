// Export individual milestones
export { milestone00 } from './milestone-00-prefazione';
export { milestone01 } from './milestone-01-primi-passi';
export { milestone02 } from './milestone-02-core-cli';
export { milestone03 } from './milestone-03-permissions';
export { milestone04 } from './milestone-04-settings';
export { milestone05 } from './milestone-05-architettura';
export { milestone06 } from './milestone-06-prompt-engineering';
export { milestone07 } from './milestone-07-advanced-prompting';
export { milestone08 } from './milestone-08-testing-workflow';
export { milestone09 } from './milestone-09-project-setup';
export { milestone10 } from './milestone-10-gitlab-github';
export { milestone11 } from './milestone-11-subagents-skills';
export { milestone12 } from './milestone-12-hooks-mcp';

// Aggregate milestones array
import { Milestone } from '../../types';
import { milestone00 } from './milestone-00-prefazione';
import { milestone01 } from './milestone-01-primi-passi';
import { milestone02 } from './milestone-02-core-cli';
import { milestone03 } from './milestone-03-permissions';
import { milestone04 } from './milestone-04-settings';
import { milestone05 } from './milestone-05-architettura';
import { milestone06 } from './milestone-06-prompt-engineering';
import { milestone07 } from './milestone-07-advanced-prompting';
import { milestone08 } from './milestone-08-testing-workflow';
import { milestone09 } from './milestone-09-project-setup';
import { milestone10 } from './milestone-10-gitlab-github';
import { milestone11 } from './milestone-11-subagents-skills';
import { milestone12 } from './milestone-12-hooks-mcp';

export const milestones: Milestone[] = [
  milestone00,  // Prefazione: Perché Scegliere Claude Code
  milestone01,  // Primi Passi
  milestone02,  // Core CLI
  milestone03,  // Permissions
  milestone04,  // Settings & CLAUDE.md
  milestone05,  // Architettura
  milestone06,  // Prompt Engineering
  milestone07,  // Advanced Prompting
  milestone09,  // Project Setup (spostato prima)
  milestone11,  // Subagents & Skills (spostato prima)
  milestone12,  // Hooks & MCP (spostato prima)
  milestone08,  // Testing Workflow (spostato dopo)
  milestone10   // GitLab/GitHub CI/CD (ultimo)
];
