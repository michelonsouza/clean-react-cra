import { Validation } from 'presentation/protocols';

export class ValidationSpy implements Validation {
  private errorMessage = '';

  fieldName?: string;

  fieldValue?: string;

  validate(fieldName: string, fieldValue: string): string | null {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}
