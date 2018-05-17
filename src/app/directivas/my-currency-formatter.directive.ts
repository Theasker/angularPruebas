import { Directive, Output, HostListener, ElementRef, OnInit } from '@angular/core';

import { MyCurrencyPipe } from '../pipes/my-currency.pipe';
import { ThousandsPipe } from '../pipes/thousands.pipe';


@Directive({
  selector: '[appMyCurrencyFormatter]'
})
export class MyCurrencyFormatterDirective implements OnInit {
  private el: HTMLInputElement;
  // Permite números decimales. El \. es para que ocurra sólo una vez
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
  // Backspace, tab, end, home
  private specialKeys: Array<string> = [ 'Backspace','Tab','End','Home','ArrowRight','ArrowLeft','Delete' ];
  
  constructor(
    private _elementRef: ElementRef,
    private _currencyPipe: MyCurrencyPipe,
    private _thousandsPipe: ThousandsPipe
  ) {
    this.el = this._elementRef.nativeElement;
    console.log('Constructor: this.el.value: ', this.el.value);   
  }

  ngOnInit(): void {
    this.el.value = this._thousandsPipe.numberToString(this.el.value);
    //this.el.value = 'prueba ngOnInit';
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    this._elementRef.nativeElement.style.backgroundColor = 'yellow';
    console.log('Directiva (onFocus)value: ', value);
    console.log('this._currencyPipe.parse(value): ', this._currencyPipe.parse(value));
    
    /* if (isNaN(value)){ // NO es un número correcto
      // this.el.value = this.cleanString(value);
      console.log('Directiva: NO es número -> this.numero: ');
    } else {
      // this.numero = parseFloat(value);
      console.log('Directiva: ES número -> this.numero: ');
    } */
    // this.el.value = this._currencyPipe.parse(value); // opossite of transform
    this.el.value = this._thousandsPipe.cleanString(value);    
    console.log('this._thousandsPipe.cleanString(value): ', this._thousandsPipe.cleanString(value));
  }
  
  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    this._elementRef.nativeElement.style.backgroundColor = null;
    
    console.log('Directiva (onBlur)value: ', value);
    console.log('this._currencyPipe.transform(value): ', this._currencyPipe.transform(value));
    // this.el.value = this._currencyPipe.transform(value);
    this.el.value = this._thousandsPipe.transform(value);
  }

  @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {
      console.log('event.key: ', event.key);
      // Permite Backspace, tab, end, y home keys
      if (this.specialKeys.indexOf(event.key) !== -1) {
        return;
      }

      // No usar event.keycode está deprecado.
      // ver: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
      let current: string = this.el.value;
      // We need this because the current value on the DOM element
      // is not yet updated with the value from this event
      let next: string = current.concat(event.key);
      if (next && !String(next).match(this.regex)) {
        event.preventDefault();
      }
    }
}
