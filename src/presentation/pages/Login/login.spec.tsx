import { render, RenderResult } from '@testing-library/react';

import { Login } from '.';

type SutTypes = {
  sut: RenderResult;
};

function makeSut(): SutTypes {
  const sut = render(<Login />);
  return {
    sut,
  };
}

describe('LoginPage', () => {
  it('should start with initial state', () => {
    const { sut } = makeSut();
    const errorWrapper = sut.getByTestId('error-wrapper');
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    const emailStatus = sut.getByTestId('email-status');
    const passwordStatus = sut.getByTestId('password-status');

    expect(errorWrapper.childElementCount).toBe(0);
    expect(submitButton.disabled).toBe(true);
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });
});
