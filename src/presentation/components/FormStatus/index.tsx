import { Spinner } from 'presentation/components';
import { useFormContext } from 'presentation/contexts';

import classes from './styles.module.scss';

export function FormStatus(): JSX.Element {
  const { isLoading, mainError } = useFormContext();

  return (
    <div data-testid="error-wrapper" className={classes.errorWrapper}>
      {isLoading && <Spinner />}
      {mainError && <span className={classes.error}>{mainError}</span>}
    </div>
  );
}
