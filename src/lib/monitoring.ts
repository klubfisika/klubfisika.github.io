// Web Vitals monitoring for profile pages
declare function gtag(command: string, eventName: string, params: Record<string, unknown>): void;

interface PerformanceEntryWithValue extends PerformanceEntry {
  value?: number;
}

export function initProfileMonitoring() {
  if (typeof window === 'undefined') return;

  // Track profile page performance
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name.includes('/[username]')) {
        // Send metrics to analytics
        if (typeof gtag === 'function') {
          gtag('event', 'profile_page_performance', {
            metric_name: entry.entryType,
            metric_value: entry.duration || (entry as PerformanceEntryWithValue).value,
            page_path: window.location.pathname
          });
        }
      }
    }
  });

  observer.observe({ entryTypes: ['navigation', 'paint', 'layout-shift'] });

  // Track user interactions
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('[data-track]')) {
      if (typeof gtag === 'function') {
        gtag('event', 'profile_interaction', {
          element: target.dataset.track,
          page_path: window.location.pathname
        });
      }
    }
  });
}
