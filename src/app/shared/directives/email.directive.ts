// @Angular
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, ValidationErrors } from '@angular/forms';
import { AppValidators } from '../../common/app-validators';

// app

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input[type=email]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailDirective),
      multi: true
    }
  ]
})
export class EmailDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return AppValidators.email(control);
  }

  registerOnValidatorChange?(fn: () => void): void {

  }
}
