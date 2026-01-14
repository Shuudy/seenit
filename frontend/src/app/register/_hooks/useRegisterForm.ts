import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';

const createRegisterFormSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z
        .string()
        .min(1, { message: t('emailRequired') })
        .pipe(z.email(t('emailInvalid'))),
      password: z.string().min(6, { message: t('passwordMinLength') }),
      confirm: z.string().min(6, { message: t('passwordMinLength') }),
    })
    .refine(data => data.password === data.confirm, {
      message: t('passwordMismatch'),
      path: ['confirm'],
    });

export type RegisterFormFields = z.infer<ReturnType<typeof createRegisterFormSchema>>;

export function useRegisterForm() {
  const t = useTranslations('auth');

  const RegisterFormSchema = createRegisterFormSchema(t);

  return useForm<RegisterFormFields>({
    resolver: zodResolver(RegisterFormSchema),
  });
}
