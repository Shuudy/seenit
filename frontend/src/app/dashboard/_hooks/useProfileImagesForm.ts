import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';

const createProfileImagesFormSchema = (t: (key: string) => string) =>
  z.object({
    banner: z
      .custom<FileList | undefined>(value => {
        if (value == undefined) return true;

        if (typeof FileList === 'undefined') return true;

        return value instanceof FileList;
      })
      .optional()
      .refine(
        files => {
          if (!files || files.length === 0) return true;

          return [...files].every(file => file.type.startsWith('image/'));
        },
        { message: t('invalidImage') }
      ),

    avatar: z
      .custom<FileList | undefined>(value => {
        if (value == undefined) return true;

        if (typeof FileList === 'undefined') return true;

        return value instanceof FileList;
      })
      .optional()
      .refine(
        files => {
          if (!files || files.length === 0) return true;

          return [...files].every(file => file.type.startsWith('image/'));
        },
        { message: t('invalidImage') }
      ),
  });

export type ProfileImagesFormFields = z.infer<ReturnType<typeof createProfileImagesFormSchema>>;

export function useProfileImagesForm() {
  const t = useTranslations('dashboard');

  const ProfileImagesFormSchema = createProfileImagesFormSchema(t);

  return useForm<ProfileImagesFormFields>({
    resolver: zodResolver(ProfileImagesFormSchema),
  });
}
