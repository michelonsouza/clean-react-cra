import faker from 'faker';

import { RequiredFieldError } from 'validation/errors';

import { RequiredFieldValidation } from '.';

function makeSut(): RequiredFieldValidation {
  return new RequiredFieldValidation(faker.database.column());
}

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');

    expect(error).toBeInstanceOf(RequiredFieldError);
  });

  it('should return falsy if field is not empty', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());

    expect(error).toBeFalsy();
  });
});
