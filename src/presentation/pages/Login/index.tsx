import { useState } from 'react';

import {
  AuthHeader,
  Footer,
  FormStatus,
  TextField,
} from 'presentation/components';
import { FormContext, State, ErrorState } from 'presentation/contexts';

import classes from './styles.module.scss';

export function Login(): JSX.Element {
  const [state] = useState<State>({
    isLoading: false,
  });

  const [errorState] = useState<ErrorState>({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    mainError: '',
  });

  return (
    <div className={classes.login}>
      <AuthHeader />

      <FormContext.Provider value={{ state, errorState }}>
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
