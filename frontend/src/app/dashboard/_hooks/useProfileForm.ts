import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';

const createProfileFormSchema = (t: (key: string) => string) =>
  z.object({
    username: z
      .string()
      .min(1, { message: t('usernameRequired') })
      .min(3, { message: t('usernameMinLength') })
      .max(30, { message: t('usernameMaxLength') }),
    email: z
      .string()
      .min(1, { message: t('emailRequired') })
      .pipe(z.email(t('emailInvalid'))),
    bio: z
      .string()
      .max(500, { message: t('bioMaxLength') })
      .optional()
      .nullable(),
  });

export type ProfileFormFields = z.infer<ReturnType<typeof createProfileFormSchema>>;

export function useProfileForm(initialValues?: Partial<ProfileFormFields>) {
  const t = useTranslations('dashboard');

  const ProfileFormSchema = createProfileFormSchema(t);

  return useForm<ProfileFormFields>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      username: initialValues?.username ?? '',
      email: initialValues?.email ?? '',
      bio: initialValues?.bio ?? '',
    },
  });
}
