import { Spinner } from 'presentation/components';

import classes from './styles.module.scss';

export function FormStatus(): JSX.Element {
  return (
    <div className={classes.errorWrapper}>
      <Spinner />
      <span className={classes.error}>Error</span>
    </div>
  );
}
