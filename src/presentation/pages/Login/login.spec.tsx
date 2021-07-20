import { render } from '@testing-library/react';

import { Login } from '.';

describe('LoginPage', () => {
  it('should start with initial state', () => {
    const { getByTestId } = render(<Login />);
    const errorWrapper = getByTestId('error-wrapper');
    const submitButton = getByTestId('submit') as HTMLButtonElement;
    const emailStatus = getByTestId('email-status');
    const passwordStatus = getByTestId('password-status');

    expect(errorWrapper.childElementCount).toBe(0);
    expect(submitButton.disabled).toBe(true);
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
