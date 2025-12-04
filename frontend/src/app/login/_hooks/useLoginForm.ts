import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const LoginFormSchema = z.object({
  email: z.email({ message: 'Adresse email invalide' }),
  password: z.string().min(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' }),
});

export type LoginFormFields = z.infer<typeof LoginFormSchema>;
export function useLoginForm() {
  return useForm({
    resolver: zodResolver(LoginFormSchema),
  });
}
