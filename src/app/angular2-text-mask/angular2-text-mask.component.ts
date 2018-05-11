import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular2-text-mask',
  template: `
  <input 
    [textMask]="{mask: mask}" 
    [(ngModel)]="myModel" 
    (change)="textChange($event.target.value)" 
    type="text"
  />
  <h2>{{myModel}}</h2>
  `,
  styleUrls: ['./angular2-text-mask.component.css']
})
export class Angular2TextMaskComponent implements OnInit {
  public myModel = ''
  //public mask = ['(',/[1-9]/,/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]:
  // /^(([0-9]{1,3}\.)*([0-9]{1,3})(\,[0-9]*)?)?([0-9]*)?$/
public mask2 = [/^(([0-9]{1,3}\.)*([0-9]{1,3})(\,[0-9]*)?)?([0-9]*)?$/];
public mask = [/\d/,/\d/,/\d/,'.',/\d?/,/\d?/,/\d+/,',',/\d/,/\d/,/\d/,/\d/];

  constructor() { }

  ngOnInit() {
  }

  textChange(value: any){
    console.log('value: ', typeof(value) + ' / ' + value);
  }

}
