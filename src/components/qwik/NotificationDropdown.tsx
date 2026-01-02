import { component$, useSignal, $ } from '@builder.io/qwik';
import { mockNotifications, getNotificationIcon, getNotificationColor, markAllNotificationsAsRead } from '@data/mockNotifications';

export default component$(() => {
  const isOpen = useSignal(false);
  const notifications = useSignal([...mockNotifications]);

  const unreadCount = notifications.value.filter(n => !n.read).length;

  const toggleDropdown = $(() => {
    isOpen.value = !isOpen.value;
  });

  const closeDropdown = $(() => {
    isOpen.value = false;
  });

  const markAllRead = $(() => {
    notifications.value = notifications.value.map(n => ({ ...n, read: true }));
    markAllNotificationsAsRead();
  });

  const markAsRead = $((id: string) => {
    notifications.value = notifications.value.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
  });

  const handleNotificationClick = $((notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.link) {
      window.location.href = notification.link;
    }
    closeDropdown();
  });

  return (
    <div class="relative">
      <button 
        onClick$={toggleDropdown}
        class="p-2 hover:bg-gray-200 rounded-full relative transition"
        title="Notifikasi"
      >
        <span class="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen.value && (
        <>
          <div class="fixed inset-0 z-40" onClick$={closeDropdown}></div>
          <div class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
            <div class="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 class="font-semibold text-gray-900">Notifikasi</h3>
              {unreadCount > 0 && (
                <button 
                  onClick$={markAllRead}
                  class="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Tandai Semua Dibaca
                </button>
              )}
            </div>

            <div class="max-h-80 overflow-y-auto">
              {notifications.value.length === 0 ? (
                <div class="p-8 text-center text-gray-500">
                  <span class="text-4xl mb-2 block">🔔</span>
                  <p>Belum ada notifikasi</p>
                </div>
              ) : (
                notifications.value.map((notification) => (
                  <div
                    key={notification.id}
                    onClick$={() => handleNotificationClick(notification)}
                    class={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div class="flex gap-3">
                      <div class="flex-shrink-0">
                        {notification.avatar.length === 1 ? (
                          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {notification.avatar}
                          </div>
                        ) : (
                          <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                            {notification.avatar}
                          </div>
                        )}
                      </div>

                      <div class="flex-1 min-w-0">
                        <div class="flex items-start gap-2">
                          <span class={`text-lg ${getNotificationColor(notification.type)}`}>
                            {getNotificationIcon(notification.type)}
                          </span>
                          <div class="flex-1">
                            <p class="text-sm font-medium text-gray-900 mb-1">
                              {notification.title}
                            </p>
                            <p class="text-sm text-gray-600 line-clamp-2">
                              {notification.message}
                            </p>
                            <p class="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div class="p-3 border-t border-gray-100 text-center">
              <a 
                href="/platform/notifications" 
                class="text-sm text-green-600 hover:text-green-700 font-medium"
                onClick$={closeDropdown}
              >
                Lihat Semua Notifikasi
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
});
