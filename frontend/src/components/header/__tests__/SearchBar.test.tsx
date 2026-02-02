import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

import { useRouter, useSearchParams } from 'next/navigation';

import { SearchBar } from '@/components/header/SearchBar';
import { renderWithProviders } from '@/tests/Utilities';

function mockRouter(overrides?: { push?: (href: string) => void }) {
  const push = overrides?.push ?? vi.fn();

  vi.mocked(useRouter).mockReturnValue({
    push,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  } as unknown as ReturnType<typeof useRouter>);

  return { push };
}

function mockSearchParameters(query?: string) {
  const searchParameters = new URLSearchParams();
  if (query !== undefined) searchParameters.set('q', query);

  vi.mocked(useSearchParams).mockReturnValue(
    searchParameters as unknown as ReturnType<typeof useSearchParams>
  );
}

describe('SearchBar', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('submits the correct search query', async () => {
    const user = userEvent.setup();
    const { push } = mockRouter();
    mockSearchParameters();

    renderWithProviders(<SearchBar />);

    const input = screen.getByRole('textbox', { name: 'Search' });

    await user.type(input, 'nextjs');
    await user.keyboard('{Enter}');

    expect(push).toHaveBeenCalledWith('/?q=nextjs');
  });

  it('initializes the input value from ?q=', () => {
    mockRouter();
    mockSearchParameters('React Query');

    renderWithProviders(<SearchBar />);

    expect(screen.getByRole('textbox', { name: 'Search' })).toHaveValue('React Query');
  });

  it('trims and encodes the query before navigation', async () => {
    const user = userEvent.setup();
    const { push } = mockRouter();
    mockSearchParameters();

    renderWithProviders(<SearchBar />);

    const input = screen.getByRole('textbox', { name: 'Search' });

    await user.type(input, '  next js  ');
    await user.keyboard('{Enter}');

    expect(push).toHaveBeenCalledWith('/?q=next%20js');
  });

  it('navigates to / when the query is empty', async () => {
    const user = userEvent.setup();
    const { push } = mockRouter();
    mockSearchParameters();

    renderWithProviders(<SearchBar />);

    const input = screen.getByRole('textbox', { name: 'Search' });

    await user.type(input, '   ');
    await user.keyboard('{Enter}');

    expect(push).toHaveBeenCalledWith('/');
  });
});
