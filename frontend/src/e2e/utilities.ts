export function uniqueId(): string {
  return crypto.randomUUID().replaceAll('-', '').slice(0, 12);
}
