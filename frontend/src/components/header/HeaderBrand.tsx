import Link from 'next/link';

export function HeaderBrand() {
  return (
    <div className="flex items-center gap-4">
      <button className="hover:bg-secondary cursor-pointer rounded-full p-2 transition-colors md:hidden">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <Link href="/">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Seenit" className="h-10 w-auto" />
      </Link>
    </div>
  );
}
