export function useTestId(id: string): Record<string, string> {
  if (process.env.NODE_ENV === 'production') {
    return {};
  }

  return { 'data-testid': id };
}
