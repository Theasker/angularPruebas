import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousands'
})
export class ThousandsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    console.log('isNaN(value): ',value + ' ' + isNaN(value));    
    let resultado: string;
    if (isNaN(value)){ // Si no es un número
      console.log('No es un número: ', value);
    }else { // Si es un número
      let flotante: number = parseFloat(value);
      let flotanteString = flotante.toFixed(2);
      resultado = flotanteString.replace('.', ',');
      console.log('flotanteString: ', flotanteString);
      let pos = resultado.indexOf(",");
      
      
      // array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
      console.log('pos: ', pos);
      while (pos > 3) {
        console.log('flotanteString.substr(0, pos-3): ', flotanteString.substr(0, pos-3));
        resultado = flotanteString.substr(0, pos-3)+'.'+flotanteString.substr(pos-3, pos)+flotanteString.substr(pos);
        pos=pos-3;
        console.log('pos: ', pos);
      }
      
      
      //let resultadoString = 
      console.log('Resultado (es un número): ', resultado);
    }
    
    //resultado value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    return resultado;
  }

}