'use client';

import { EmojiPicker } from '@/app/watch/_components/emoji-picker';
import { EMOJI_DATA } from '@/app/watch/_constants/emoji-data';

interface CommentInputProps {
  commentText: string;
  setCommentText: (text: string) => void;
  showCommentActions: boolean;
  setShowCommentActions: (show: boolean) => void;
  isInputFocused: boolean;
  setIsInputFocused: (focused: boolean) => void;
  showEmojiPanel: boolean;
  setShowEmojiPanel: (show: (prev: boolean) => boolean) => void;
  emojiTriggerRef: React.RefObject<HTMLButtonElement | null>;
  emojiPanelRef: React.RefObject<HTMLDivElement | null>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  scrollToCategory: (id: string) => void;
  filteredEmojiData: typeof EMOJI_DATA;
  categoryRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  handleInsertEmoji: (emoji: string) => void;
  handleFormatText: (markdown: string) => void;
  handleAddComment: () => void;
  handleCancelComment: () => void;
}

export function CommentInput({
  commentText,
  setCommentText,
  showCommentActions,
  setShowCommentActions,
  isInputFocused,
  setIsInputFocused,
  showEmojiPanel,
  setShowEmojiPanel,
  emojiTriggerRef,
  emojiPanelRef,
  searchQuery,
  setSearchQuery,
  activeCategory,
  scrollToCategory,
  filteredEmojiData,
  categoryRefs,
  handleInsertEmoji,
  handleFormatText,
  handleAddComment,
  handleCancelComment,
}: CommentInputProps) {
  return (
    <div className="flex gap-3 pb-6">
      <div className="bg-secondary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
        <span className="text-foreground text-sm font-semibold">V</span>
      </div>
      <div className="flex-1">
        <div className="relative">
          <input
            id="comment-input"
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            onFocus={() => {
              setShowCommentActions(true);
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
            placeholder={showCommentActions ? '' : 'Ajouter un commentaire public...'}
            className="peer text-foreground border-secondary placeholder-muted-foreground w-full border-b bg-transparent px-2 py-2 text-sm focus:ring-0 focus:outline-none"
          />

          <div
            className={`bg-foreground absolute bottom-0 left-0 h-[2px] w-full origin-center transition-transform ${isInputFocused ? 'duration-300' : 'duration-0'} ${isInputFocused ? 'scale-x-100' : 'scale-x-0'}`}
          />
        </div>

        {(showCommentActions || commentText.length > 0) && (
          <div className="mt-2 flex items-center justify-between">
            <div className="relative flex items-center gap-1">
              <button
                ref={emojiTriggerRef}
                onClick={() => setShowEmojiPanel(s => !s)}
                onMouseDown={e => e.preventDefault()}
                className="text-foreground hover:bg-secondary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors"
                title="Emoji"
                aria-expanded={showEmojiPanel}
              >
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                  className="pointer-events-none block h-5 w-5 fill-current"
                >
                  <path d="M12,21c4.97,0,9-4.03,9-9S16.97,3,12,3S3,7.03,3,12S7.03,21,12,21z M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8 S7.59,4,12,4z M15.5,11c0.83,0,1.5-0.67,1.5-1.5S16.33,8,15.5,8S14,8.67,14,9.5S14.67,11,15.5,11z M8.5,11C9.33,11,10,10.33,10,9.5 S9.33,8,8.5,8S7,8.67,7,9.5S7.67,11,8.5,11z M12,17c2.03,0,3.8-1.11,4.75-2.75l-0.85-0.5C15.2,15.01,13.73,16,12,16 s-3.2-0.99-3.9-2.25l-0.85,0.5C8.2,15.89,9.97,17,12,17z"></path>
                </svg>
              </button>

              <button
                onClick={() => handleFormatText('*')}
                onMouseDown={e => e.preventDefault()}
                className="ml-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-[2px] bg-white text-xs font-bold text-black transition-colors hover:bg-gray-200"
                title="Gras (*texte*)"
              >
                B
              </button>

              <button
                onClick={() => handleFormatText('_')}
                onMouseDown={e => e.preventDefault()}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-[2px] bg-white font-serif text-xs text-black italic transition-colors hover:bg-gray-200"
                title="Italique (_texte_)"
              >
                I
              </button>

              <button
                onClick={() => handleFormatText('-')}
                onMouseDown={e => e.preventDefault()}
                className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-[2px] bg-white text-black transition-colors hover:bg-gray-200"
                title="Barré (-texte-)"
              >
                <span className="relative text-[10px] font-semibold">
                  S
                  <div className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 transform bg-black"></div>
                </span>
              </button>

              <EmojiPicker
                showEmojiPanel={showEmojiPanel}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                scrollToCategory={scrollToCategory}
                filteredEmojiData={filteredEmojiData}
                emojiPanelRef={emojiPanelRef}
                categoryRefs={categoryRefs}
                handleInsertEmoji={handleInsertEmoji}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelComment}
                className="text-foreground hover:bg-secondary-foreground/10 rounded-3xl px-4 py-2 text-sm font-medium transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddComment}
                disabled={!commentText.trim()}
                className={`rounded-3xl px-4 py-2 text-sm font-medium transition-colors ${
                  commentText.trim()
                    ? 'cursor-pointer bg-[#3ea6ff] text-black hover:bg-[#65b8ff]'
                    : 'bg-secondary text-muted-foreground cursor-default'
                }`}
              >
                Ajouter un commentaire
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
