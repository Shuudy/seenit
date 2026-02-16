import { Suspense } from 'react';
import { SearchBar } from '@/components/header/SearchBar';
import { NavActions } from '@/components/header/NavActions';
import { HeaderBrand } from '@/components/header/HeaderBrand';

export function Header() {
  return (
    <header className="bg-background border-border fixed top-0 right-0 left-0 z-50 flex h-16 items-center gap-4 border-b px-4">
      <HeaderBrand />
      <Suspense fallback={<div className="hidden max-w-md flex-1 sm:flex" />}>
        <SearchBar />
      </Suspense>
      <NavActions />
    </header>
  );
}
