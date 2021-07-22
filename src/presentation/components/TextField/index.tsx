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
import { useTestId } from 'presentation/hooks';

import classes from './styles.module.scss';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

function TextField(
  { className, name, type = 'text', ...props }: TextFieldProps,
  ref?: Ref<HTMLInputElement>,
): JSX.Element {
  const formContext = useFormContext();
  const inputTestId = useTestId(`${name}-input`);
  const statusTestId = useTestId(`${name}-status`);

  const memoStatus = useMemo(() => {
    const hasError = !!formContext[`${name}Error` as keyof typeof formContext];

    return hasError ? '🔴' : '🟢';
  }, [formContext, name]);

  const memoTitle = useMemo(() => {
    const hasError = formContext[`${name}Error` as keyof typeof formContext];

    return hasError ? String(hasError) : 'Tudo certo';
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
        {...inputTestId}
        name={name}
        type={type}
        ref={ref}
        readOnly
        onChange={handleChange}
        onFocus={handleInputEvent(false)}
        onBlur={handleInputEvent(true)}
      />
      <span {...statusTestId} title={memoTitle} className={classes.status}>
        {memoStatus}
      </span>
    </div>
  );
}

export const TextFieldWithRef = forwardRef(TextField) as typeof TextField;
