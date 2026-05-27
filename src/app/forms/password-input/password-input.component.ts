import { Component, Self, input } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-password-input',
    imports: [ReactiveFormsModule],
    templateUrl: './password-input.component.html',
    styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly type = input<string>();
  readonly additionalClasses = input<string>();

  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {  }
  registerOnChange(fn: any): void {  }
  registerOnTouched(fn: any): void {  }

}
