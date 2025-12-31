/**
 * Article utilities for blog posts
 * Handles: TOC, Mermaid, Code copy, KaTeX
 */

const ICONS = {
  copy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <rect x="9" y="9" width="13" height="13" rx="2"></rect>
    <path d="m5,15 0,-10 c0,-1.1 0.9,-2 2,-2 l10,0"></path>
  </svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>`,
  chevron: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>`,
  download: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>`
};

// 1. Table of Contents
function initTOC(article) {
  const headings = article.querySelectorAll('h1, h2, h3, h4');
  if (headings.length < 3) return;

  const tocContainer = document.createElement('div');
  tocContainer.className = 'table-of-contents';
  tocContainer.innerHTML = `
    <div class="toc-header">
      <span class="toc-title">📋 Daftar Isi</span>
      <button class="toc-toggle" aria-label="Toggle TOC" aria-expanded="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>
    </div>
    <nav class="toc-nav expanded" aria-label="Table of contents"><ul class="toc-list"></ul></nav>
  `;

  const tocList = tocContainer.querySelector('.toc-list');
  const tocNav = tocContainer.querySelector('.toc-nav');
  const tocToggle = tocContainer.querySelector('.toc-toggle');

  headings.forEach((heading, i) => {
    const id = `heading-${i}`;
    heading.id = id;

    const li = document.createElement('li');
    li.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
    li.innerHTML = `<a href="#${id}" class="toc-link">${heading.textContent}</a>`;

    li.querySelector('a')?.addEventListener('click', (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    tocList?.appendChild(li);
  });

  tocToggle?.addEventListener('click', () => {
    tocNav?.classList.toggle('expanded');
    tocToggle.classList.toggle('rotated');
  });

  article?.parentNode?.insertBefore(tocContainer, article);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocList?.querySelectorAll('.toc-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  headings.forEach(h => observer.observe(h));
}

// 2. Checkbox Functionality
function initCheckboxes(article) {
  // Find all checkboxes in the article
  const checkboxes = article.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    // Remove disabled attribute to make clickable
    checkbox.removeAttribute('disabled');
    
    // Hide bullet points for parent li
    const li = checkbox.closest('li');
    if (li) {
      li.style.listStyle = 'none';
      li.style.marginLeft = '0';
      li.style.paddingLeft = '0';
      
      // Also hide bullets for the parent ul
      const ul = li.closest('ul');
      if (ul) {
        ul.style.listStyle = 'none';
        ul.style.paddingLeft = '0';
      }
    }
    
    // Add click functionality
    checkbox.addEventListener('change', function() {
      // Optional: Save state to localStorage
      const checkboxId = this.closest('li')?.textContent?.trim().slice(0, 50);
      if (checkboxId) {
        localStorage.setItem(`checkbox-${checkboxId}`, this.checked);
      }
    });
    
    // Restore saved state
    const checkboxId = checkbox.closest('li')?.textContent?.trim().slice(0, 50);
    if (checkboxId) {
      const saved = localStorage.getItem(`checkbox-${checkboxId}`);
      if (saved !== null) {
        checkbox.checked = saved === 'true';
      }
    }
  });
}

// 3. Mermaid with copy/export
function initMermaid(article) {
  const allCodeBlocks = article.querySelectorAll('pre code');
  const mermaidBlocks = Array.from(allCodeBlocks).filter(block => {
    const text = block.textContent?.trim().toLowerCase() || '';
    return text.startsWith('flowchart') || 
           text.startsWith('sequencediagram') || 
           text.startsWith('classdiagram') ||
           text.startsWith('gitgraph') ||
           text.startsWith('graph ') ||
           text.startsWith('pie') ||
           text.startsWith('erdiagram');
  });

  if (mermaidBlocks.length === 0) return;

  const mermaidSources = [];
  mermaidBlocks.forEach((block, i) => {
    const pre = block.parentElement;
    const source = block.textContent || '';
    mermaidSources.push(source);

    if (pre) {
      const container = document.createElement('div');
      container.className = 'mermaid-container';
      container.innerHTML = `
        <div class="mermaid-toolbar">
          <button class="mermaid-copy-btn" data-index="${i}" title="Copy source">
            ${ICONS.copy}<span>Copy</span>
          </button>
          <div class="mermaid-export-dropdown">
            <button class="mermaid-export-btn" title="Export">
              ${ICONS.download}<span>Export</span>${ICONS.chevron}
            </button>
            <div class="mermaid-export-menu">
              <button data-format="svg" data-index="${i}">Export SVG</button>
              <button data-format="png" data-index="${i}">Export PNG</button>
            </div>
          </div>
        </div>
        <div class="mermaid" id="mermaid-${i}">${source}</div>
      `;
      pre.replaceWith(container);
    }
  });

  import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs').then(({ default: mermaid }) => {
    mermaid.initialize({ 
      startOnLoad: false, 
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
      securityLevel: 'loose'
    });
    mermaid.run().catch(() => {});

    // Setup handlers after render
    setupMermaidHandlers(mermaidSources);
  }).catch(() => {});
}

function setupMermaidHandlers(sources) {
  // Copy buttons
  document.querySelectorAll('.mermaid-copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idx = btn.dataset.index;
      await copyText(sources[idx], btn);
    });
  });

  // Export dropdown toggle
  document.querySelectorAll('.mermaid-export-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.closest('.mermaid-export-dropdown')?.classList.toggle('open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.mermaid-export-dropdown.open').forEach(d => d.classList.remove('open'));
  });

  // Export handlers
  document.querySelectorAll('.mermaid-export-menu button').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const format = btn.dataset.format;
      const idx = btn.dataset.index;
      const svg = document.querySelector(`#mermaid-${idx} svg`);
      
      if (svg) {
        if (format === 'svg') exportSVG(svg, `diagram-${idx}.svg`);
        else if (format === 'png') await exportPNG(svg, `diagram-${idx}.png`);
      }
      btn.closest('.mermaid-export-dropdown')?.classList.remove('open');
    });
  });
}

