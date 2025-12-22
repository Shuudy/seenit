'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { EMOJI_DATA } from '@/app/watch/_constants/emoji-data';

export function useCommentSection(onAddComment?: (text: string) => void) {
  const [commentText, setCommentText] = useState('');
  const [showCommentActions, setShowCommentActions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [activeCategory, setActiveCategory] = useState('youtube');
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleAddComment = useCallback(() => {
    if (!commentText.trim()) return;

    if (onAddComment) {
      onAddComment(commentText);
    }

    setCommentText('');
    setShowCommentActions(false);
    setIsInputFocused(false);
    setShowEmojiPanel(false);
  }, [commentText, onAddComment]);

  const handleCancelComment = useCallback(() => {
    setCommentText('');
    setShowCommentActions(false);
    setIsInputFocused(false);
    setShowEmojiPanel(false);
  }, []);

  const handleFormatText = useCallback(
    (markdown: string) => {
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
        newText =
          commentText.substring(0, start) + markdown + markdown + commentText.substring(end);

        newCursorPos = start + markdown.length;
      }

      setCommentText(newText);

      setTimeout(() => {
        input.focus();
        input.selectionStart = newCursorPos;
        input.selectionEnd = newCursorPos;
      }, 0);
    },
    [commentText]
  );

  const handleInsertEmoji = useCallback(
    (emoji: string) => {
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
    },
    [commentText]
  );

  const scrollToCategory = useCallback((id: string) => {
    setActiveCategory(id);
    const element = categoryRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const filteredEmojiData = EMOJI_DATA.map(cat => ({
    ...cat,
    emojis: cat.emojis.filter(e => !searchQuery || e.includes(searchQuery)),
  })).filter(cat => cat.emojis.length > 0);

  return {
    commentText,
    setCommentText,
    showCommentActions,
    setShowCommentActions,
    isInputFocused,
    setIsInputFocused,
    showEmojiPanel,
    setShowEmojiPanel,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    emojiPanelRef,
    emojiTriggerRef,
    categoryRefs,
    handleAddComment,
    handleCancelComment,
    handleFormatText,
    handleInsertEmoji,
    scrollToCategory,
    filteredEmojiData,
  };
}
