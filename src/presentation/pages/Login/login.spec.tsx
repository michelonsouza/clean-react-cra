import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import faker from 'faker';

import { ValidationSpy } from 'presentation/mocks';

import { Login } from '.';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

function makeSut(): SutTypes {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = faker.random.words(7);
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
  };
}

describe('LoginPage', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const { sut, validationSpy } = makeSut();
    const errorWrapper = sut.getByTestId('error-wrapper');
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    const emailStatus = sut.getByTestId('email-status');
    const passwordStatus = sut.getByTestId('password-status');

    expect(errorWrapper.childElementCount).toBe(0);
    expect(submitButton.disabled).toBe(true);
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
    expect(passwordStatus.title).toBe('Campo obrigatório');
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('should call email validation with correct value', () => {
    const email = faker.internet.email();
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email-input') as HTMLInputElement;

    fireEvent.input(emailInput, { target: { value: email } });
    fireEvent.blur(emailInput);
    expect(validationSpy.fieldName).toEqual('email');
    expect(validationSpy.fieldValue).toEqual(email);
  });

  it('should call password validation with correct value', () => {
    const password = faker.internet.password();
    const { sut, validationSpy } = makeSut();
    const passwordInput = sut.getByTestId('password-input') as HTMLInputElement;

    fireEvent.input(passwordInput, { target: { value: password } });
    fireEvent.blur(passwordInput);
    expect(validationSpy.fieldName).toEqual('password');
    expect(validationSpy.fieldValue).toEqual(password);
  });

  it('should show email error is validation failed', () => {
    const { sut, validationSpy } = makeSut();
    const emailInput = sut.getByTestId('email-input') as HTMLInputElement;

    fireEvent.input(emailInput, { target: { value: faker.random.word() } });
    fireEvent.blur(emailInput);

    const emailStatus = sut.getByTestId('email-status');

    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });
});
