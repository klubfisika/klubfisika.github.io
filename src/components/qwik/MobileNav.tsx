import { component$ } from '@builder.io/qwik';

interface Props {
  activeNav?: string;
}

export default component$<Props>(({ activeNav }) => {
  const navItems = [
    { href: '/platform/overview', label: 'Home', icon: '🏠' },
    { href: '/platform/discussions', label: 'Forum', icon: '💬' },
    { href: '/platform/projects', label: 'Projects', icon: '🔬' },
    { href: '/platform/shorts', label: 'Shorts', icon: '🎬' },
    { href: '/platform/explore', label: 'Explore', icon: '🔍' },
  ];

  return (
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div class="flex justify-around py-2">
        {navItems.map(item => (
          <a 
            key={item.href}
            href={item.href} 
            class={`flex flex-col items-center py-1 px-3 rounded-lg transition ${
              activeNav === item.href ? "text-green-600" : "text-gray-500"
            }`}
          >
            <span class="text-xl">{item.icon}</span>
            <span class="text-xs mt-0.5">{item.label}</span>
          </a>
        ))}
        <a href="/platform/profile" class="flex flex-col items-center py-1 px-3 text-gray-500">
          <span class="text-xl">👤</span>
          <span class="text-xs mt-0.5">Profil</span>
        </a>
      </div>
    </nav>
  );
});
