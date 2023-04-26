import { ValidatorFn, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

// tslint:disable-next-line:max-line-length
const EMAIL_REGEXP = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;

const PASSWORD_COMPLEXITY_REGEXP = /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*\W)(?=.*\d))).{8,}$/;

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value === '' || value == null || value.length === 0;
}

export class AppValidators {
  static conditionalRequired(condition: () => boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (condition()) {
        if (isEmptyInputValue(control.value) || (typeof control.value === 'string' && control.value.trim() === '')) {
          return {
            required: true
          };
        }
      }

      return null;
    };
  }

  static integer(control: FormControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }
    return isInteger(control.value) ? null : {
      integer: true
    };

    function isInteger(value) {
      if ((parseFloat(value) === parseInt(value, 10)) && !isNaN(value)) {
        return true;
      } else {
        return false;
      }
    }
  }

  static email(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }

    return EMAIL_REGEXP.test(control.value) ? null : { email: true };
  }

  static password(control: AbstractControl): ValidationErrors | null {
    if (isEmptyInputValue(control.value)) {
      return null;
    }

    return PASSWORD_COMPLEXITY_REGEXP.test(control.value) ? null : { password: true };
  }

  static areEqual(field1: string, field2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const control1 = control.get(field1);
      const control2 = control.get(field2);

      if (!control1) {
        throw new Error(`Control ${field1} does not exist.`);
      }
      if (!control2) {
        throw new Error(`Control ${field2} does not exist.`);
      }

      if (control1.value !== control2.value) {
        return {
          areEqual: true
        };
      }

      return null;
    };
  }

  static fileExtension(type: string): ValidatorFn {
    return (control: AbstractControl) => {
      const file = control.value;
      if (file) {
        const parts = file.name.split('.');
        const extension = parts[parts.length - 1];
        if (extension && type.toLowerCase() !== extension.toLowerCase()) {
          return {
            fileExtension: true
          };
        }
      }

      return null;
    };
  }

  static fileMimeType(type: string | RegExp): ValidatorFn {
    return (control: AbstractControl) => {
      const file: File = control.value;
      if (file) {
        if (!file.type.match(type)) {
          return {
            fileMimeType: true
          };
        }
      }

      return null;
    };
  }

  static image(control: AbstractControl): ValidationErrors | null {
    const file: File = control.value;
    if (file) {
      if (!file.type.match(/image\/(png|x-png|jpeg)/)) {
        return {
          fileMimeType: true
        };
      }
    }

    return null;
  }
}
