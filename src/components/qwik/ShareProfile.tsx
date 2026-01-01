import { component$, useSignal } from '@builder.io/qwik';

interface Props {
  username: string;
}

export const ShareProfile = component$<Props>(({ username }) => {
  const copied = useSignal(false);
  
  const copyLink = $(() => {
    const url = `klubfisika.github.io/${username}`;
    navigator.clipboard.writeText(url);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
  });

  return (
    <div class="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl px-4 py-4 text-white shadow-sm">
      <h3 class="font-bold mb-2 flex items-center gap-2">
        <span>🔗</span> Share Profile
      </h3>
      <div class="bg-white/20 rounded-lg px-3 py-2 text-sm font-mono break-all mb-3">
        klubfisika.github.io/{username}
      </div>
      <button 
        onClick$={copyLink}
        class="w-full bg-white text-green-600 py-2 rounded-lg font-medium hover:bg-green-50 transition"
      >
        {copied.value ? '✓ Copied!' : 'Copy Link'}
      </button>
    </div>
  );
});
