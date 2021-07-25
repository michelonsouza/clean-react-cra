import { RequiredFieldError } from 'validation/errors';

import { RequiredFieldValidation } from '.';

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate('');

    expect(error).toBeInstanceOf(RequiredFieldError);
  });
});
