import { ValidationComposite } from 'validation/validation-composite';

import { makeLoginValidation } from './login-validation-factory';

describe('LoginValidationFactory', () => {
  test('should makeLoginValidation returns an instance to ValidationComposite', () => {
    const validationComposite = makeLoginValidation();

    expect(validationComposite).toBeInstanceOf(ValidationComposite);
  });
});
