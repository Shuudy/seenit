'use client';

import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/header';

import { RecommendedVideoList } from '@/app/watch/_components/recommended-video-list';
import { Suspense } from 'react';
import { VideoDetails } from '@/app/watch/_components/video-details';
import { RecommendedVideoListFallback } from '@/app/watch/_components/fallbacks/recommended-video-list-fallback';
import { VideoInfoFallback } from '@/app/watch/_components/fallbacks/video-info-fallback';
import { Comment } from '@/components/comment';
import { useParams } from 'next/navigation';
import { useVideoCommentsSuspenseQuery } from '../_hooks/queries/useVideoCommentsSuspenseQuery';
import { EMOJI_DATA } from '../_constants/emoji-data';

export default function WatchPage() {
  // const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState('');
  const [showCommentActions, setShowCommentActions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [activeCategory, setActiveCategory] = useState('youtube');
  const [searchQuery, setSearchQuery] = useState('');

  const { id: videoId } = useParams<{ id: string }>();
  const { data } = useVideoCommentsSuspenseQuery(videoId);

  const { comments } = data;

  const emojiPanelRef = useRef<HTMLDivElement>(null);
  const emojiTriggerRef = useRef<HTMLButtonElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showEmojiPanel) {
        if (
          emojiPanelRef.current &&
          !emojiPanelRef.current.contains(event.target as Node) &&
          emojiTriggerRef.current &&
          !emojiTriggerRef.current.contains(event.target as Node)
        ) {
          setShowEmojiPanel(false);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPanel]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    // const newCommentObj = {
    //   id: Date.now(),
    //   username: 'Moi',
    //   avatarLetter: 'V',
    //   content: commentText,
    //   daysAgo: 0,
    // };

    // setComments([newCommentObj, ...comments]);
    setCommentText('');
    setShowCommentActions(false);
    setIsInputFocused(false);
    setShowEmojiPanel(false);
  };

  const handleCancelComment = () => {
    setCommentText('');
    setShowCommentActions(false);
    setIsInputFocused(false);
    setShowEmojiPanel(false);
  };

  const handleFormatText = (markdown: string) => {
    const input = document.getElementById('comment-input') as HTMLInputElement | null;
    if (!input) return;

    const start = input.selectionStart ?? commentText.length;
    const end = input.selectionEnd ?? commentText.length;
    const selectedText = commentText.substring(start, end);

    let newText;
    let newCursorPos;

    if (start !== end) {
      newText =
        commentText.substring(0, start) +
        markdown +
        selectedText +
        markdown +
        commentText.substring(end);

      newCursorPos = end + 2 * markdown.length;
    } else {
      newText = commentText.substring(0, start) + markdown + markdown + commentText.substring(end);

      newCursorPos = start + markdown.length;
    }

    setCommentText(newText);

    setTimeout(() => {
      input.focus();
      input.selectionStart = newCursorPos;
      input.selectionEnd = newCursorPos;
    }, 0);
  };

  const handleInsertEmoji = (emoji: string) => {
    const input = document.getElementById('comment-input') as HTMLInputElement | null;
    if (!input) return;

    const start = input.selectionStart ?? commentText.length;
    const end = input.selectionEnd ?? commentText.length;

    const newText = commentText.substring(0, start) + emoji + commentText.substring(end);

    setCommentText(newText);
    setShowCommentActions(true);

    const newCursorPos = start + emoji.length;

    setTimeout(() => {
      input.focus();
      input.selectionStart = newCursorPos;
      input.selectionEnd = newCursorPos;
    }, 0);
  };

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = categoryRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredEmojiData = EMOJI_DATA.map(cat => ({
    ...cat,
    emojis: cat.emojis.filter(e => !searchQuery || e.includes(searchQuery)),
  })).filter(cat => cat.emojis.length > 0);

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mt-16 w-full px-2 py-6 md:px-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<VideoInfoFallback />}>
              <VideoDetails />
            </Suspense>

            <div className="mt-6">
              <h2 className="text-foreground mb-4 text-base font-bold">
                {comments.length.toLocaleString()} commentaires
              </h2>

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

                        {showEmojiPanel && (
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
                                <div className="mt-10 text-center text-sm text-[#aaaaaa]">
                                  Aucun emoji trouvé
                                </div>
                              )}
                            </div>
                          </div>
                        )}
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

              <div className="space-y-7">
                {comments.map(comment => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-foreground mb-4 text-sm font-bold">Recommandations</h3>
            <Suspense fallback={<RecommendedVideoListFallback />}>
              <RecommendedVideoList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
