// Prism.js configuration for advanced syntax highlighting
import Prism from 'prismjs';

// Import core languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-latex';

// Import plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/toolbar/prism-toolbar';

export function initializePrism() {
  // Add copy buttons to all code blocks
  const codeBlocks = document.querySelectorAll('pre code');
  
  codeBlocks.forEach((block, index) => {
    const pre = block.parentElement;
    if (!pre || pre.querySelector('.code-copy-button')) return; // Skip if button exists
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="m5,15 0,-10 c0,-1.1 0.9,-2 2,-2 l10,0"></path>
      </svg>
      <span>Copy</span>
    `;
    
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.textContent);
        copyButton.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
          <span>Copied!</span>
        `;
        
        setTimeout(() => {
          copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="m5,15 0,-10 c0,-1.1 0.9,-2 2,-2 l10,0"></path>
            </svg>
            <span>Copy</span>
          `;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
    
    pre.style.position = 'relative';
    pre.appendChild(copyButton);
  });
  
  // Initialize Prism highlighting
  Prism.highlightAll();
}
export function initializePrism() {
  // Configure Prism
  Prism.manual = true;
  
  // Add copy button functionality
  document.addEventListener('DOMContentLoaded', () => {
    // Find all code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock, index) => {
      const pre = codeBlock.parentElement;
      if (!pre) return;
      
      // Create wrapper for positioning
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      
      // Add language label and copy button
      const toolbar = document.createElement('div');
      toolbar.className = 'code-toolbar';
      
      // Language detection
      const language = codeBlock.className.match(/language-(\w+)/)?.[1] || 'text';
      const languageLabel = document.createElement('span');
      languageLabel.className = 'code-language';
      languageLabel.textContent = language;
      
      // Copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-button';
      copyButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <span class="copy-text">Copy</span>
      `;
      
      // Copy functionality
      copyButton.addEventListener('click', async () => {
        const code = codeBlock.textContent || '';
        
        try {
          await navigator.clipboard.writeText(code);
          copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
            <span class="copy-text">Copied!</span>
          `;
          
          setTimeout(() => {
            copyButton.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span class="copy-text">Copy</span>
            `;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });
      
      toolbar.appendChild(languageLabel);
      toolbar.appendChild(copyButton);
      wrapper.insertBefore(toolbar, pre);
      
      // Apply syntax highlighting
      if (language && Prism.languages[language]) {
        Prism.highlightElement(codeBlock);
      }
    });
  });
}

export default Prism;
