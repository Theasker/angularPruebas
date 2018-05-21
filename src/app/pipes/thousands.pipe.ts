import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousands'
})

export class ThousandsPipe implements PipeTransform {
  
  /**
   * Controlador que distribuye el parseo dependiendo de lo que le llega es numérico o no
   * @param  {any} value
   * @param  {any} args?
   * @returns any
   */
  transform(value: any, args?: any): any {
    console.log('Value: ', value + " / " + 'typeof(value): ' + typeof(value));
    let resultado: string;
    if (isNaN(value)){ // NO es un número
      console.log('No es un número');
      resultado = this.cleanString(this.parseStringNumber(value));
    }else { // Si es un número
      resultado = this.numberToString(value);
    }
    //resultado value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return resultado;
  }

  /**
   * Convierte un número 1234.45 a formato 1.234,45
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
   * Convierte un numero con formato 00.000.000,00 a un número
   * @param {string} stringNumber
   * @returns string
   */
  public parseStringNumber (stringNumber: string): string {
    console.log('parseStringNumber stringNumber: ', stringNumber);
    let resultado: string;
    let search: string = '.';
    let replacement: string = '';
    resultado = stringNumber;
    let temp: string[] = resultado.split(search);
    resultado = temp.join(replacement);
    resultado = resultado.replace(',', '.');
    console.log('parseStringNumber resultado: ', resultado);
    return resultado;    
  }

  /**
   * Limpia cualquier string dejando sólo los números y cambiando la coma por punto decimal
   * @param  {string} dirtyString
   * @returns string
   */
  public cleanString (dirtyString: string): string {
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