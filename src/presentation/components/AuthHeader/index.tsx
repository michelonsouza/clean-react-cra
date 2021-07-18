import logoImage from 'assets/images/logo.svg';

import classes from './styles.module.scss';

export function AuthHeader(): JSX.Element {
  return (
    <header className={classes.header}>
      <img src={logoImage} alt="4Dev" />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
}
