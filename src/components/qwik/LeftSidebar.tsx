import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

interface Props {
  activeNav?: string;
}

const navItems = [
  { href: '/platform/feed', label: 'Home', icon: '🏠' },
  { href: '/platform/discussions', label: 'Forum', icon: '💬' },
  { href: '/platform/projects', label: 'Projects', icon: '🔬' },
  { href: '/platform/shorts', label: 'Shorts', icon: '🎬' },
  { href: '/platform/explore', label: 'Explore', icon: '🔍' },
];

const trendingTopics = [
  '#osn-fisika-2026',
  '#diy-eksperimen', 
  '#quantum-computing',
  '#arduino-physics',
];

export default component$<Props>(({ activeNav }) => {
  const isMinimized = useSignal(false);

  useVisibleTask$(() => {
    const saved = localStorage.getItem('sidebar-minimized');
    if (saved === 'true') {
      isMinimized.value = true;
    }
  });

  const toggleSidebar = $(() => {
    isMinimized.value = !isMinimized.value;
    localStorage.setItem('sidebar-minimized', String(isMinimized.value));
    window.dispatchEvent(new CustomEvent('sidebar-toggle', { detail: isMinimized.value }));
  });

  return (
    <aside 
      class={`hidden lg:flex flex-col fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-gray-50 border-r border-gray-100 z-10 transition-all duration-300 ${
        isMinimized.value ? 'w-16' : 'w-64'
      }`}
    >
      {/* Main Nav */}
      <div class={`flex-1 p-3 ${isMinimized.value ? 'px-2' : ''}`}>
        <nav class="space-y-1">
          {navItems.map(item => (
            <a 
              key={item.href}
              href={item.href} 
              class={`flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isMinimized.value ? 'justify-center px-0' : 'px-3'
              } ${
                activeNav === item.href 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
              title={isMinimized.value ? item.label : undefined}
            >
              <span class={`${isMinimized.value ? 'text-xl' : 'text-lg'}`}>{item.icon}</span>
              {!isMinimized.value && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
        
        {!isMinimized.value && (
          <>
            <hr class="my-4 border-gray-100" />
            
            <div class="px-3 text-xs font-semibold text-gray-400 uppercase mb-2">Trending</div>
            <div class="space-y-0.5">
              {trendingTopics.map(topic => (
                <a key={topic} href="#" class="block px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg truncate">
                  {topic}
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Section */}
      <div class={`border-t border-gray-100 p-3 ${isMinimized.value ? 'px-2' : ''}`}>
        {!isMinimized.value && (
          <a href="/" class="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:bg-gray-200 rounded-lg transition">
            <span>🌐</span> Kembali ke Website
          </a>
        )}
        
        {isMinimized.value && (
          <a href="/" class="flex justify-center py-2 text-gray-500 hover:bg-gray-200 rounded-lg transition" title="Kembali ke Website">
            <span>🌐</span>
          </a>
        )}

        {/* Toggle Button */}
        <button
          onClick$={toggleSidebar}
          class={`mt-2 w-full flex items-center gap-2 py-2 text-sm text-gray-500 hover:bg-gray-200 rounded-lg transition ${
            isMinimized.value ? 'justify-center' : 'px-3'
          }`}
          title={isMinimized.value ? 'Expand sidebar' : 'Minimize sidebar'}
        >
          <span class={`transition-transform duration-300 ${isMinimized.value ? 'rotate-180' : ''}`}>
            «
          </span>
          {!isMinimized.value && <span>Minimize</span>}
        </button>
      </div>
    </aside>
  );
});
