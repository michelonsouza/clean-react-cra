export function useTestId(id: string): Record<string, string> {
  if (process.env.REACT_APP_NODE_ENV === 'production') {
    return {};
  }

  return { 'data-testid': id };
}
