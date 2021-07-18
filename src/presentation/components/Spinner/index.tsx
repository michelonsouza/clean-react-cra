import { HTMLAttributes, forwardRef, Ref } from 'react';

import classes from './styles.module.scss';

type SpinnerProps = HTMLAttributes<HTMLDivElement>;

function Spinner(
  { className, ...props }: SpinnerProps,
  ref?: Ref<HTMLDivElement>,
): JSX.Element {
  return (
    <div
      className={[classes.spinner, className].join(' ')}
      {...props}
      ref={ref}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export const SpinnerWithRef = forwardRef(Spinner);
