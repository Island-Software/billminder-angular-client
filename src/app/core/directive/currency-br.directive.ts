import {
  Directive,
  ElementRef,
  HostListener,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Directive({
  selector: 'input[appCurrencyBr]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyBrDirective),
      multi: true
    }
  ]
})
export class CurrencyBrDirective implements ControlValueAccessor {

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Keep only digits
    const digits = input.value.replace(/\D/g, '');

    if (!digits) {
      input.value = '';
      this.onChange(null);
      return;
    }

    // Last two digits are cents
    const value = Number(digits) / 100;

    // Format for display
    input.value = this.format(value);

    // FormControl receives the numeric value
    this.onChange(value);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: number | null): void {
    const input = this.elementRef.nativeElement;

    if (value === null || value === undefined || value === 0) {
      input.value = '';
      return;
    }

    input.value = this.format(value);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  private format(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
}
