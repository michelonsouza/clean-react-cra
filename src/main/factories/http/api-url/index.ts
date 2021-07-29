export function makeApiUrl(path: string): string {
  return `${process.env.REACT_APP_API_BASE_URL}${path}`;
}
