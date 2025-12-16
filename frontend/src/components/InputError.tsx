interface InputErrorProps {
  message?: string | null;
}

export function InputError({ message }: InputErrorProps) {
  if (!message) {
    return null;
  }
  return <p className="mt-1 text-red-500">{message}</p>;
}
