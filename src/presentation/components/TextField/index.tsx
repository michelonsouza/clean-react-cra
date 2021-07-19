import {
  useCallback,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  Ref,
} from 'react';

import classes from './styles.module.scss';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

function TextField(
  { className, type = 'text', ...props }: TextFieldProps,
  ref?: Ref<HTMLInputElement>,
): JSX.Element {
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
        type={type}
        ref={ref}
        readOnly
        onFocus={handleInputEvent(false)}
        onBlur={handleInputEvent(true)}
      />
      <span className={classes.status}>🔴</span>
    </div>
  );
}

export const TextFieldWithRef = forwardRef(TextField) as typeof TextField;
