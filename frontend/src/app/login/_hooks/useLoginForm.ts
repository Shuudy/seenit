import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const createLoginFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t('emailRequired') })
      .pipe(z.email(t('emailInvalid'))),
    password: z.string().min(8, { message: t('passwordMinLength') }),
  });

export type LoginFormFields = z.infer<ReturnType<typeof createLoginFormSchema>>;

export function useLoginForm() {
  const t = useTranslations('auth');

  const LoginFormSchema = createLoginFormSchema(t);

  return useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
  });
}
