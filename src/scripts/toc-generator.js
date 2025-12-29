// Table of Contents generator
export function generateTOC() {
  const article = document.querySelector('.article-content');
  const headings = article?.querySelectorAll('h1, h2, h3, h4');
  
  if (!headings || headings.length < 3) return; // Only show TOC if 3+ headings
  
  // Create TOC container
  const tocContainer = document.createElement('div');
  tocContainer.className = 'table-of-contents';
  tocContainer.innerHTML = `
    <div class="toc-header">
      <h4>📋 Daftar Isi</h4>
      <button class="toc-toggle" aria-label="Toggle table of contents">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </button>
    </div>
      <nav class="toc-nav">
        <ul class="toc-list"></ul>
      </nav>
    `;
    
    const tocList = tocContainer.querySelector('.toc-list');
    const tocToggle = tocContainer.querySelector('.toc-toggle');
    const tocNav = tocContainer.querySelector('.toc-nav');
    
    // Generate TOC items
    headings.forEach((heading, index) => {
      // Create ID if not exists
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
      
      const li = document.createElement('li');
      li.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
      
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = 'toc-link';
      
      // Smooth scroll
      link.addEventListener('click', (e) => {
        e.preventDefault();
        heading.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active state
        document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
      
      li.appendChild(link);
      tocList?.appendChild(li);
    });
    
    // Toggle functionality
    tocToggle?.addEventListener('click', () => {
      const isExpanded = tocNav?.classList.contains('expanded');
      if (isExpanded) {
        tocNav?.classList.remove('expanded');
        tocToggle.style.transform = 'rotate(0deg)';
      } else {
        tocNav?.classList.add('expanded');
        tocToggle.style.transform = 'rotate(180deg)';
      }
    });
    
    // Insert TOC after article header
    const articleHeader = document.querySelector('.article-header');
    if (articleHeader) {
      articleHeader.insertAdjacentElement('afterend', tocContainer);
    }
    
    // Intersection Observer for active states
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
          
          // Remove all active states
          document.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active state to current
          activeLink?.classList.add('active');
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });
    
    // Observe all headings
    headings.forEach(heading => observer.observe(heading));
}
