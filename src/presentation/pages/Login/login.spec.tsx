import { render } from '@testing-library/react';

import { Login } from '.';

describe('LoginPage', () => {
  it('should start with initial state', () => {
    const { getByTestId } = render(<Login />);
    const errorWrapper = getByTestId('error-wrapper');
    const submitButton = getByTestId('submit') as HTMLButtonElement;

    expect(errorWrapper.childElementCount).toBe(0);
    expect(submitButton.disabled).toBe(true);
  });
});
