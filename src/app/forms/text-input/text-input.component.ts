import { Component, input, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-text-input',
    imports: [ReactiveFormsModule],
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';  
  @Input() type = 'text';
  @Input() additionalClasses = 'mb-2';

  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {  }
  registerOnChange(fn: any): void {  }
  registerOnTouched(fn: any): void {  }

}
