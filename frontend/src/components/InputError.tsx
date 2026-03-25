export function InputError({ message }: { message?: string | null }) {
  if (!message) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }
  return <p className="mt-1 text-red-500">{message}</p>;
}
