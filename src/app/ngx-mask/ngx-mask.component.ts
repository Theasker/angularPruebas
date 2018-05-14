import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngx-mask',
  template: `
    
      <input 
        type='number'
        [ngModel]="myModel | currency" 
        (change)="myModel = $event.target.value" >
    <br>Number: {{myModel}}
    <p><input 
      type='text' 
      patterns="{'0': { pattern: new RegExp('\[a-zA-Z\]')}}" 
      mask="(000) 00 00 00" ></p>

    <h2>{{myModel}}</h2>
  `,
  styleUrls: ['./ngx-mask.component.css']
})
export class NgxMaskComponent implements OnInit {
  public myModel: number;
  constructor() { }

  ngOnInit() {
  }

  textChange(value: any) {
    console.log('value: ', value);
    console.log('this.myModel: ', this.myModel);
  }

}
