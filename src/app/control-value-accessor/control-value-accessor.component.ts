import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-control-value-accessor',
  template: `
  <input 
    type="text" 
    [(ngModel)]="value" 
    (focus)="onFocus($event)" 
    (change)="onChange($event)" 
    (ngModelChange)="onChangeModel($event)"
    (keydown)="onKeydown($event)"
    [disabled]="isDisabled" > 

    <p>Modelo value: {{value}}</p>
  `,
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlValueAccessorComponent),
        multi: true
    },
]
})
export class ControlValueAccessorComponent implements ControlValueAccessor {
  @Input('value') value: string = '1.234,56';
  @Output() numeroComponenteChange = new EventEmitter();
      
  private propagateChange = (_: any) => { };
  private propagateTouch = (_: any) => { };
  public isDisabled: boolean = false;

  // Permite números decimales. El \. es para que ocurra sólo una vez
  private regex: RegExp = new RegExp(/^[0-9]+(\,[0-9]*){0,1}$/g);
  private regexNumber: RegExp = new RegExp(/\d$/g);
  private regexAny: RegExp = new RegExp(/\D$/g);

  // Teclas que permito introducir
  private specialKeys: Array<string> = ['Enter','Backspace','Tab','End','Home','ArrowRight','ArrowLeft','Delete',','];
  private commaCounter: number; // Contador de comas
  
  constructor() {
    this.commaCounter = 0;
  }

  onFocus(event: any): void {
    console.log('onFocus event.target.value: ', event.target.value);
    console.log('onFocus this.value: ', this.value);
    if (this.value) {
      this.commaCounter = this.counterString(this.value,',');
    }else {
      this.commaCounter = 0;
    }
    // Elimino todos los puntos ('.') del string
    let regex = /\./g;
    this.value = this.value.replace(regex, '');
    
    console.log('onFocus this.commaCounter: ', this.commaCounter);
  }

  onKeydown(event: any): void {
    if (event.key == ','){
      if (this.commaCounter > 0){
        console.log('onKeydown commaCounter: ');
        event.preventDefault();
      }
      this.commaCounter++;      
    }
    if (this.specialKeys.indexOf(event.key) != -1 || String(event.key).match(this.regexNumber) || event.key == ',') {
      console.log('onKeydown return: ');
      return;      
    }else {
      console.log('onKeydown preventDefault');
      event.preventDefault();
    }
  }

  /**
   * Allows Angular to update the model (rating).
   * Update the model and changes needed for the view here.
   * @param  {any} value
   * @returns void
   */
  writeValue(value: any): void {
    // console.log('writeValue value: ', value);
    if (value) {
      this.value = value;
    }
  }
  
  /**
   * Allows Angular to register a function to call when the model (rating) changes.
   * Save the function as a property to call later here.
   * @param  {(_:any)=>void} fn
   * @returns void
   */
  registerOnChange(fn: (_: any) => void): void {
      this.propagateChange = fn;      
  }

  /**
   * Allows Angular to register a function to call when the input has been touched.
   * Save the function as a property to call later here.
   * @param  {()=>void} fn
   * @returns void
   */
  registerOnTouched(fn: () => void): void {
      this.propagateTouch = fn;
  }

  private onChange(event : any) {
    this.propagateChange(this.value);
    console.log('onChange this.value: ', this.value);
    console.log('onChange this.thousandsSeparator(this.value): ', this.thousandsSeparator(this.value));
    this.value = this.thousandsSeparator(this.value);
    
    this.numeroComponenteChange.emit(this.value)
  }

  private onChangeModel(value: any) {
    console.log('onChangeModel value: ', value);
  }

  private onTouch(event : any){
    console.log('onTouch event: ', event);
    this.propagateTouch(event);
    console.log('onTouch this.propagateTouch(event): ', this.propagateTouch(event));
  }
  
  /**
   * Allows Angular to disable the input.
   * @param  {boolean} isDisabled
   * @returns void
   */
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**
   * Cuenta las ocurrencias de un string
   * @param  {string} stringToSearch
   * @param  {string} search
   * @returns number
   */
  counterString (stringToSearch: string, search: string): number{
    let i: number = 0;
    let counter: number = 0;
    while (i != -1) {
      i = stringToSearch.indexOf(search,i);
      if (i != -1) {
        i++;
        counter++;
      }
    }
    return counter;
  }

  /**
   * @param  {string} stringNumber
   * @returns string
   */
  public thousandsSeparator (stringNumber: string): string {
    let resultado: string;
    stringNumber = stringNumber.replace(',','.');
    console.log('stringNumber: ', stringNumber);
    let flotante: number = parseFloat(stringNumber);
    let flotanteString = flotante.toFixed(2);
    resultado = flotanteString.replace('.', ',');
    console.log('flotanteString: ', flotanteString);
    console.log('resultado: ', resultado);
  
    let pos = resultado.indexOf(",");
    console.log('pos: ', pos);
    // string.substr(<desde>, <longitud>);
    while (pos > 3) {
      resultado = resultado.substr(0, pos-3)+'.'+resultado.substr(pos-3, 3)+resultado.substr(pos);
      pos=pos-3;
    }
    return resultado;
  }
  
}
