import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
//import { MyCurrencyFormatterDirective } from "./directivas/my-currency-formatter.directive";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public numero: number;
  public inputText: string;
  public coin: string;
  public InputVal: string;
  
  constructor() {  }
  
  ngOnInit() {
    if (this.numero == null){
      this.numero = 0.00;
    }    
  }

  eventoRecibido(value: number) {
    console.log('eventoRecibido value: ', value);
    console.log('typeof(value): ', typeof(value));
  }
  
  /**
   * Controla el cambio del input para parsear el varlor dependiendo del dato recibido
   * @param  {any} value
   */
  cambioCampo(value: any){
    console.log('Value: ', value + " / " + 'typeof(value): ' + typeof(value));
    if (isNaN(value)){ // NO es un número correcto
      this.numero = parseFloat(this.cleanString(value));
      console.log('NO es número -> this.numero: ', this.numero);
    }else {
      //this.numero = parseFloat(value);
      console.log('ES número -> String(value): ', String(value));
      this.numero = parseFloat(this.cleanString(String(value)));
    }
  }
  
  /**
   * Convierte a número
   * Elimina los puntos de miles y cambia la coma decimal por punto
   * @param  {string} stringNumber
   * @returns string
   */
  parseStringNumber (stringNumber: string): string {
    console.log('stringNumber: ', stringNumber);
    let result: string;
    let search: string = '.';
    let replacement: string = '';
    result = stringNumber;
    let temp: string[] = result.split(search);
    result = temp.join(replacement);
    result = result.replace(',', '.');
    return result;
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
   * Filtra las teclas pulsadas para que solo se pueda pulsar números, '.', y ','
   * @param  {KeyboardEvent} event
   */
  pulsoTecla(event: KeyboardEvent) {
    // Permite números decimales. El \. es para que ocurra sólo una vez
    let regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
    // Backspace, tab, end, home
    let specialKeys: Array<string> = [ 'Backspace','Tab','End','Home','ArrowRight','ArrowLeft','Delete','.',',' ];
    // Permite Backspace, tab, end, y home keys
    if (specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    // No usar event.keycode está deprecado.
    // ver: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    let current: string = String(this.numero);
    // Necesitamos esto porque el valor actual del elemento del DOM 
    // aun no está actualizado con el valor desde este evento
    let next: string = current+ event.key;
    if (next && !String(next).match(regex)) {
      event.preventDefault();
    }
  }
}
