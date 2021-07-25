import faker from 'faker';

import { InvalidFieldError } from 'validation/errors';

import { EmailValidation } from '.';

function makeSut(): EmailValidation {
  return new EmailValidation(faker.database.column());
}

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = makeSut();

    const error = sut.validate(faker.random.word());

    expect(error).toBeInstanceOf(InvalidFieldError);
  });

  it('should return falsy if email is valid', () => {
    const sut = makeSut();

    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });

  it('should return falsy if email is empty', () => {
    const sut = makeSut();

    const error = sut.validate('');

    expect(error).toBeFalsy();
  });
});
