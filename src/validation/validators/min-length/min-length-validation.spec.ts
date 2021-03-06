import faker from 'faker';

import { InvalidFieldError } from 'validation/errors';

import { MinLengthValidation } from '.';

function makeSut(minLength = 5): MinLengthValidation {
  return new MinLengthValidation(faker.database.column(), minLength);
}

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const sut = makeSut();

    const error = sut.validate(faker.random.alphaNumeric(3));

    expect(error).toBeInstanceOf(InvalidFieldError);
  });

  it('should return falsy if value is valid', () => {
    const sut = makeSut();

    const error = sut.validate(faker.random.alphaNumeric(5));

    expect(error).toBeFalsy();
  });
});

export {};
