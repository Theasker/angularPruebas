/*
https://blog.ngconsultant.io/custom-input-formatting-with-simple-directives-for-angular-2-ec792082976
https://www.concretepage.com/angular-2/angular-2-custom-directives-example
https://stackoverflow.com/questions/19890364/format-input-value-in-angularjs
*/
import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

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
  private specialKeys: Array<string> = [ 'Backspace','Tab','End','Home','ArrowRight','ArrowLeft','Delete',',' ];
  
  constructor(
    private _elementRef: ElementRef,
    // private _currencyPipe: MyCurrencyPipe,
    // private _thousandsPipe: ThousandsPipe
  ) {
    this.el = this._elementRef.nativeElement;
    console.log('Constructor: this.el.value: ', this.el.value);   
  }

  ngOnInit(): void {
    //this.el.value = this._thousandsPipe.numberToString(this.el.value);
    //this.el.value = 'prueba ngOnInit';
    
    console.log('typeof(this.el.value): ', typeof(this.el.value));    
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    this._elementRef.nativeElement.style.backgroundColor = 'yellow';
    console.log('Directiva (onFocus)value: ', value);
        
    /* if (isNaN(value)){ // NO es un número correcto
      // this.el.value = this.cleanString(value);
      console.log('Directiva: NO es número -> this.numero: ');
    } else {
      // this.numero = parseFloat(value);
      console.log('Directiva: ES número -> this.numero: ');
    } */
    // this.el.value = this._currencyPipe.parse(value); // opossite of transform
    this.el.value = this.cleanString(value);
    console.log('this.cleanString(value): ', this.cleanString(value));
  }
  
  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    this._elementRef.nativeElement.style.backgroundColor = null;
    
    console.log('Directiva (onBlur)value: ', value);
    // this.el.value = this._currencyPipe.transform(value);
    let resultado: string;
    if (isNaN(value)){ // NO es un número
      console.log('No es un número');
      resultado = this.cleanString(this.parseStringNumber(value));
    }else { // Si es un número
      resultado = this.numberToString(value);
    }
    this.el.value = resultado;
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

  /**
   * Limpia cualquier string dejando sólo los números y cambiando la coma por punto decimal
   * @param  {string} dirtyString
   * @returns string
   */
  cleanString (dirtyString: string): string {
    let result: string = '';
    let patternNumber: any = /\d/;
    let patternChar: any = /\D/;
    let dirtyStringArray:string [] = dirtyString.split('');
    for (let cont = 0; cont <= dirtyStringArray.length; cont++){
      if (patternNumber.test(dirtyStringArray[cont])){
        result = result + dirtyStringArray[cont];
      }else if (patternChar.test(dirtyStringArray[cont])){
        if (dirtyStringArray[cont] == ','){
          result = result + '.';
        }
      }
    }
    return result;
  }

  /**
   * @param  {string} stringNumber
   * @returns string
   */
  public numberToString (stringNumber: string): string {
    let resultado: string;
    let flotante: number = parseFloat(stringNumber);
    let flotanteString = flotante.toFixed(2);
    resultado = flotanteString.replace('.', ',');
  
    let pos = resultado.indexOf(",");
    // string.substr(<desde>, <longitud>);
    while (pos > 3) {
      resultado = resultado.substr(0, pos-3)+'.'+resultado.substr(pos-3, 3)+resultado.substr(pos);
      pos=pos-3;
    }
    return resultado;
  }

  /**
   * Convierte un numero con formato 10.000.000,00 a un número 10000000.00
   * @param {string} stringNumber
   * @returns string
   */
  public parseStringNumber (stringNumber: string): string {
    let resultado: string;
    let search: string = '.';
    let replacement: string = '';
    resultado = stringNumber;
    let temp: string[] = resultado.split(search);
    resultado = temp.join(replacement);
    resultado = resultado.replace(',', '.');
    return resultado;
  }

}
