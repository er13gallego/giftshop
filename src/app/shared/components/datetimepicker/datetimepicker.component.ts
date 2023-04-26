import { Component, ViewChild, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

import { NgbTimepicker, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { isDate } from 'util';

import { DatepickerComponent } from '../datepicker/datepicker.component';

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimepickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatetimepickerComponent),
      multi: true
    }
  ]
})
export class DatetimepickerComponent implements OnInit {

  private _date: Date;
  private _time: NgbTimeStruct;

  @Input() inputId = `datetimepicker-${new Date().getTime()}`;

  @Input() maxDate: any;

  @Input() minDate: any;

  @Input() clearable = true;

  @ViewChild(DatepickerComponent, {static: false}) dateInput: DatepickerComponent;
  @ViewChild(NgbTimepicker, {static: false}) timeInput: NgbTimepicker;

  disabled = false;

  // CONTROL VALUE ACCESSOR FUNCTIONS
  // private _onChange = (_: any) => { };
  // private _onValidatorChanged = () => { };

  ngOnInit(): void {
    this.timeInput.writeValue({ hour: 0, minute: 0, second: 0 });
  }

  // ControlValueAccessor members
  writeValue(value: Date) {
    this.dateInput.writeValue(value);
    if (isDate(value)) {
      const time = {
        hour: value.getHours(),
        minute: value.getMinutes(),
        second: value.getSeconds()
      };
      this.timeInput.writeValue(time);
      this._date = value;
    }
  }

  registerOnChange(fn: (value: any) => any): void {
    const valueChanged = () => {
      if (this._date) {
        if (this._time) {
          this._date.setHours(this._time.hour, this._time.minute, this._time.second, 0);
        }
      }
      fn(this._date);
    };
    this.dateInput.registerOnChange(value => {
      this._date = value;
      valueChanged();
    });
    this.timeInput.registerOnChange((value: NgbTimeStruct) => {
      this._time = value;
      valueChanged();
    });

  }

  registerOnTouched(fn: () => any): void {
    this.dateInput.registerOnTouched(fn);
    this.timeInput.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.dateInput.setDisabledState(isDisabled);
    this.timeInput.setDisabledState(isDisabled);
  }

  registerOnValidatorChange(fn: () => void): void {
    // this._onValidatorChanged = fn;
    this.dateInput.registerOnValidatorChange(fn);
  }

  // End ControlValueAccessor members

  validate(c: AbstractControl): ValidationErrors | null {
    return this.dateInput.validate(c);
  }
}
