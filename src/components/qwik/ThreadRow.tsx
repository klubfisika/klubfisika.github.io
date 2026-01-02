import { component$ } from '@builder.io/qwik';

export interface Thread {
  id: string;
  title: string;
  type?: 'ask' | 'share' | 'tutorial' | 'debat' | 'proyek' | 'megathread';
  excerpt?: string;
  author: {
    name: string;
    avatar?: string;
    rank?: string;
    posts?: number;
  };
  tags?: string[];
  replyCount: number;
  lastActivity: string;
  lastReplyBy?: string;
  cendol: number;
  bata: number;
  isSticky?: boolean;
  isHot?: boolean;
  isSolved?: boolean;
  isLocked?: boolean;
  lockReason?: string;
  lockedAt?: string;
  category?: string;
}

interface Props {
  thread: Thread;
}

const typeConfig: Record<string, { label: string; color: string }> = {
  ask: { label: 'ASK', color: 'bg-blue-100 text-blue-700' },
  share: { label: 'SHARE', color: 'bg-green-100 text-green-700' },
  tutorial: { label: 'TUTORIAL', color: 'bg-purple-100 text-purple-700' },
  debat: { label: 'DEBAT', color: 'bg-orange-100 text-orange-700' },
  proyek: { label: 'PROYEK', color: 'bg-red-100 text-red-700' },
  megathread: { label: 'MEGATHREAD', color: 'bg-amber-100 text-amber-700' },
};

const rankConfig: Record<string, string> = {
  'Newbie': 'text-gray-500',
  'Kaskuser': 'text-blue-600',
  'Aktivis': 'text-green-600',
  'Kaskus Holic': 'text-purple-600',
  'Kaskus Addict': 'text-orange-600',
  'Kaskus Maniac': 'text-red-600',
  'Kaskus Geek': 'text-amber-600',
};

export default component$<Props>(({ thread }) => {
  const netScore = thread.cendol - thread.bata;
  const isNegative = netScore < 0;
  
  const getBgClass = () => {
    if (thread.isSticky) return 'bg-amber-50/50';
    if (isNegative) return 'bg-red-50/30';
    return '';
  };

  const rankColor = thread.author.rank ? rankConfig[thread.author.rank] || 'text-gray-500' : 'text-gray-500';
  const typeInfo = thread.type ? typeConfig[thread.type] : null;

  return (
    <a 
      href={`/platform/discussions/${thread.id}`}
      class={`grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-50 hover:bg-gray-50/80 transition cursor-pointer ${getBgClass()}`}
    >
      {/* Topic */}
      <div class="col-span-6">
        {/* Badges Row */}
        <div class="flex items-center gap-1.5 mb-1.5 flex-wrap">
          {thread.isSticky && (
            <span class="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">📌 Sticky</span>
          )}
          {thread.isHot && (
            <span class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">🔥 Hot</span>
          )}
          {typeInfo && (
            <span class={`text-xs px-2 py-0.5 rounded-full font-medium ${typeInfo.color}`}>
              {typeInfo.label}
            </span>
          )}
          {thread.isSolved && (
            <span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">✓ Solved</span>
          )}
          {thread.isLocked && (
            <span class="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">🔒 Locked</span>
          )}
        </div>
        
        {/* Title */}
        <h3 class="font-semibold text-gray-800 hover:text-green-600 transition line-clamp-1">
          {thread.title}
        </h3>
        
        {/* Excerpt */}
        {thread.excerpt && (
          <p class="text-sm text-gray-500 mt-1 line-clamp-1">{thread.excerpt}</p>
        )}
        
        {/* Tags */}
        {thread.tags && thread.tags.length > 0 && (
          <div class="flex gap-1.5 mt-2">
            {thread.tags.slice(0, 4).map(tag => (
              <button 
                key={tag} 
                class="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full hover:bg-green-100 hover:text-green-600 transition"
                onClick$={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Dispatch custom event to parent
                  const event = new CustomEvent('tag-filter', { detail: tag });
                  document.dispatchEvent(event);
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Author */}
      <div class="col-span-2 flex flex-col items-center justify-center">
        <div class="w-9 h-9 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm font-bold mb-1">
          {thread.author.avatar || thread.author.name[0]?.toUpperCase()}
        </div>
        <div class="text-sm font-medium text-gray-700 truncate max-w-full">{thread.author.name}</div>
        {thread.author.rank && (
          <div class={`text-xs font-medium ${rankColor}`}>{thread.author.rank}</div>
        )}
      </div>
      
      {/* Stats - Cendol/Bata & Reply */}
      <div class="col-span-2 flex flex-col items-center justify-center gap-1">
        <div class="flex items-center gap-2">
          <span class="flex items-center gap-0.5 text-sm">
            <span>🥒</span>
            <span class="text-green-600 font-medium">{thread.cendol}</span>
          </span>
          {thread.bata > 0 && (
            <span class="flex items-center gap-0.5 text-sm">
              <span>🧱</span>
              <span class="text-red-500 font-medium">{thread.bata}</span>
            </span>
          )}
        </div>
        <div class="text-xs text-gray-400">{thread.replyCount} balasan</div>
      </div>
      
      {/* Last Activity */}
      <div class="col-span-2 flex flex-col items-center justify-center text-center">
        <div class="text-sm text-gray-600">{thread.lastActivity}</div>
        {thread.lastReplyBy && (
          <div class="text-xs text-gray-400">oleh @{thread.lastReplyBy}</div>
        )}
      </div>
    </a>
  );
});
