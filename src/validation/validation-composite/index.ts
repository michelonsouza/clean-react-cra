import { Validation } from 'presentation/protocols';
import { FieldValidation } from 'validation/protocols';

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

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
