import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  numero: any;
  
  constructor() {
    this.numero = 1234567890.367;
    //this.numero = '1.234.567.890,37';
  }

  cambioCampo(value: any){
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
      this.numero = parseFloat(resultado);
      console.log('this.numero: ', this.numero);
    }
  }
}
