/**
 * Rehype plugin to wrap task list checkbox + text in <label>
 * Enables pure CSS clickable rows without JavaScript
 */
import { visit } from 'unist-util-visit';

export function rehypeTaskListLabel() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'li' || !node.properties?.className?.includes('task-list-item')) {
        return;
      }

      const checkbox = node.children.find(
        (child) => child.type === 'element' && child.tagName === 'input' && child.properties?.type === 'checkbox'
      );

      if (!checkbox) return;

      // Remove disabled attribute
      delete checkbox.properties.disabled;

      // Get all children except checkbox
      const textNodes = node.children.filter((child) => child !== checkbox);

      // Create label wrapping checkbox + text
      const label = {
        type: 'element',
        tagName: 'label',
        properties: { className: ['task-label'] },
        children: [checkbox, ...textNodes]
      };

      // Replace li children with just the label
      node.children = [label];
    });
  };
}
