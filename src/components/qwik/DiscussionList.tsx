import { component$, useSignal, useComputed$ } from '@builder.io/qwik';
import ThreadRow, { type Thread } from './ThreadRow';
import { mockThreads } from '../../data/mockThreads';
import { mockThreadDetails } from '../../data/mockThreadDetails';

const subforums = [
  { id: 'all', label: 'Semua', icon: '🏠' },
  { id: 'modern', label: 'Fisika Modern', icon: '⚛️' },
  { id: 'mechanics', label: 'Mekanika', icon: '🔧' },
  { id: 'olympiad', label: 'Olimpiade', icon: '🏆' },
  { id: 'career', label: 'Karir & Kuliah', icon: '💼' },
  { id: 'lounge', label: 'Lounge', icon: '🎮' },
];

// Dynamic thread data sync
const syncThreadData = (thread: Thread) => {
  const detail = mockThreadDetails[thread.id];
  if (!detail) return thread;

  // Calculate dynamic reply count
  let replyCount = detail.replies.length;
  detail.replies.forEach(reply => {
    if (reply.nested) replyCount += reply.nested.length;
  });

  // Calculate last activity and reply by
  let lastActivity = thread.lastActivity;
  let lastReplyBy = thread.lastReplyBy;
  
  if (detail.replies.length > 0) {
    const allReplies = [...detail.replies];
    detail.replies.forEach(reply => {
      if (reply.nested) allReplies.push(...reply.nested);
    });
    
    // Sort by time (rough approximation)
    const latest = allReplies.sort((a, b) => {
      const timeA = a.createdAt.includes('menit') ? 1 : 
                   a.createdAt.includes('jam') ? parseInt(a.createdAt) * 60 :
                   parseInt(a.createdAt) * 1440;
      const timeB = b.createdAt.includes('menit') ? 1 : 
                   b.createdAt.includes('jam') ? parseInt(b.createdAt) * 60 :
                   parseInt(b.createdAt) * 1440;
      return timeA - timeB;
    })[0];
    
    lastActivity = latest.createdAt;
    lastReplyBy = latest.author.name;
  }

  // Calculate hot status
  const recentActivity = lastActivity.includes('jam') || lastActivity.includes('menit');
  const highEngagement = detail.cendol > 50 || replyCount > 20;
  const isHot = recentActivity && highEngagement;

  return {
    ...thread,
    replyCount,
    lastActivity,
    lastReplyBy,
    isHot,
    cendol: detail.cendol,
    bata: detail.bata
  };
};

