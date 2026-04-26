export function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 text-red-500"
    >
      {message}
    </div>
  );
}
