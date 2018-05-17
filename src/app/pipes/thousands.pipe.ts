import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousands'
})

export class ThousandsPipe implements PipeTransform {
  
  transform(value: any, args?: any): any {
    console.log('Value: ', value + " / " + 'typeof(value): ' + typeof(value));
    let resultado: string;
    if (isNaN(value)){ // NO es un número
      console.log('No es un número');
/* 
      // 10.568.456.122,55
      let pattern: any = /^(([0-9]{1,3}\.)*([0-9]{1,3})(\,[0-9]*)?)?([0-9]*)?$/;
      if (pattern.test(value)){
        //resultado = value.replace('.', '');
        resultado = this.parseStringNumber(value);
      }else {
        pattern = /^((([0-9])+(\.)*)*([0-9]{1,3})(\,[0-9]*)?)?([0-9]*)?$/;
        if (pattern.test(value)) {
          resultado = this.parseStringNumber(value);
        }else { // No coincide con ningún patrón
          console.log('No coincide con ningún patrón');
          resultado = 'error';
        }
        console.log('resultado: ', resultado);
        console.log('El número introducido no es correcto');
      }
       */
      resultado = this.cleanString(this.parseStringNumber(value));
    }else { // Si es un número
      resultado = this.numberToString(value);
    }
    //resultado value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    console.log('resultado: ', resultado);
    return resultado;
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
   * Convierte un numero con formato 00.000.000,00 a un número
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