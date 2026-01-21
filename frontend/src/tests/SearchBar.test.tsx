import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@/app/_hooks/queries/useVideosSuspenseQuery', () => ({
  useVideosSuspenseQuery: vi.fn(),
}));

import { useRouter, useSearchParams } from 'next/navigation';
import { useVideosSuspenseQuery } from '@/app/_hooks/queries/useVideosSuspenseQuery';

import { SearchBar } from '@/components/header/SearchBar';
import { VideosGrid } from '@/app/_components/VideosGrid';
import { VideosGridSearchEmpty } from '@/app/_components/VideosGridSearchEmpty';
import { renderWithProviders } from '@/tests/Utilities';

const mockVideos = [
  { id: 1, title: 'Next.js tutorial' },
  { id: 2, title: 'Laravel testing' },
];

describe('SearchBar / VideosGrid / VideosGridSearchEmpty', () => {
  it('SearchBar envoie une recherche correcte', () => {
    const push = vi.fn();

    vi.mocked(useRouter).mockReturnValue({ push } as Partial<
      ReturnType<typeof useRouter>
    > as ReturnType<typeof useRouter>);
    vi.mocked(useSearchParams).mockReturnValue({
      get: () => '',
    } as Partial<ReturnType<typeof useSearchParams>> as ReturnType<typeof useSearchParams>);

    renderWithProviders(<SearchBar />);

    const input = screen.getByPlaceholderText('Search');

    fireEvent.change(input, { target: { value: 'nextjs' } });
    fireEvent.submit(input.closest('form')!);

    expect(push).toHaveBeenCalledWith('/?q=nextjs');
  });

  it('VideosGrid affiche le composant empty quand aucun résultat', () => {
    vi.mocked(useSearchParams).mockReturnValue({
      get: () => 'react',
    } as Partial<ReturnType<typeof useSearchParams>> as ReturnType<typeof useSearchParams>);

    vi.mocked(useVideosSuspenseQuery).mockReturnValue({
      data: mockVideos,
    } as Partial<ReturnType<typeof useVideosSuspenseQuery>> as ReturnType<
      typeof useVideosSuspenseQuery
    >);

    renderWithProviders(<VideosGrid />);

    expect(screen.getByText('No results for "react"')).toBeInTheDocument();
  });

  it('VideosGridSearchEmpty tronque une query trop longue', () => {
    const longQuery = 'a'.repeat(150);
    const truncated = `${'a'.repeat(100)}…`;

    renderWithProviders(<VideosGridSearchEmpty query={longQuery} />);

    expect(screen.getByText(`No results for "${truncated}"`)).toBeInTheDocument();
  });
});
