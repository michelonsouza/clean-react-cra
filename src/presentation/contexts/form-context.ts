import { createContext, useContext } from 'react';

export type FormContextData = {
  isLoading: boolean;
  errorMessage?: string;
};

export const FormContext = createContext<FormContextData>(
  {} as FormContextData,
);

export function useFormContext(): FormContextData {
  const context = useContext(FormContext);

  return context;
}
