export interface Validation {
  validate(input: Record<string, any>): string | null;
}
