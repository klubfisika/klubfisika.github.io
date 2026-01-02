import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

export default component$(() => {
  const isOpen = useSignal(false);
  const user = useSignal<{ name: string; username: string } | null>(null);
  
  useVisibleTask$(() => {
    const member = localStorage.getItem('kf13-member');
    if (member) {
      const userData = JSON.parse(member);
      user.value = {
        name: userData.name || 'Member',
        username: userData.username || userData.name?.toLowerCase().replace(/\s+/g, '_') || 'member'
      };
    }
  });

  const toggleDropdown = $(() => {
    isOpen.value = !isOpen.value;
  });

  const closeDropdown = $(() => {
    isOpen.value = false;
  });

  const logout = $(() => {
    localStorage.removeItem('kf13-member');
    window.location.href = '/mulai';
  });

  // Show login button if no user
  if (!user.value) {
    return (
      <a href="/mulai" class="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-700 transition">
        Masuk
      </a>
    );
  }

  const initial = user.value.name[0]?.toUpperCase() || 'M';

  return (
    <div class="relative">
      <button 
        onClick$={toggleDropdown}
        class="flex items-center gap-2 p-1 rounded-full transition hover:ring-2 hover:ring-gray-200"
        aria-label="Profile menu"
      >
        <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow">
          {initial}
        </div>
      </button>
      
      {isOpen.value && (
        <>
          {/* Backdrop */}
          <div 
            class="fixed inset-0 z-40" 
            onClick$={closeDropdown}
          />
          
          {/* Dropdown */}
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div class="px-4 py-2 border-b border-gray-100">
              <div class="font-medium text-gray-900 truncate">{user.value.name}</div>
              <div class="text-sm text-gray-500">@{user.value.username}</div>
            </div>
            
            <a 
              href="/platform/profile" 
              class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition"
              onClick$={closeDropdown}
            >
              <span>👤</span> Profil Saya
            </a>
            
            <a 
              href={`/${user.value.username}`}
              class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition"
              onClick$={closeDropdown}
            >
              <span>🔗</span> Profil Publik
            </a>
            
            <a 
              href="/platform/overview"
              class="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition"
              onClick$={closeDropdown}
            >
              <span>📊</span> Overview
            </a>
            
            <hr class="my-2 border-gray-100" />
            
            <button 
              onClick$={logout}
              class="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600 transition text-left"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
});