// 3. Code copy buttons
function initCodeCopy() {
  document.querySelectorAll('pre code').forEach((block) => {
    const pre = block.parentElement;
    if (!pre || pre.querySelector('.code-copy-button')) return;

    const btn = document.createElement('button');
    btn.className = 'code-copy-button';
    btn.innerHTML = `${ICONS.copy}<span>Copy</span>`;
    btn.addEventListener('click', () => copyText(block.textContent || '', btn));

    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
}

// 4. KaTeX with copy for math blocks
function initKaTeX(article) {
  const hasMath = article.textContent?.includes('$');
  if (!hasMath) return;

  import('https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.mjs').then(({ default: katex }) => {
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent?.includes('$')) textNodes.push(node);
    }

    textNodes.forEach(textNode => {
      const text = textNode.textContent || '';
      if (textNode.parentElement?.closest('pre, code')) return;

      if (text.includes('$$')) {
        const parts = text.split(/(\$\$[^$]+\$\$)/g);
        if (parts.length > 1) {
          const fragment = document.createDocumentFragment();
          parts.forEach(part => {
            if (part.startsWith('$$') && part.endsWith('$$')) {
              const tex = part.slice(2, -2);
              const div = document.createElement('div');
              div.className = 'math-block';
              div.dataset.tex = tex;
              try {
                div.innerHTML = katex.renderToString(tex, { displayMode: true, throwOnError: false, strict: false });
              } catch { div.textContent = tex; }
              fragment.appendChild(div);
            } else if (part) {
              fragment.appendChild(document.createTextNode(part));
            }
          });
          textNode.replaceWith(fragment);
        }
      } else if (text.includes('$') && !text.includes('$$')) {
        const parts = text.split(/(\$[^$]+\$)/g);
        if (parts.length > 1) {
          const fragment = document.createDocumentFragment();
          parts.forEach(part => {
            if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
              const tex = part.slice(1, -1);
              const span = document.createElement('span');
              span.dataset.tex = tex;
              try {
                span.innerHTML = katex.renderToString(tex, { displayMode: false, throwOnError: false, strict: false });
              } catch { span.textContent = tex; }
              fragment.appendChild(span);
            } else if (part) {
              fragment.appendChild(document.createTextNode(part));
            }
          });
          textNode.replaceWith(fragment);
        }
      }
    });

    // Add copy buttons to math blocks
    addMathCopyButtons();
    
    // Make katex-display focusable for keyboard users (scrollable content)
    document.querySelectorAll('.katex-display').forEach(el => {
      el.setAttribute('tabindex', '0');
    });
  }).catch(console.error);
}

