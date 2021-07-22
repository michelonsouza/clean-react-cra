import { Spinner } from 'presentation/components';
import { useFormContext } from 'presentation/contexts';
import { useTestId } from 'presentation/hooks';

import classes from './styles.module.scss';

export function FormStatus(): JSX.Element {
  const { isLoading, mainError } = useFormContext();
  const errorWrapperTestId = useTestId('error-wrapper');
  const spinnerTestId = useTestId('spinner');

  return (
    <div {...errorWrapperTestId} className={classes.errorWrapper}>
      {isLoading && <Spinner {...spinnerTestId} />}
      {mainError && <span className={classes.error}>{mainError}</span>}
    </div>
  );
}
