import { Component, Input, HostListener, ElementRef, forwardRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements ControlValueAccessor {

  @Input() id = `file-input-${new Date().getTime()}`;
  filename: string = null;

  @Input() set accept(value: string) {
    if (typeof value === 'string') {
      this.fileInput.nativeElement.accept = value;
    }
  }

  @ViewChild('input', {static: false}) fileInput: ElementRef<HTMLInputElement>;

  private _onChange = (_: any) => { };

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.filename = file.name;
    this._onChange(file);
  }

  writeValue(value: null) {
    // clear file input
    this.fileInput.nativeElement.value = '';
    this.filename = null;
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {
  }

}