function addMathCopyButtons() {
  document.querySelectorAll('.math-block').forEach(block => {
    if (block.querySelector('.math-copy-btn')) return;
    const tex = block.dataset.tex;
    if (!tex) return;

    const btn = document.createElement('button');
    btn.className = 'math-copy-btn';
    btn.innerHTML = `${ICONS.copy}`;
    btn.title = 'Copy LaTeX';
    btn.addEventListener('click', () => copyText(tex, btn, true));
    
    block.style.position = 'relative';
    block.appendChild(btn);
  });
}

// Utilities
async function copyText(text, btn, iconOnly = false) {
  try {
    await navigator.clipboard.writeText(text);
    const original = btn.innerHTML;
    btn.innerHTML = iconOnly ? ICONS.check : `${ICONS.check}<span>Copied!</span>`;
    setTimeout(() => { btn.innerHTML = original; }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
  }
}

function exportSVG(svg, filename) {
  const data = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([data], { type: 'image/svg+xml' });
  downloadBlob(blob, filename);
}

async function exportPNG(svg, filename) {
  const data = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  return new Promise(resolve => {
    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx.scale(2, 2);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(b => {
        downloadBlob(b, filename);
        URL.revokeObjectURL(url);
        resolve();
      }, 'image/png');
    };
    img.src = url;
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Main init
export function initArticle() {
  const article = document.querySelector('.article-content');
  if (!article) return;

  initTOC(article);
  initCheckboxes(article);
  initMermaid(article);
  initCodeCopy();
  initKaTeX(article);
  initTabs(article);
  initQuiz(article);
}

// Tabs functionality
function initTabs(article) {
  article.querySelectorAll('.tabs-container').forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');
    
    // Initialize first panel as active
    if (panels.length > 0 && !container.querySelector('.tab-panel.active')) {
      panels[0].classList.add('active');
    }
    
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });
}

// Quiz functionality
function initQuiz(article) {
  article.querySelectorAll('.quiz-container').forEach(container => {
    const correct = parseInt(container.dataset.correct || '0');
    const options = container.querySelectorAll('.quiz-option');
    const feedback = container.querySelector('.quiz-feedback');
    const explanation = container.querySelector('.quiz-explanation');
    
    options.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        options.forEach(b => {
          b.classList.remove('correct', 'incorrect');
          b.disabled = true;
        });
        
        if (i === correct) {
          btn.classList.add('correct');
          if (feedback) {
            feedback.textContent = '✓ Benar!';
            feedback.style.color = '#22c55e';
          }
        } else {
          btn.classList.add('incorrect');
          options[correct]?.classList.add('correct');
          if (feedback) {
            feedback.textContent = '✗ Kurang tepat';
            feedback.style.color = '#ef4444';
          }
        }
        feedback?.classList.add('show');
        explanation?.classList.add('show');
      });
    });
  });
}


// Task list clickable rows
function initTaskList(article) {
  article.querySelectorAll('.task-list-item').forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (!checkbox) return;
    
    checkbox.disabled = false;
    
    item.addEventListener('click', (e) => {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
    });
  });
}
