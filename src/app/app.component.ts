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
    this.numero = 50000.365;
  }

  cambioCampo(value: any){
    console.log('value: ', value);
    var re = /,/;
    var newstr = value.replace(re, '.');
    console.log('newstr: ', newstr);
    
    var flotante = parseFloat(value);
    let resultado = '' + flotante.toFixed(2);
    this.numero = value;
    console.log('this.numero: ', this.numero);
  }
}
