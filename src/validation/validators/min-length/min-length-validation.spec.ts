import faker from 'faker';

import { InvalidFieldError } from 'validation/errors';

import { MinLengthValidation } from '.';

function makeSut(minLength = 5): MinLengthValidation {
  return new MinLengthValidation(faker.database.column(), minLength);
}

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const sut = makeSut();

    const error = sut.validate('123');

    expect(error).toBeInstanceOf(InvalidFieldError);
  });
});

export {};
