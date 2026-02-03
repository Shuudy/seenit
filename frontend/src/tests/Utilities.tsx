import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, Suspense } from 'react';

import { en as messages } from '@/messages/en';

function createTestingQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

function AllProviders({ children }: { children: ReactNode }) {
  const testingQueryClient = createTestingQueryClient();

  return (
    <QueryClientProvider client={testingQueryClient}>
      <NextIntlClientProvider locale="en" messages={messages}>
        <Suspense fallback={undefined}>{children}</Suspense>
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}

export function renderWithProviders(ui: ReactNode, options?: RenderOptions) {
  return render(ui, { wrapper: AllProviders, ...options });
}
