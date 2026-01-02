import { component$, useSignal, $ } from '@builder.io/qwik';
import { mockMessages, markAllMessagesAsRead } from '@data/mockMessages';

export default component$(() => {
  const isOpen = useSignal(false);
  const messages = useSignal([...mockMessages]);

  const unreadCount = messages.value.filter(m => !m.read).length;

  const toggleDropdown = $(() => {
    isOpen.value = !isOpen.value;
  });

  const closeDropdown = $(() => {
    isOpen.value = false;
  });

  const markAllRead = $(() => {
    messages.value = messages.value.map(m => ({ ...m, read: true }));
    markAllMessagesAsRead();
  });

  const handleMessageClick = $((message: any) => {
    if (!message.read) {
      messages.value = messages.value.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      );
    }
    // Navigate to conversation
    window.location.href = `/platform/messages/${message.from.username}`;
    closeDropdown();
  });

  const truncateMessage = (text: string, maxLength: number = 50): string => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div class="relative">
      <button 
        onClick$={toggleDropdown}
        class="p-2 hover:bg-gray-200 rounded-full relative transition"
        title="Pesan"
      >
        <span class="text-xl">💬</span>
        {unreadCount > 0 && (
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen.value && (
        <>
          <div class="fixed inset-0 z-40" onClick$={closeDropdown}></div>
          <div class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div class="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 class="font-semibold text-gray-900">Pesan</h3>
              <div class="flex gap-2">
                {unreadCount > 0 && (
                  <button 
                    onClick$={markAllRead}
                    class="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Tandai Dibaca
                  </button>
                )}
                <a 
                  href="/platform/messages/new"
                  class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  onClick$={closeDropdown}
                >
                  Tulis Baru
                </a>
              </div>
            </div>

            {/* Messages List */}
            <div class="max-h-80 overflow-y-auto">
              {messages.value.length === 0 ? (
                <div class="p-8 text-center text-gray-500">
                  <span class="text-4xl mb-2 block">💬</span>
                  <p>Belum ada pesan</p>
                </div>
              ) : (
                messages.value.slice(0, 5).map((message) => (
                  <div
                    key={message.id}
                    onClick$={() => handleMessageClick(message)}
                    class={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition ${
                      !message.read ? 'bg-green-50' : ''
                    }`}
                  >
                    <div class="flex gap-3">
                      {/* Avatar */}
                      <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {message.from.avatar}
                        </div>
                      </div>

                      {/* Content */}
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between">
                          <p class="text-sm font-medium text-gray-900">
                            {message.from.displayName}
                          </p>
                          <div class="flex items-center gap-2">
                            <p class="text-xs text-gray-400">{message.time}</p>
                            {!message.read && (
                              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        
                        {message.subject && (
                          <p class="text-sm font-medium text-gray-700 mt-1">
                            {truncateMessage(message.subject, 35)}
                          </p>
                        )}
                        
                        <p class="text-sm text-gray-600 mt-1">
                          {truncateMessage(message.message)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div class="p-3 border-t border-gray-100 text-center">
              <a 
                href="/platform/messages" 
                class="text-sm text-green-600 hover:text-green-700 font-medium"
                onClick$={closeDropdown}
              >
                Lihat Semua Pesan
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
