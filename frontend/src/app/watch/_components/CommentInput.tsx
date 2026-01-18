'use client';

import { postComment } from '@/lib/api/video';
import { useQueryClient } from '@tanstack/react-query';
import { useState, FormEvent } from 'react';

interface CommentInputProps {
  videoId: string;
}

export function CommentInput({ videoId }: CommentInputProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const trimmedContent = content.trim();
    if (!trimmedContent || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);
      await postComment(videoId, trimmedContent);

      // Clear the input
      setContent('');

      // Invalidate and refetch comments
      await queryClient.invalidateQueries({
        queryKey: ['video-comments', videoId],
      });
    } catch (error) {
      console.error('Failed to post comment:', error);
      // You could add error handling UI here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 pb-6">
      <div className="bg-secondary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
        <span className="text-foreground text-sm font-semibold">V</span>
      </div>

      <input
        type="text"
        placeholder="Ajouter un commentaire..."
        value={content}
        onChange={event => setContent(event.target.value)}
        disabled={isSubmitting}
        className="text-foreground border-secondary focus:border-foreground placeholder-muted-foreground flex-1 border-b bg-transparent px-2 py-2 text-sm transition-colors focus:outline-none disabled:opacity-50"
      />
    </form>
  );
}
