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

  private digits = '';

  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>
  ) {}

  /**
   * Handle normal typing.
   *
   * Every numeric key is appended to the end of the value.
   * The caret position is completely ignored.
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const input = this.elementRef.nativeElement;

    // Allow browser shortcuts such as Cmd/Ctrl+C, Cmd/Ctrl+V, etc.
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // Allow navigation keys.
    if (
      event.key === 'Tab' ||
      event.key === 'Shift' ||
      event.key === 'Home' ||
      event.key === 'End'
    ) {
      return;
    }

    // Backspace and Delete both remove the last digit.
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();

      this.digits = this.digits.slice(0, -1);
      this.updateValue();

      return;
    }

    // Only accept numeric keys.
    if (/^\d$/.test(event.key)) {
      event.preventDefault();

      this.digits += event.key;
      this.updateValue();

      return;
    }

    // Prevent manually entering commas, periods, letters, etc.
    event.preventDefault();
  }

  /**
   * Handle paste.
   */
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text') ?? '';

    if (!pastedText) {
      return;
    }

    const pastedDigits = this.extractDigits(pastedText);

    if (!pastedDigits) {
      return;
    }

    this.digits += pastedDigits;

    this.updateValue();
  }

  /**
   * Always put the caret at the end when clicking the input.
   */
  @HostListener('click')
  onClick(): void {
    this.setCaretToEnd();
  }

  /**
   * Also force the caret to the end when the input receives focus.
   */
  @HostListener('focus')
  onFocus(): void {
    this.setCaretToEnd();
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  /**
   * Called by Angular when the FormControl value changes.
   */
  writeValue(value: number | null): void {
    if (
      value === null ||
      value === undefined ||
      Number.isNaN(value)
    ) {
      this.digits = '';
      this.elementRef.nativeElement.value = '';
      return;
    }

    /*
     * Convert the numeric value to cents.
     *
     * Example:
     * 1234.56 -> "123456"
     */
    this.digits = this.numberToDigits(value);

    this.elementRef.nativeElement.value = this.format(value);
  }

  registerOnChange(
    fn: (value: number | null) => void
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  /**
   * Extract only numeric characters.
   *
   * Examples:
   * "1234"          -> "1234"
   * "R$ 1.234,56"   -> "123456"
   * "1,234.56"      -> "123456"
   */
  private extractDigits(value: string): string {
    return value.replace(/\D/g, '');
  }

  /**
   * Convert a number into its cents representation.
   *
   * 12.34 -> "1234"
   */
  private numberToDigits(value: number): string {
    return Math.round(value * 100).toString();
  }

  /**
   * Update both the displayed value and the Angular FormControl.
   */
  private updateValue(): void {
    const input = this.elementRef.nativeElement;

    if (!this.digits) {
      input.value = '';
      this.onChange(null);
      this.setCaretToEnd();

      return;
    }

    const numericValue = Number(this.digits) / 100;

    input.value = this.format(numericValue);

    this.onChange(numericValue);

    this.setCaretToEnd();
  }

  /**
   * Format a number as Brazilian currency.
   */
  private format(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  /**
   * Always position the caret at the end of the input.
   */
  private setCaretToEnd(): void {
    const input = this.elementRef.nativeElement;

    setTimeout(() => {
      input.setSelectionRange(
        input.value.length,
        input.value.length
      );
    });
  }
}