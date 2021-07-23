import { RenderResult, fireEvent } from '@testing-library/react';
import faker from 'faker';

type ElementType<T> = T & HTMLElement;

export function populateEmailField(
  sut: RenderResult,
  email = faker.internet.email(),
): HTMLInputElement {
  const emailInput = sut.getByTestId('email-input') as HTMLInputElement;
  fireEvent.input(emailInput, { target: { value: email } });

  return emailInput;
}

export function populatePasswordField(
  sut: RenderResult,
  password = faker.internet.password(),
): HTMLInputElement {
  const passwordInput = sut.getByTestId('password-input') as HTMLInputElement;
  fireEvent.input(passwordInput, { target: { value: password } });
  fireEvent.blur(passwordInput);

  return passwordInput;
}

export function testElementText<T = any>(
  sut: RenderResult,
  testId: string,
  text: string,
): void {
  const element = sut.getByTestId(testId) as ElementType<T>;
  expect(element.textContent).toBe(text);
}

export function testStatusForField(
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void {
  const status = sut.getByTestId(`${fieldName}-status`);

  expect(status.title).toBe(validationError || 'Tudo certo');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
}

export function testErrorWrapperChildCount(
  sut: RenderResult,
  count: number,
): void {
  const errorWrapper = sut.getByTestId('error-wrapper');
  expect(errorWrapper.childElementCount).toBe(count);
}

export function testElementExists(sut: RenderResult, testId: string): void {
  expect(sut.getAllByTestId(testId)).toBeTruthy();
}

export function testButtonIsDisabled(
  sut: RenderResult,
  testId: string,
  isDisabled: boolean,
): void {
  const button = sut.getByTestId(testId) as HTMLButtonElement;

  expect(button.disabled).toBe(isDisabled);
}
