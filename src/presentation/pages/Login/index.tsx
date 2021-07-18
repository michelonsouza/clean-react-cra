import { Spinner, AuthHeader } from 'presentation/components';

import classes from './styles.module.scss';

export function Login(): JSX.Element {
  return (
    <div className={classes.login}>
      <AuthHeader />

      <form className={classes.form}>
        <h2>Login</h2>

        <div className={classes.inputWrapper}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={classes.status}>🔴</span>
        </div>

        <div className={classes.inputWrapper}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={classes.status}>🔴</span>
        </div>

        <button className={classes.submitButton} type="submit">
          Entrar
        </button>

        <span className={classes.link}>Criar conta</span>

        <div className={classes.errorWrapper}>
          <Spinner />
          <span className={classes.error}>Error</span>
        </div>
      </form>

      <footer className={classes.footer} />
    </div>
  );
}
