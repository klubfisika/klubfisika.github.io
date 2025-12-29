// KaTeX math rendering for physics articles
import katex from 'katex';

export function initializeMath() {
  document.addEventListener('DOMContentLoaded', () => {
    // Render inline math: $...$
    const inlineMath = document.querySelectorAll('p, li, td, th');
    inlineMath.forEach(element => {
      if (element.querySelector('.katex')) return; // Skip if already rendered
      
      element.innerHTML = element.innerHTML.replace(
        /\$([^$]+)\$/g,
        (match, math) => {
          try {
            return katex.renderToString(math, {
              displayMode: false,
              throwOnError: false,
              strict: false
            });
          } catch (e) {
            console.warn('KaTeX inline error:', e);
            return match;
          }
        }
      );
    });
    
    // Render display math: $$...$$
    const displayMath = document.querySelectorAll('p, div');
    displayMath.forEach(element => {
      if (element.querySelector('.katex-display')) return; // Skip if already rendered
      
      element.innerHTML = element.innerHTML.replace(
        /\$\$([^$]+)\$\$/g,
        (match, math) => {
          try {
            return katex.renderToString(math, {
              displayMode: true,
              throwOnError: false,
              strict: false
            });
          } catch (e) {
            console.warn('KaTeX display error:', e);
            return match;
          }
        }
      );
    });
    
    // Handle LaTeX blocks in code
    const latexBlocks = document.querySelectorAll('pre code.language-latex, pre code.language-math');
    latexBlocks.forEach(block => {
      const math = block.textContent;
      const container = document.createElement('div');
      container.className = 'math-block';
      
      try {
        container.innerHTML = katex.renderToString(math, {
          displayMode: true,
          throwOnError: false,
          strict: false
        });
        
        block.parentElement?.replaceWith(container);
      } catch (e) {
        console.warn('KaTeX block error:', e);
      }
    });
  });
}
