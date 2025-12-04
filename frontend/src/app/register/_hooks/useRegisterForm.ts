import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// prettier-ignore
const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email requis' })
      .pipe(z.email('Email invalide')),
    password: z
      .string()
      .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
    confirm: z
      .string()
      .min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirm'],
  });

export type RegisterFormFields = z.infer<typeof RegisterFormSchema>;
export function useRegisterForm() {
  return useForm({
    resolver: zodResolver(RegisterFormSchema),
  });
}
