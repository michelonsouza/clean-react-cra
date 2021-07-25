import { RequiredFieldValidation } from 'validation/validators';

import { ValidationBuilder as sut } from '.';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build();

    expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
  });
});

export {};
