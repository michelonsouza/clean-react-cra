/* eslint-disable max-classes-per-file */
import { InvalidFieldError } from 'validation/errors';

import { EmailValidation } from '.';

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = new EmailValidation('email');

    const error = sut.validate('');

    expect(error).toBeInstanceOf(InvalidFieldError);
  });
});