export default component$(() => {
  const activeTab = useSignal('all');
  const currentPage = useSignal(1);
  const activeTag = useSignal('');
  const searchQuery = useSignal('');
  const itemsPerPage = 5;

  // Sync all threads with dynamic data
  const syncedThreads = useComputed$(() => {
    return mockThreads.map(thread => syncThreadData(thread));
  });

  const filteredThreads = useComputed$(() => {
    let threads = syncedThreads.value;
    
    // Filter by category
    if (activeTab.value !== 'all') {
      threads = threads.filter(t => t.category === activeTab.value);
    }
    
    // Filter by tag
    if (activeTag.value) {
      threads = threads.filter(t => 
        t.tags && t.tags.some(tag => tag.toLowerCase().includes(activeTag.value.toLowerCase()))
      );
    }
    
    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      threads = threads.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.excerpt?.toLowerCase().includes(query) ||
        t.author.name.toLowerCase().includes(query) ||
        t.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return threads;
  });

  // Sort by last activity (most recent first)
  const sortedThreads = useComputed$(() => {
    return filteredThreads.value.sort((a, b) => {
      // Sticky threads first
      if (a.isSticky && !b.isSticky) return -1;
      if (!a.isSticky && b.isSticky) return 1;
      
      // Then by activity time (rough sort)
      const timeA = a.lastActivity.includes('menit') ? 1 : 
                   a.lastActivity.includes('jam') ? parseInt(a.lastActivity) * 60 :
                   parseInt(a.lastActivity) * 1440;
      const timeB = b.lastActivity.includes('menit') ? 1 : 
                   b.lastActivity.includes('jam') ? parseInt(b.lastActivity) * 60 :
                   parseInt(b.lastActivity) * 1440;
      return timeA - timeB;
    });
  });

  const totalPages = useComputed$(() => Math.ceil(sortedThreads.value.length / itemsPerPage));

  // Paginated threads
  const paginatedThreads = useComputed$(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return sortedThreads.value.slice(start, start + itemsPerPage);
  });

  return (
    <div>
      {/* Header */}
      <div class="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-2xl p-5 flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-3">
          <span class="text-3xl">💬</span>
          <div>
            <h1 class="text-xl font-bold">Forum Diskusi Fisika</h1>
            <p class="text-sm opacity-90">Pair of Minds, Pair of Hands</p>
          </div>
        </div>
        <a href="/platform/discussions/new" class="bg-white text-green-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-50 transition shadow-sm">
          + Buat Thread
        </a>
      </div>

      {/* Active Tag Filter */}
      {activeTag.value && (
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-blue-600 font-medium">Filter aktif:</span>
            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
              #{activeTag.value}
            </span>
          </div>
          <button 
            onClick$={() => { activeTag.value = ''; currentPage.value = 1; }}
            class="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Hapus Filter
          </button>
        </div>
      )}

      {/* Tabs */}
      <div class="bg-white rounded-b-2xl shadow-sm p-2 mb-4 overflow-x-auto">
        <div class="flex gap-1">
          {subforums.map((tab) => (
            <button
              key={tab.id}
              onClick$={() => { activeTab.value = tab.id; currentPage.value = 1; }}
              class={`px-4 py-2 rounded-xl font-medium text-sm transition whitespace-nowrap ${
                activeTab.value === tab.id
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div class="ml-2 flex items-center justify-between mb-3 text-sm">
        <div class="flex items-center gap-4 text-gray-500">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            23 online
          </span>
          <span>1,234 thread</span>
          <span>5,678 balasan</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <span class="text-gray-400 text-xs">Urutkan:</span>
            <select class="text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 text-gray-600">
              <option>Terbaru</option>
              <option>Terpopuler</option>
              <option>Paling Dibalas</option>
            </select>
          </div>
          <div class="relative">
            <input 
              type="text"
              placeholder="Cari thread..."
              value={searchQuery.value}
              onInput$={(e) => { searchQuery.value = (e.target as HTMLInputElement).value; currentPage.value = 1; }}
              class="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-gray-600 w-48 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <span class="absolute right-2.5 top-1.5 text-gray-400 text-sm">🔍</span>
          </div>
        </div>
      </div>

      {/* Thread List */}
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden" id="thread-list">
        {/* Table Header */}
        <div class="px-4 py-3 grid grid-cols-12 gap-4 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100">
          <div class="col-span-6">Topik</div>
          <div class="col-span-2 text-center">Penulis</div>
          <div class="col-span-2 text-center">🥒 / 💬</div>
          <div class="col-span-2 text-center">Aktivitas</div>
        </div>

        {/* Threads */}
        {paginatedThreads.value.length === 0 ? (
          <div class="p-12 text-center text-gray-400">
            <span class="text-4xl mb-2 block">📭</span>
            {activeTag.value ? `Tidak ada thread dengan tag "${activeTag.value}"` : 'Belum ada thread di kategori ini'}
          </div>
        ) : (
          paginatedThreads.value.map(thread => (
            <ThreadRow key={thread.id} thread={thread} />
          ))
        )}
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('tag-filter', function(e) {
            // This will be handled by Qwik's reactivity
            window.dispatchEvent(new CustomEvent('qwik-tag-filter', { detail: e.detail }));
          });
        `
      }} />

      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('qwik-tag-filter', function(e) {
            // Update URL with tag parameter
            const url = new URL(window.location);
            url.searchParams.set('tag', e.detail);
            window.history.pushState({}, '', url);
            
            // Trigger page reload to apply filter
            window.location.reload();
          });
        `
      }} />

      {/* Pagination */}
      {totalPages.value > 1 && (
        <div class="flex items-center justify-between mt-4 text-sm">
          <div class="text-gray-500">
            Menampilkan {((currentPage.value - 1) * itemsPerPage) + 1}-{Math.min(currentPage.value * itemsPerPage, sortedThreads.value.length)} dari {sortedThreads.value.length} thread
          </div>
          <div class="flex gap-1">
            {Array.from({ length: totalPages.value }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick$={() => currentPage.value = page}
                class={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  currentPage.value === page
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
