import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  numero: number;
  
  constructor() {
    this.numero = 1234567890.367;
    //this.numero = '1.234.567.890,37';
  }
  /**
   * @param  {any} value
   */
  cambioCampo(value: any){
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
          console.log('El número es ilegible');
        }
      }
      //this.numero = parseFloat(resultado);
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
}
