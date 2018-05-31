import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-control-value-accessor',
  template: `
  <input 
    type="text" 
    [(ngModel)]="value" 
    (focus)="onFocus($event)" 
    (change)="onChange($event)" 
    (blur)="onBlur($event)"
    (ngModelChange)="onChangeModel($event)"
    (keydown)="onKeydown($event)"
    [disabled]="isDisabled" > 

    <p>Modelo del componente input: {{value}}</p>
  `,
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlValueAccessorComponent),
        multi: true
    },
]
})
export class ControlValueAccessorComponent implements OnInit, ControlValueAccessor {
  @Input('value') value: string = '1.234,56';
  @Output() numeroComponenteChange: EventEmitter<number> = new EventEmitter<number>();
      
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
    
  }

  ngOnInit(): void {
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
    console.log('onFocus this.value: ', this.value);
    console.log('onFocus this.commaCounter: ', this.commaCounter);
  }

  onKeydown(event: KeyboardEvent): void {
    console.log('onKeydown event.key: ', event.key);
    if (this.specialKeys.indexOf(event.key) != -1 || String(event.key).match(this.regexNumber) || event.key == ',') {
      if (event.key == ','){
        if (this.commaCounter == undefined) {
          this.commaCounter = 0;
          console.log('this.commaCounter: ', this.commaCounter);
        }else if (this.commaCounter > 0){
          event.preventDefault();          
          console.log('onKeydown preventDefault');
        }else {
          this.commaCounter++;
        }
      }
      console.log('onKeydown return: ');
      return;
    }else {
      console.log('onKeydown preventDefault');
      event.preventDefault();
    }
  }

  onBlur(event: any): void {
    console.log('onBlur this.value (antes) ', this.value);
    if (this.value) {
      this.commaCounter = this.counterString(this.value,',');
    }else {
      this.commaCounter = 0;
    }
    // Elimino todos los puntos ('.') del string
    let regex = /\./g;
    this.value = this.value.replace(regex, '');

    this.value = this.thousandsSeparator(this.value);
    console.log('onBlur this.value (despues): ', this.value);
    console.log('onBlur this.parseStringNumber(this.value): ', this.parseStringNumber(this.value));
    let temp: number = parseFloat(this.parseStringNumber(this.value));
    console.log('onBlur temp: ', temp, typeof(temp));
    this.numeroComponenteChange.emit(temp);    
  }

  private onChange(event : any) {
    this.propagateChange(this.value);
    console.log('onChange this.value (antes): ', this.value);
    this.value = this.thousandsSeparator(this.value);
    console.log('onChange this.value (después): ', this.value);
    console.log('onChange this.parseStringNumber(this.value): ', this.parseStringNumber(this.value));
    let temp: number = parseFloat(this.parseStringNumber(this.value));
    console.log('onChange temp: ', temp, typeof(temp));
    
    this.numeroComponenteChange.emit(temp); 
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
    console.log('counterString');
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
   * Pone los separadores de miles con punto y coma decimal
   * @param  {string} stringNumber
   * @returns string
   */
  public thousandsSeparator (stringNumber: string): string {
    console.log('thousandsSeparator');
    let resultado: string;
    stringNumber = stringNumber.replace(',','.');
    console.log('thousandsSeparator stringNumber: ', stringNumber);
    let flotante: number = parseFloat(stringNumber);
    let flotanteString = flotante.toFixed(2);
    resultado = flotanteString.replace('.', ',');
    console.log('thousandsSeparator flotanteString: ', flotanteString);
    console.log('thousandsSeparator resultado: ', resultado);
  
    let pos = resultado.indexOf(",");
    console.log('thousandsSeparator pos: ', pos);
    // string.substr(<desde>, <longitud>);
    while (pos > 3) {
      resultado = resultado.substr(0, pos-3)+'.'+resultado.substr(pos-3, 3)+resultado.substr(pos);
      pos=pos-3;
    }
    if (resultado == 'NaN') {
      return '0,00';
    }else {
      return resultado;    
    }
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
