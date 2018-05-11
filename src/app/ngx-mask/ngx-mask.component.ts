import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngx-mask',
  template: `
    <input 
      type='text'
      [(ngModel)]="myModel" 
      (change)="textChange($event.target.value)" 
      [dropSpecialCharacters]="false"
      mask="000.000.000,00" 
    >

    <h2>{{myModel}}</h2>
  `,
  styleUrls: ['./ngx-mask.component.css']
})
export class NgxMaskComponent implements OnInit {
  public myModel: any;
  constructor() { }

  ngOnInit() {
  }

  textChange(value: any) {
    console.log('value: ', value);
  }

}
