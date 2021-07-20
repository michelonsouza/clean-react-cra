import { useState, useEffect } from 'react';

import {
  AuthHeader,
  Footer,
  FormStatus,
  TextField,
} from 'presentation/components';
import { FormContext, FormContextData } from 'presentation/contexts';
import { Validation } from 'presentation/protocols';

import classes from './styles.module.scss';

interface LoginProps {
  validation: Validation;
}

export function Login({ validation }: LoginProps): JSX.Element {
  const [state, setState] = useState<Omit<FormContextData, 'setState'>>({
    isLoading: false,
    emailError: '',
    passwordError: 'Campo obrigatório',
    mainError: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      emailError: validation.validate('email', state.email),
    }));
  }, [state.email, validation]);

  useEffect(() => {
    validation.validate('password', state.password);
  }, [state.password, validation]);

  return (
    <div className={classes.login}>
      <AuthHeader />

      <FormContext.Provider value={{ ...state, setState }}>
        <form className={classes.form}>
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
            data-testid="submit"
            type="submit"
            className={classes.submitButton}
            disabled
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
