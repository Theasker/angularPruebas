import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { MyCurrencyPipe } from '../pipes/my-currency.pipe';
import { ThousandsPipe } from '../pipes/thousands.pipe';


@Directive({
  selector: '[appMyCurrencyFormatter]'
})
export class MyCurrencyFormatterDirective implements OnInit {
  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: MyCurrencyPipe,
    private thousandsPipe: ThousandsPipe
  ) {
    this.el = this.elementRef.nativeElement;
    this.elementRef.nativeElement.style.backgroundColor = 'yellow';
  }

  ngOnInit(): void {
    // this.el.value = this.currencyPipe.transform(this.el.value);
    //this.elementRef.nativeElement.value = this.currencyPipe.transform(this.el.value);
    console.log('El dato: ', this.elementRef.nativeElement);
    //this.el.value = this.thousandsPipe.numberToString($event.target.value);    
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    console.log('Directiva (onFocus)value: ', value);
    console.log('this.currencyPipe.parse(value): ', this.currencyPipe.parse(value));
    /* if (isNaN(value)){ // NO es un número correcto
      // this.el.value = this.cleanString(value);
      console.log('Directiva: NO es número -> this.numero: ');
    } else {
      // this.numero = parseFloat(value);
      console.log('Directiva: ES número -> this.numero: ');
    } */
    // this.el.value = this.currencyPipe.parse(value); // opossite of transform
    this.el.value = this.thousandsPipe.parseStringNumber(value);
    
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    console.log('Directiva (onBlur)value: ', value);
    console.log('this.currencyPipe.transform(value): ', this.currencyPipe.transform(value));
    // this.el.value = this.currencyPipe.transform(value);
    this.el.value = this.thousandsPipe.numberToString(value);
  }

}
