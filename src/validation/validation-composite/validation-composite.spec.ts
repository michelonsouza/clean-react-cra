import faker from 'faker';

import { FieldValidationSpy } from 'validation/mocks';

import { ValidationComposite } from '.';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

function makeSut(
  fieldName: string,
  fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ],
): SutTypes {
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

    fieldValidationSpy.error = new Error(firstErrorMessage);
    fieldValidationSpy2.error = new Error(faker.random.words());

    const error = sut.validate(fieldName, faker.random.word());

    expect(error).toBe(firstErrorMessage);
  });

  it('should return falsy if validation success', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);

    const error = sut.validate(fieldName, faker.random.word());

    expect(error).toBeFalsy();
  });
});
