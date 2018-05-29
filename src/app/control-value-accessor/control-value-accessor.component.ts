import { Component, Input, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-control-value-accessor',
  template: `
  <input 
    type="text" 
    placeholder="0,00"  
    [(ngModel)]="value" 
    [maxlength]="5" 
    (change)="onChange($event)" 
    (keydown)="onKeydown($event)"
    [disabled]="isDisabled" > 

    <p>Modelo value: {{value}}</p>
  `,
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ControlValueAccessorComponent),
        multi: true
    },
]
})
export class ControlValueAccessorComponent implements ControlValueAccessor {
  @Input('value') value: string = '1234';
    
  private propagateChange = (_: any) => { };
  private propagateTouch = (_: any) => { };
  private isDisabled: boolean = false;

  constructor() { }

  onKeydown(event: any): void {
    console.log('event: ', event);
    this.value = '0000';
  }

  writeValue(value: any): void {
    if (value) {
        this.value = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
      this.propagateChange = fn;
      console.log('this.propagateChange: ', this.propagateChange);
  }
  registerOnTouched(fn: () => void): void {
      this.propagateTouch = fn;
      console.log('this.propagateTouch: ', this.propagateTouch);
  }

  private onChange(event : any) {
    console.log('onChange event: ', event);
      this.propagateChange(this.value);
      console.log('onChange this.value: ', this.value);
      console.log('this.propagateChange(this.value): ', this.propagateChange(this.value));
  }

  private onTouch(event : any){
    console.log('onTouch event: ', event);
      this.propagateTouch(event);
      console.log('onTouch this.propagateTouch(event): ', this.propagateTouch(event));
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
