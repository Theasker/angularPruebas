import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousands'
})
export class ThousandsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    console.log('Value: ', value + " / " + 'typeof(value): ' + typeof(value));
    let resultado: string;
    if (isNaN(value)){ // NO es un número
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
    }else { // Si es un número
      resultado = this.numberToString(value);
    }
    //resultado value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return resultado;
  }

  numberToString (stringNumber: string): string {
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

  parseStringNumber (stringNumber: string): string {
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