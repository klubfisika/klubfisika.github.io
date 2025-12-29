// Mermaid diagram rendering
import mermaid from 'mermaid';

export function initializeMermaid() {
  document.addEventListener('DOMContentLoaded', () => {
    // Configure Mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#1f2937',
        primaryBorderColor: '#1d4ed8',
        lineColor: '#6b7280',
        secondaryColor: '#f3f4f6',
        tertiaryColor: '#ffffff'
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      },
      sequence: {
        useMaxWidth: true,
        wrap: true
      },
      gitgraph: {
        useMaxWidth: true
      }
    });
    
    // Find and render Mermaid diagrams
    const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid');
    
    mermaidBlocks.forEach(async (block, index) => {
      const code = block.textContent;
      const id = `mermaid-${index}`;
      
      // Create container
      const container = document.createElement('div');
      container.className = 'mermaid-container';
      container.innerHTML = `
        <div class="mermaid-wrapper">
          <div id="${id}" class="mermaid">${code}</div>
        </div>
      `;
      
      // Replace code block
      block.parentElement?.replaceWith(container);
      
      try {
        // Render diagram
        await mermaid.run({
          nodes: [document.getElementById(id)]
        });
      } catch (error) {
        console.warn('Mermaid rendering error:', error);
        container.innerHTML = `
          <div class="mermaid-error">
            <p>⚠️ Diagram rendering error</p>
            <pre><code>${code}</code></pre>
          </div>
        `;
      }
    });
    
    // Update theme on dark mode toggle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          mermaid.initialize({
            theme: isDark ? 'dark' : 'default'
          });
          
          // Re-render diagrams
          document.querySelectorAll('.mermaid').forEach(async (element, index) => {
            const code = element.getAttribute('data-original') || element.textContent;
            if (code) {
              element.innerHTML = code;
              await mermaid.run({
                nodes: [element]
              });
            }
          });
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  });
}
