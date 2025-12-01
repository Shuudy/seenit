'use client';

import { Comment } from '@/components/comment';

export function CommentList() {
  return (
    <div className="space-y-7">
      {[1, 2, 3].map(i => (
        <Comment
          key={i}
          username={`Utilisateur ${i}`}
          avatarLetter={String.fromCharCode(64 + i)}
          content="Excellent contenu ! Très informatif et bien présenté."
          daysAgo={i}
        />
      ))}
    </div>
  );
}
