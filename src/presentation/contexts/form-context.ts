import { createContext, useContext } from 'react';

export type State = {
  isLoading: boolean;
};

export type ErrorState = {
  email: string;
  password: string;
  mainError?: string;
};

export type FormContextData = {
  state: State;
  errorState: ErrorState;
};

export const FormContext = createContext<FormContextData>(
  {} as FormContextData,
);

export function useFormContext(): FormContextData {
  const context = useContext(FormContext);

  return context;
}
