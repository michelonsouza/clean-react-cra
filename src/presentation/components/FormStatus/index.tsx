import { Spinner } from 'presentation/components';
import { useFormContext } from 'presentation/contexts';

import classes from './styles.module.scss';

export function FormStatus(): JSX.Element {
  const { isLoading, errorMessage } = useFormContext();

  return (
    <div data-testid="error-wrapper" className={classes.errorWrapper}>
      {isLoading && <Spinner />}
      {errorMessage && <span className={classes.error}>{errorMessage}</span>}
    </div>
  );
}
