import { Component, OnInit, forwardRef, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputTextNumberComponent),
  multi: true
};

@Component({
  selector: 'number-input',
  template:` 
  <div class="custom-input">
    {{ label }} <input type="text" (input)="onChange($event)"  />
  </div>
  `,
  providers: [ customValueProvider  ]
})
export class InputTextNumberComponent implements OnInit, ControlValueAccessor {
  public InputVal: number;
  _value = '';
  propagateChange:any = () => {};

  @Input() label: string;
  
  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any): void {
    console.log('writeValue value: ', value);
    if( value ){
      this._value = value;  
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { 
    console.log('registerOnTouched fn: ', fn);
  }
  
  setDisabledState?(isDisabled: boolean): void {  }
  onChange(event){
    console.log('onChange event: ', event);
    this.propagateChange(event.target.value);
  }  
}
