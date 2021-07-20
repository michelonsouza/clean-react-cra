import {
  useCallback,
  FocusEvent,
  forwardRef,
  useMemo,
  InputHTMLAttributes,
  Ref,
  ChangeEvent,
} from 'react';

import { useFormContext } from 'presentation/contexts';

import classes from './styles.module.scss';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

function TextField(
  { className, name, type = 'text', ...props }: TextFieldProps,
  ref?: Ref<HTMLInputElement>,
): JSX.Element {
  const formContext = useFormContext();

  const memoStatus = useMemo(() => {
    const hasError = !!formContext[`${name}Error` as keyof typeof formContext];

    return hasError ? '🔴' : '🟢';
  }, [formContext, name]);

  const memoTitle = useMemo(() => {
    const hasError = formContext[`${name}Error` as keyof typeof formContext];

    return hasError ? String(hasError) : undefined;
  }, [formContext, name]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      formContext.setState({
        ...formContext,
        [name as keyof typeof formContext]: event.target.value,
      });
    },
    [formContext, name],
  );

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
        onChange={handleChange}
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
