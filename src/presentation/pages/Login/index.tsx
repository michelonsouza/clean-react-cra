import {
  Spinner,
  AuthHeader,
  Footer,
  TextField,
} from 'presentation/components';

import classes from './styles.module.scss';

export function Login(): JSX.Element {
  return (
    <div className={classes.login}>
      <AuthHeader />

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

        <button className={classes.submitButton} type="submit">
          Entrar
        </button>

        <span className={classes.link}>Criar conta</span>

        <div className={classes.errorWrapper}>
          <Spinner />
          <span className={classes.error}>Error</span>
        </div>
      </form>

      <Footer />
    </div>
  );
}
