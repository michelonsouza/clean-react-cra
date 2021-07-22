export function useTestId(id: string): Record<string, string> {
  if (process.env.NODE_ENV !== 'test') {
    return {};
  }

  return { 'data-testid': id };
}
