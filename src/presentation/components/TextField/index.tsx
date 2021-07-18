import { forwardRef, InputHTMLAttributes, Ref } from 'react';

import classes from './styles.module.scss';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

function TextField(
  { className, type = 'text', ...props }: TextFieldProps,
  ref?: Ref<HTMLInputElement>,
): JSX.Element {
  return (
    <div className={[classes.inputWrapper, className].join(' ')}>
      <input {...props} type={type} ref={ref} />
      <span className={classes.status}>🔴</span>
    </div>
  );
}

export const TextFieldWithRef = forwardRef(TextField) as typeof TextField;
