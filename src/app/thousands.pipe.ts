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

      console.log('pattern.test(value): ', pattern.test(value));
      if (pattern.test(value)){
        //resultado = value.replace('.', '');
        let search = '.';
        let replacement = '';
        resultado = value;
        let temp: string[] = resultado.split(search);
        resultado = temp.join(replacement);
        resultado = resultado.replace(',', '.');
        console.log('resultado: ', resultado);
      }else {
        console.log('El número introducido no es correcto');
      }
    }else { // Si es un número
      console.log('Es un número');
      let flotante: number = parseFloat(value);
      let flotanteString = flotante.toFixed(2);
      resultado = flotanteString.replace('.', ',');
    
      let pos = resultado.indexOf(",");
      
      // string.substr(<desde>, <longitud>);
      while (pos > 3) {
        resultado = resultado.substr(0, pos-3)+'.'+resultado.substr(pos-3, 3)+resultado.substr(pos);
        //resultado = resultado.substr(0, pos-3);
        pos=pos-3;
      }
    }
    //resultado value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return resultado;
  }

  filterStringNumber (stringNumber: string): string {
    return '';
  }

}