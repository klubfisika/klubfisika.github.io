import type { FilterState } from '@types/blog';

export class BlogFilterManager {
    private state: FilterState = {
        search: '',
        category: 'all',
        tag: null
    };

    private loadMoreBtn: HTMLElement | null = null;
    private searchResults: HTMLElement | null = null;
    private allArticles: NodeListOf<Element> = document.querySelectorAll('[data-article]');

    constructor() {
        this.init();
    }

    private init(): void {
        this.cacheElements();
        this.loadFromURL();
        this.bindEvents();
        this.initLoadMore();
    }

    private cacheElements(): void {
        this.loadMoreBtn = document.getElementById('loadMoreBtn');
        this.searchResults = document.getElementById('search-results');
        this.allArticles = document.querySelectorAll('[data-article]');
    }

    private updateURL(): void {
        const params = new URLSearchParams();
        if (this.state.search) params.set('search', this.state.search);
        if (this.state.category !== 'all') params.set('category', this.state.category);
        if (this.state.tag) params.set('tag', this.state.tag);
        
        const newURL = params.toString() ? 
            `${window.location.pathname}?${params.toString()}` : 
            window.location.pathname;
        window.history.replaceState(null, '', newURL);
    }

    private loadFromURL(): void {
        const params = new URLSearchParams(window.location.search);
        this.state.search = params.get('search') || '';
        this.state.category = params.get('category') || 'all';
        this.state.tag = params.get('tag') || null;
        
        this.updateUI();
        this.applyFilters();
    }

    private updateUI(): void {
        this.updateSearchInput();
        this.updateCategoryButtons();
        this.updateTagButtons();
    }

    private updateSearchInput(): void {
        const searchInput = document.getElementById('search-input') as HTMLInputElement;
        if (searchInput) searchInput.value = this.state.search;
    }

    private updateCategoryButtons(): void {
        document.querySelectorAll('[data-category]').forEach(btn => {
            const button = btn as HTMLButtonElement;
            const isActive = button.getAttribute('data-category') === this.state.category;
            
            button.setAttribute('aria-pressed', isActive.toString());
            button.classList.toggle('bg-primary', isActive);
            button.classList.toggle('text-on-primary', isActive);
            button.classList.toggle('bg-surface', !isActive);
            button.classList.toggle('text-dark', !isActive);
        });
    }

    private updateTagButtons(): void {
        document.querySelectorAll('[data-tag]').forEach(btn => {
            const button = btn as HTMLButtonElement;
            const tagName = button.getAttribute('data-tag');
            const isActive = tagName === this.state.tag;
            
            button.classList.toggle('bg-primary', isActive);
            button.classList.toggle('text-white', isActive);
            button.classList.toggle('bg-white', !isActive);
            button.classList.toggle('text-dark', !isActive);
        });
    }

    private applyFilters(): void {
        let matchCount = 0;
        const isFiltering = this.state.search || this.state.category !== 'all' || this.state.tag;
        
        this.allArticles.forEach(article => {
            const element = article as HTMLElement;
            const shouldShow = this.shouldShowArticle(element);
            
            this.toggleArticleVisibility(element, shouldShow);
            if (shouldShow) matchCount++;
        });

        this.updateResultsDisplay(matchCount, isFiltering);
        this.updateLoadMoreButton(isFiltering);
    }

    private shouldShowArticle(element: HTMLElement): boolean {
        // Search filter
        if (this.state.search) {
            const title = element.querySelector('h2, h3')?.textContent?.toLowerCase() || '';
            const content = element.querySelector('p')?.textContent?.toLowerCase() || '';
            const searchTerm = this.state.search.toLowerCase();
            if (!title.includes(searchTerm) && !content.includes(searchTerm)) return false;
        }

        // Category filter
        if (this.state.category !== 'all') {
            const articleCategory = element.getAttribute('data-article');
            const categoryMap: Record<string, string> = {
                'tutorial': 'Tutorial',
                'eksperimen': 'Eksperimen', 
                'teori': 'Teori',
                'tips': 'Tips Belajar',
                'berita': 'Berita',
                'mekanika': 'Mekanika'
            };
            if (articleCategory !== categoryMap[this.state.category]) return false;
        }

        // Tag filter
        if (this.state.tag) {
            const articleTags = element.getAttribute('data-tags') || '';
            const tagArray = articleTags.split(',').map(tag => tag.trim());
            if (!tagArray.includes(this.state.tag)) return false;
        }

        return true;
    }

