/* eslint-disable max-classes-per-file */
import faker from 'faker';

import { FieldValidationSpy } from 'validation/mocks';

import { ValidationComposite } from '.';

describe('ValidationComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const errorMessage = faker.random.words();
    const fieldValidationSpy = new FieldValidationSpy(fieldName);
    const fieldValidationSpy2 = new FieldValidationSpy(fieldName);

    fieldValidationSpy2.error = new Error(errorMessage);

    const sut = new ValidationComposite([
      fieldValidationSpy,
      fieldValidationSpy2,
    ]);

    const error = sut.validate(fieldName, 'any_value');

    expect(error).toBe(errorMessage);
  });
});

export {};
