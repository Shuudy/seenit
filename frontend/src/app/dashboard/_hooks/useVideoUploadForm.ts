import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const createVideoUploadFormSchema = (t: (key: string) => string) =>
  z.object({
    title: z
      .string()
      .trim()
      .min(1, { message: t('videoTitleRequired') })
      .max(100, { message: t('videoTitleTooLong') }),
    description: z
      .string()
      .trim()
      .min(1, { message: t('videoDescriptionRequired') })
      .max(500, { message: t('videoDescriptionTooLong') }),
    file: z
      .custom<FileList | undefined>()
      .refine(files => files?.length, { message: t('videoFileRequired') })
      .refine(
        files => {
          if (!files?.length) return true;
          return files[0].type.startsWith('video/');
        },
        { message: t('videoFileMustBeVideo') }
      ),
  });

export type VideoUploadFormFields = z.infer<ReturnType<typeof createVideoUploadFormSchema>>;

export function useVideoUploadForm() {
  const t = useTranslations('dashboard');

  const VideoUploadFormSchema = createVideoUploadFormSchema(t);

  return useForm<VideoUploadFormFields>({
    resolver: zodResolver(VideoUploadFormSchema),
  });
}
