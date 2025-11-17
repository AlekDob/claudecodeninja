import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Code } from 'mdast';

/**
 * Remark plugin to detect prompt-good and prompt-bad markers in code blocks
 * and add them as data attributes for custom rendering
 */
export const remarkPromptPlugin: Plugin = () => {
  return (tree) => {
    visit(tree, 'code', (node: Code) => {
      // Check if the language contains prompt markers
      const lang = node.lang || '';

      // Look for patterns like "bash prompt-good" or "bash prompt-bad"
      const promptGoodMatch = /prompt-good/.test(lang);
      const promptBadMatch = /prompt-bad/.test(lang);

      if (promptGoodMatch || promptBadMatch) {
        // Add data attribute to the node
        if (!node.data) {
          node.data = {};
        }
        if (!node.data.hProperties) {
          node.data.hProperties = {};
        }

        // Add custom class for our component to detect
        node.data.hProperties.className = promptGoodMatch
          ? 'language-bash prompt-example prompt-good'
          : 'language-bash prompt-example prompt-bad';

        // Clean up the lang to just be "bash"
        node.lang = 'bash';
      }
    });
  };
};
