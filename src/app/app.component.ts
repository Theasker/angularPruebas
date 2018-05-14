import { Component } from '@angular/core';
import { merge } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  numero: number;
  
  constructor() {
    this.numero = 1234567890.367;
    //this.numero = '1.234.567.890,37';
  }
  
  
  /**
   * @param  {any} value
   */
  cambioCampo(value: any){
    console.log('value: ', value);
    if (isNaN(value)){ // NO es un número correcto
      // 10.568.456.122,55
      let pattern: any = /^(([0-9]{1,3}\.)*([0-9]{1,3})(\,[0-9]*)?)?([0-9]*)?$/;
      console.log('pattern.test(value): ', pattern.test(value));
      if (pattern.test(value)){
        console.log('El número introducido está con separadores de miles y con coma decimal');
        this.numero = parseFloat(this.parseStringNumber(value));
      }else {
        pattern = /^((([0-9])+(\.)*)*([0-9]{1,3})(\,[0-9]*)?)?([0-9]*)?$/;
        if (pattern.test(value)) {
          console.log('El número introducido contiene puntos y coma decimal');
          this.numero = parseFloat(this.parseStringNumber(value));
        }else {
          console.log('El número es ilegible. Intentando convertirlo a número');
          this.numero = parseFloat(this.cleanString(value));
        }
      }
    }else {
      this.numero = parseFloat(value);
    }
  }
  
  /**
   * Convierte a número
   * Elimina los puntos de miles y cambia la coma decimal por punto
   * @param  {string} stringNumber
   * @returns string
   */
  parseStringNumber (stringNumber: string): string {
    let result: string;
    let search: string = '.';
    let replacement: string = '';
    result = stringNumber;
    let temp: string[] = result.split(search);
    result = temp.join(replacement);
    result = result.replace(',', '.');
    return result;
  }

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
    console.log('result: ', result);
    return result;
  }
}
