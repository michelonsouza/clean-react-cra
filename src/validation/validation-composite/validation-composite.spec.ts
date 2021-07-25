/* eslint-disable max-classes-per-file */
import faker from 'faker';

import { FieldValidationSpy } from 'validation/mocks';

import { ValidationComposite } from '.';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

function makeSut(fieldName: string): SutTypes {
  const fieldValidationSpy = new FieldValidationSpy(fieldName);
  const fieldValidationSpy2 = new FieldValidationSpy(fieldName);
  const fieldValidationsSpy = [fieldValidationSpy, fieldValidationSpy2];
  const sut = new ValidationComposite(fieldValidationsSpy);

  return {
    sut,
    fieldValidationsSpy,
  };
}

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    const [fieldValidationSpy, fieldValidationSpy2] = fieldValidationsSpy;

    const firstErrorMessage = faker.random.words();
    const secondErrorMessage = faker.random.words();
    const mockedValue = faker.random.words();

    fieldValidationSpy.error = new Error(firstErrorMessage);
    fieldValidationSpy2.error = new Error(secondErrorMessage);

    const error = sut.validate(fieldName, mockedValue);

    expect(error).toBe(firstErrorMessage);
  });
});

export {};
