import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createCommentFormSchema = (t: (key: string) => string) =>
  z.object({
    comment: z
      .string()
      .min(1, { message: t('commentRequired') })
      .max(500, { message: t('commentTooLong') }),
  });

export type CommentFormFields = z.infer<ReturnType<typeof createCommentFormSchema>>;

export function useCommentForm() {
  const t = useTranslations('common');

  const CommentFormSchema = createCommentFormSchema(t);

  return useForm<CommentFormFields>({
    resolver: zodResolver(CommentFormSchema),
  });
}
