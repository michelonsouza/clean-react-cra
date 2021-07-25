import { ValidationComposite } from 'validation/validation-composite';
import { ValidationBuilder } from 'validation/builder';

export function makeLoginValidation(): ValidationComposite {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);
}
