import { Validation } from 'presentation/protocols';
import { FieldValidation } from 'validation/protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  validate(fieldName: string, fieldValue: string): string | null {
    const validators = this.validators.filter(
      validator => validator.field === fieldName,
    );

    let error: string | null = null;

    validators.forEach(validator => {
      const validationError = validator.validate(fieldValue);

      if (validationError && !error) {
        error = validationError.message;
      }
    });

    return error;
  }
}
