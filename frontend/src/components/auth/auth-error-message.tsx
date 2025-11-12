export function AuthErrorMessage({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-700 bg-red-700/10 px-4 py-2 text-red-700">
      <svg
        className="h-5 w-5 flex-shrink-0 text-red-700"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
      </svg>
      <span className="text-sm">{message}</span>
    </div>
  );
}
