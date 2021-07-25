import faker from 'faker';

import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from 'validation/validators';

import { ValidationBuilder as sut } from '.';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  it('should return EmailValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).email().build();

    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  it('should return MinLengthValidation', () => {
    const fieldName = faker.database.column();
    const length = faker.datatype.number();
    const validations = sut.field(fieldName).min(length).build();

    expect(validations).toEqual([new MinLengthValidation(fieldName, length)]);
  });

  it('should return a list of Validations', () => {
    const fieldName = faker.database.column();
    const length = faker.datatype.number();
    const validations = sut
      .field(fieldName)
      .required()
      .min(length)
      .email()
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, length),
      new EmailValidation(fieldName),
    ]);
  });
});

export {};
