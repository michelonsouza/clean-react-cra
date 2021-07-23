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

type SutParams = {
  validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
  const validationSpy = new ValidationSpy();

  validationSpy.errorMessage = params?.validationError || null;

  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
  };
}

describe('LoginPage', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    const { sut, validationSpy } = makeSut({
      validationError: faker.random.words(7),
    });
    const errorWrapper = sut.getByTestId('error-wrapper');
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    const emailStatus = sut.getByTestId('email-status');
    const passwordStatus = sut.getByTestId('password-status');

    expect(errorWrapper.childElementCount).toBe(0);
    expect(submitButton.disabled).toBe(true);
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
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
    const { sut, validationSpy } = makeSut({
      validationError: faker.random.words(7),
    });
    const emailInput = sut.getByTestId('email-input') as HTMLInputElement;

    fireEvent.input(emailInput, { target: { value: faker.random.word() } });
    fireEvent.blur(emailInput);

    const emailStatus = sut.getByTestId('email-status');

    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus.textContent).toBe('🔴');
  });

  it('should show password error is validation failed', () => {
    const { sut, validationSpy } = makeSut({
      validationError: faker.random.words(7),
    });
    const passwordInput = sut.getByTestId('password-input') as HTMLInputElement;

    fireEvent.input(passwordInput, { target: { value: faker.random.word() } });
    fireEvent.blur(passwordInput);

    const passwordStatus = sut.getByTestId('password-status');

    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  it('should show valid email if validation succeeds', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId('email-input') as HTMLInputElement;

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    fireEvent.blur(emailInput);

    const emailStatus = sut.getByTestId('email-status');

    expect(emailStatus.title).toBe('Tudo certo');
    expect(emailStatus.textContent).toBe('🟢');
  });

  it('should show valid passoword if validation succeeds', () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId('password-input') as HTMLInputElement;

    fireEvent.input(passwordInput, { target: { value: faker.random.word() } });
    fireEvent.blur(passwordInput);

    const passwordStatus = sut.getByTestId('password-status');

    expect(passwordStatus.title).toBe('Tudo certo');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId('email-input') as HTMLInputElement;
    const passwordInput = sut.getByTestId('password-input') as HTMLInputElement;

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    fireEvent.input(passwordInput, { target: { value: faker.random.word() } });

    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });
});
