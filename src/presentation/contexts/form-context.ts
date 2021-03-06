import { createContext, useContext } from 'react';

export type FormContextData = {
  isLoading: boolean;
  emailError: string | null;
  passwordError: string | null;
  mainError?: string;
  email: string;
  password: string;
  setState(state: FormContextData): void;
};

export const FormContext = createContext<FormContextData>(
  {} as FormContextData,
);

export function useFormContext(): FormContextData {
  const context = useContext(FormContext);

  return context;
}