    private toggleArticleVisibility(element: HTMLElement, shouldShow: boolean): void {
        const parentHidden = element.closest('.hidden-article');
        const targetElement = parentHidden || element;
        (targetElement as HTMLElement).style.display = shouldShow ? 'block' : 'none';
    }

    private updateResultsDisplay(matchCount: number, isFiltering: boolean): void {
        if (!this.searchResults) return;

        if (isFiltering) {
            const filterText = this.buildFilterText();
            this.searchResults.textContent = `Ditemukan ${matchCount} artikel untuk ${filterText}`;
            this.searchResults.classList.remove('sr-only');
        } else {
            this.searchResults.classList.add('sr-only');
        }
    }

    private buildFilterText(): string {
        const filters = [];
        if (this.state.search) filters.push(`pencarian "${this.state.search}"`);
        if (this.state.category !== 'all') filters.push(`kategori ${this.state.category}`);
        if (this.state.tag) filters.push(`tag ${this.state.tag}`);
        return filters.join(', ');
    }

    private updateLoadMoreButton(isFiltering: boolean): void {
        if (!this.loadMoreBtn) return;

        if (isFiltering) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            const hiddenArticles = document.querySelectorAll('.hidden-article[style*="display: none"]');
            this.loadMoreBtn.style.display = hiddenArticles.length > 0 ? 'block' : 'none';
        }
    }

    private bindEvents(): void {
        this.bindSearchEvents();
        this.bindCategoryEvents();
        this.bindTagEvents();
        this.bindNavigationEvents();
        this.bindKeyboardEvents();
    }

    private bindSearchEvents(): void {
        const searchInput = document.getElementById('search-input') as HTMLInputElement;
        searchInput?.addEventListener('input', this.debounce((e: Event) => {
            const target = e.target as HTMLInputElement;
            this.state.search = target.value;
            this.updateState();
        }, 300));
    }

    private bindCategoryEvents(): void {
        document.querySelectorAll('[data-category]').forEach(button => {
            button.addEventListener('click', () => {
                const category = (button as HTMLElement).getAttribute('data-category');
                if (category) {
                    this.state.category = category;
                    this.updateState();
                }
            });
        });
    }

    private bindTagEvents(): void {
        document.querySelectorAll('[data-tag]').forEach(button => {
            button.addEventListener('click', () => {
                const tag = (button as HTMLElement).getAttribute('data-tag');
                if (tag) {
                    this.state.tag = this.state.tag === tag ? null : tag;
                    this.updateState();
                }
            });
        });
    }

    private bindNavigationEvents(): void {
        window.addEventListener('popstate', () => this.loadFromURL());
    }

    private bindKeyboardEvents(): void {
        document.querySelectorAll('article[tabindex="0"]').forEach(article => {
            article.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const link = article.querySelector('a');
                    if (link) link.click();
                }
            });
        });
    }

    private updateState(): void {
        this.updateURL();
        this.updateUI();
        this.applyFilters();
    }

    private initLoadMore(): void {
        if (!this.loadMoreBtn) return;
        
        this.loadMoreBtn.addEventListener('click', () => {
            const hiddenArticles = document.querySelectorAll('.hidden-article[style*="display: none"]');
            
            hiddenArticles.forEach(article => {
                const element = article as HTMLElement;
                element.style.display = 'block';
                element.classList.remove('hidden-article');
            });
            
            this.loadMoreBtn!.style.display = 'none';
            this.announceToScreenReader(`Dimuat ${hiddenArticles.length} artikel tambahan`);
        });
    }

    private announceToScreenReader(message: string): void {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }

    private debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
        let timeout: NodeJS.Timeout;
        return ((...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        }) as T;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BlogFilterManager();
});
