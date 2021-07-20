import {
  useCallback,
  FocusEvent,
  forwardRef,
  useMemo,
  InputHTMLAttributes,
  Ref,
} from 'react';

import { useFormContext } from 'presentation/contexts';

import classes from './styles.module.scss';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

function TextField(
  { className, name, type = 'text', ...props }: TextFieldProps,
  ref?: Ref<HTMLInputElement>,
): JSX.Element {
  const { errorState } = useFormContext();

  const memoStatus = useMemo(() => {
    const hasError = !!errorState[name as keyof typeof errorState];

    return hasError ? '🔴' : '🟢';
  }, [errorState, name]);

  const memoTitle = useMemo(() => {
    const hasError = errorState[name as keyof typeof errorState];

    return hasError ? String(hasError) : undefined;
  }, [errorState, name]);

  const handleInputEvent = useCallback(
    (readOnly: boolean) => (event: FocusEvent<HTMLInputElement>) => {
      event.target.readOnly = readOnly;
    },
    [],
  );

  return (
    <div className={[classes.inputWrapper, className].join(' ')}>
      <input
        autoComplete="off"
        {...props}
        data-testid={`${name}-input`}
        name={name}
        type={type}
        ref={ref}
        readOnly
        onFocus={handleInputEvent(false)}
        onBlur={handleInputEvent(true)}
      />
      <span
        data-testid={`${name}-status`}
        title={memoTitle}
        className={classes.status}
      >
        {memoStatus}
      </span>
    </div>
  );
}

export const TextFieldWithRef = forwardRef(TextField) as typeof TextField;
