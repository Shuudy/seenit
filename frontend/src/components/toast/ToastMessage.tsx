import { ToastType } from '@/components/toast/ToastProvider';

interface ToastMessageProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export function ToastMessage({ message, type, onClose }: ToastMessageProps) {
  return (
    <div
      className={`toast-enter flex max-w-md min-w-72 items-center gap-3 rounded-lg px-4 py-3 shadow-lg ${type === 'success' ? 'bg-green-900/90 text-green-100' : ''} ${type === 'error' ? 'bg-red-900/90 text-red-100' : ''} ${type === 'info' ? 'bg-card border-border text-foreground border' : ''}`}
    >
      {type === 'success' && (
        <svg
          className="h-5 w-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      {type === 'error' && (
        <svg
          className="h-5 w-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      {type === 'info' && (
        <svg
          className="text-muted-foreground h-5 w-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        className="cursor-pointer rounded p-1 transition-colors hover:bg-white/10"
        aria-label="Fermer"
        onClick={onClose}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
