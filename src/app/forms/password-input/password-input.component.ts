import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'app-password-input',
    templateUrl: './password-input.component.html',
    styleUrls: ['./password-input.component.css'],
    standalone: false
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type = 'password';
  @Input() additionalClasses = 'mb-2';

  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {  }
  registerOnChange(fn: any): void {  }
  registerOnTouched(fn: any): void {  }

}
