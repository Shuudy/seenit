'use client';

import { EMOJI_DATA } from '@/app/watch/_constants/emoji-data';

interface EmojiPickerProps {
  showEmojiPanel: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  scrollToCategory: (id: string) => void;
  filteredEmojiData: typeof EMOJI_DATA;
  emojiPanelRef: React.RefObject<HTMLDivElement | null>;
  categoryRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  handleInsertEmoji: (emoji: string) => void;
}

export function EmojiPicker({
  showEmojiPanel,
  searchQuery,
  setSearchQuery,
  activeCategory,
  scrollToCategory,
  filteredEmojiData,
  emojiPanelRef,
  categoryRefs,
  handleInsertEmoji,
}: EmojiPickerProps) {
  if (!showEmojiPanel) return null;

  return (
    <div
      ref={emojiPanelRef}
      className="absolute top-10 left-0 z-20 flex h-[280px] w-[460px] flex-col overflow-hidden rounded-xl border border-[#3e3e3e] bg-[#212121] shadow-2xl"
      onMouseDown={e => e.preventDefault()}
    >
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent; 
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #717171;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #555;
          }
        `}
      </style>
      <div className="sticky top-0 z-10 border-b border-[#3e3e3e]/30 bg-[#212121] p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher des emoji"
            className="w-full rounded-sm bg-[#3d3d3d] py-1.5 pr-8 pl-3 text-sm text-[#aaaaaa] placeholder-[#aaaaaa] focus:outline-none"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <div className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform rounded-[2px] bg-[#fbbc04]"></div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 border-b border-[#3e3e3e]/50 bg-[#212121] px-2 py-2">
        {EMOJI_DATA.map(category => (
          <button
            key={category.id}
            onClick={() => scrollToCategory(category.id)}
            className={`group relative rounded-full p-1.5 transition-colors hover:bg-[#3d3d3d]`}
            title={category.label}
          >
            {category.icon(activeCategory === category.id)}
            {activeCategory === category.id && (
              <div className="absolute -bottom-2 left-1/2 h-[2px] w-full -translate-x-1/2 transform rounded-t-full bg-white"></div>
            )}
          </button>
        ))}
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-2">
        {filteredEmojiData.map(category => (
          <div
            key={category.id}
            id={category.id}
            ref={el => {
              categoryRefs.current[category.id] = el;
            }}
            className="mb-4"
          >
            <h4 className="mb-2 px-1 text-[11px] font-bold tracking-wide text-[#aaaaaa] uppercase">
              {category.label}
            </h4>
            <div className="grid grid-cols-11 gap-0">
              {category.emojis.map((emoji, idx) => (
                <button
                  key={`${category.id}-${idx}`}
                  onClick={() => handleInsertEmoji(emoji)}
                  className="flex h-8 w-8 items-center justify-center justify-self-center rounded text-xl transition-colors hover:bg-[#3d3d3d]"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
        {filteredEmojiData.length === 0 && (
          <div className="mt-10 text-center text-sm text-[#aaaaaa]">Aucun emoji trouvé</div>
        )}
      </div>
    </div>
  );
}
