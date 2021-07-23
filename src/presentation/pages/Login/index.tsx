import { useState, useCallback, useEffect, useMemo, FormEvent } from 'react';

import { Authentication } from 'domain/usecases';
import {
  AuthHeader,
  Footer,
  FormStatus,
  TextField,
} from 'presentation/components';
import { FormContext, FormContextData } from 'presentation/contexts';
import { useTestId } from 'presentation/hooks';
import { Validation } from 'presentation/protocols';

import classes from './styles.module.scss';

interface LoginProps {
  validation: Validation;
  authentication: Authentication;
}

export function Login({ validation, authentication }: LoginProps): JSX.Element {
  const submitButtonTestId = useTestId('submit');
  const formTestId = useTestId('form');

  const [state, setState] = useState<Omit<FormContextData, 'setState'>>({
    isLoading: false,
    emailError: '',
    passwordError: '',
    mainError: '',
    email: '',
    password: '',
  });

  const memoSubmitIsDisabled = useMemo(() => {
    return !!(state.emailError || state.passwordError || state.isLoading);
  }, [state.emailError, state.passwordError, state.isLoading]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      try {
        if (state.isLoading || state.emailError || state.passwordError) {
          return;
        }

        setState(oldState => ({
          ...oldState,
          isLoading: true,
        }));

        await authentication.auth({
          email: state.email,
          password: state.password,
        });
      } catch (error) {
        setState(oldState => ({
          ...oldState,
          isLoading: false,
          mainError: error.message,
        }));
      }
    },
    [
      state.isLoading,
      state.emailError,
      state.passwordError,
      state.email,
      state.password,
      authentication,
    ],
  );

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      emailError: validation.validate('email', state.email),
    }));
  }, [state.email, state.password, validation]);

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      passwordError: validation.validate('password', state.password),
    }));
  }, [state.password, validation]);

  return (
    <div className={classes.login}>
      <AuthHeader />

      <FormContext.Provider value={{ ...state, setState }}>
        <form {...formTestId} className={classes.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <TextField
            className={classes.inputWrapper}
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          />

          <TextField
            className={classes.inputWrapper}
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button
            {...submitButtonTestId}
            type="submit"
            className={classes.submitButton}
            disabled={memoSubmitIsDisabled}
          >
            Entrar
          </button>

          <span className={classes.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  );
}

export default Login;
