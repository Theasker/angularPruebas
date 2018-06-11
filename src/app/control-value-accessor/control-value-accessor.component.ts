/**
 * https://blog.ngconsultant.io/custom-input-formatting-with-simple-directives-for-angular-2-ec792082976
 * https://www.codementor.io/christiannwamba/build-custom-directives-in-angular-2-jlqrk7dpw
 * https://blog.rangle.io/angular-2-ngmodel-and-custom-form-components/
 * https://alligator.io/angular/custom-form-control/
 * http://www.anasfirdousi.com/share-controlvalueaccessor-provider-creation-with-abstract-controlvalueaccessor-across-custom-form-enabled-angular-components.html
 * https://netbasal.com/angular-custom-form-controls-made-easy-4f963341c8e2
 * http://tylerscode.com/2017/03/splitting-angular-forms-controlvalueaccessor/
 * 
 */
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-control-value-accessor',
  template: `
    <input 
      style="text-align:right;"
      type="text"
      #inputText 
      [(ngModel)]="valueInputText" 
      (focus)="onFocus($event);" 
      (change)="onChange($event)" 
      (blur)="onBlur($event)"
      (click)="onClick($event)"
      (mouseup)="$event.preventDefault()"
      (ngModelChange)="onChangeModel($event)"
      (keydown)="onKeydown($event)"
      (paste)="onPaste($event)"
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
export class ControlValueAccessorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input('value') value: number;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('inputText') inputText: ElementRef;

  public valueInputText: string;
      
  private propagateChange = (_: any) => { };
  private propagateTouch = (_: any) => { };
  public isDisabled: boolean = false;

  private regexNumber: RegExp = new RegExp(/\d$/g);

  private copyPasteKeys: Array<string> = ['Control','Shift','c','x','v','Insert'];
  private copyPastePreviousKey: string;
  private InitialcopyPastePreviousKey: any = false;
  private specialKeys: Array<string> = ['Enter','Backspace','Tab','End','Home','ArrowRight','ArrowLeft','Delete',','];
  private firstClick: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.copyPastePreviousKey = '';
    this.InitialcopyPastePreviousKey = setInterval(() => {
      this.copyPastePreviousKey = ''; 
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.InitialcopyPastePreviousKey) {
      clearInterval(this.InitialcopyPastePreviousKey);
    }
  }

  onFocus(event: any): void {
    if (this.valueInputText == null){
      this.valueInputText = '0,00';
      //this.valueInputText = '';
      event.target.select();
    }
    // Elimino todos los puntos ('.') del string
    let regex = /\./g;
    this.valueInputText = this.valueInputText.replace(regex, '');    
    event.target.select();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.specialKeys.indexOf(event.key) != -1 || String(event.key).match(this.regexNumber) || event.key == ',') {
      if (event.key == ',') {
        if(this.valueInputText.search(',') >= 0) {
          event.preventDefault();        
        }
      }
      if (event.key == 'Enter') {
        console.log('event.key: ', event.key);
        this.inputText.nativeElement.blur();
      }
      return;
    } else if (this.copyPasteKeys.indexOf(event.key) != -1) { // Control de Copy & Paste
      if (event.key == 'Control' || event.key == 'Shift') {
        this.copyPastePreviousKey = event.key;
      }
      if (this.copyPasteKeys.indexOf(event.key) != -1 && (this.copyPastePreviousKey == 'Control' || this.copyPastePreviousKey == 'Shift')) {
        return;
      }else {
        event.preventDefault();
      }
    } else {
      event.preventDefault();    
    }
  }

  onBlur(event: ClipboardEvent): void {
    let regex = /\./g;
    this.valueInputText = this.valueInputText.replace(regex, '');
    this.valueInputText = this.thousandsSeparator(this.valueInputText);
    this.value = this.parseStringNumber(this.valueInputText);
    this.valueChange.emit(this.value); 
  }

  onChange(event : any): void {
    // console.log('onChange');
    // this.propagateChange(this.valueInputText);
    // this.valueInputText = this.thousandsSeparator(this.valueInputText);
    // this.value = this.parseStringNumber(this.valueInputText);
    // this.valueChange.emit(this.value);
  }

  onClick(event: any): void {
    console.log('this.firstClick: ', this.firstClick);
    if (!this.firstClick) {
      event.target.select();
      this.firstClick = true;
    }
    console.log('this.firstClick: ', this.firstClick);
  }

  onPaste(event: any): void {
    console.log('onPaste');
    let result: string = '';
    let numComma = this.counterString(',',this.valueInputText);
    
    let patternNumber: any = /\d/;
    let patternChar: any = /\D/;
    let dirtyStringArray:string [] = event.target.value.split('');
    for (let cont = 0; cont <= dirtyStringArray.length; cont++){
      if (patternNumber.test(dirtyStringArray[cont])){
        result = result + dirtyStringArray[cont];
      }else if (patternChar.test(dirtyStringArray[cont])){
        if (dirtyStringArray[cont] == ',' && numComma == 0){
          result = result + ',';
        }
      }
    }
    this.valueInputText = result;
  }

  writeValue(value: any): void {
    // console.log('writeValue value: ', value);
    if (value) {
      this.valueInputText = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
      this.propagateChange = fn;      
  }

  registerOnTouched(fn: () => void): void {
      this.propagateTouch = fn;
  }

  onChangeModel(value: any) {
    console.log('onChangeModel value: ', value);
  }

  onTouch(event : any){
    console.log('onTouch');
    this.propagateTouch(event);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private counterString (stringToSearch: string, search: string): number{
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

  private thousandsSeparator (stringNumber: string): string {
    let resultado: string;
    stringNumber = stringNumber.replace(',','.');
    let flotante: number = parseFloat(stringNumber);
    let flotanteString = flotante.toFixed(2);
    resultado = flotanteString.replace('.', ',');
    let pos = resultado.indexOf(",");
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

  private parseStringNumber (stringNumber: string): number {
    let resultado: string;
    resultado = stringNumber;
    resultado = resultado.replace(/\./g, '');
    resultado = resultado.replace(',', '.');
    return parseFloat(resultado);
  }

  
  
}
