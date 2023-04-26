import {
  Component,
  ViewChild,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  SimpleChanges,
  OnChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

import { NgbInputDatepicker, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatepickerComponent implements ControlValueAccessor, OnChanges, Validator {

  @Input() inputId = `datepicker-${new Date().getTime()}`;
  @Input('maxDate') public set maxDate(value: any) {
    this.dateInput.maxDate = this._ngbDateAdapter.fromModel(value);
  }

  @Input('minDate') public set minDate(value: any) {
    this.dateInput.minDate = this._ngbDateAdapter.fromModel(value);
  }

  @Input() clearable = true;

  @ViewChild(NgbInputDatepicker, {static: false}) dateInput: NgbInputDatepicker;

  disabled = false;

  // CONTROL VALUE ACCESSOR FUNCTIONS
  private _onChange = (_: any) => { };
  private _onTouched = () => { };
  // private _onValidatorChanged = () => { };

  constructor(
    private _element: ElementRef,
    private _ngbDateAdapter: NgbDateAdapter<any>) { }

  // ControlValueAccessor members
  writeValue(dateValue: Date) {
    // this._onChange(dateValue);
    this.dateInput.writeValue(dateValue);
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
    this.dateInput.registerOnChange(fn);
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
    // this.dateInput.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.dateInput.setDisabledState(isDisabled);
  }

  registerOnValidatorChange(fn: () => void): void {
    // this._onValidatorChanged = fn;
    this.dateInput.registerOnValidatorChange(fn);
  }

  // End ControlValueAccessor members

  ngOnChanges(changes: SimpleChanges) {
    if (changes['minDate'] || changes['maxDate']) {
      // this._onValidatorChanged();
      this.dateInput.ngOnChanges(changes);
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.dateInput.validate(c);
  }

  @HostListener('document:click', ['$event'])
  onDatePickerOutsideClick(event: MouseEvent) {
    const dateIsOpen = this.dateInput.isOpen();

    if (dateIsOpen) {
      if (!this.containsElement(event.target)) {
        this.dateInput.close();
      }
    }
  }

  onFocus() {
    this._onTouched();
    this.dateInput.toggle();
  }

  clear() {
    this._onChange(null);
    this.dateInput.writeValue(null);
  }

  private containsElement(target: EventTarget) {
    if (this._element && this._element.nativeElement && this._element.nativeElement.contains(target)) {
      return true;
    }
    if (this.dateInput.container === 'body') {
      const dateInput = this.dateInput as any;
      if (dateInput._cRef.location.nativeElement.contains(target)) {
        return true;
      }
    }

    return false;
  }
}
