import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { MyCurrencyPipe } from "../pipes/my-currency.pipe";
import { ThousandsPipe } from "../pipes/thousands.pipe";


@Directive({
  selector: '[appMyCurrencyFormatter]'
})
export class MyCurrencyFormatterDirective implements OnInit {
  private el: HTMLInputElement;  

  ngOnInit(): void {
    this.el.value = this.currencyPipe.transform(this.el.value);
  }
 
  constructor(
    private elementRef: ElementRef,
    private currencyPipe: MyCurrencyPipe,
    //private thousandsPipe: ThousandsPipe
  ) {
    this.el = this.elementRef.nativeElement;
    this.elementRef.nativeElement.style.backgroundColor = 'yellow';
  }
/* 
  constructor(
    private elementRef: ElementRef,
    private
  ) {
    elementRef.nativeElement.style.backgroundColor = 'yellow';
 }
 */
  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    console.log('Directiva (onFocus)value: ', value);
    if (isNaN(value)){ // NO es un número correcto
      //this.el.value = this.cleanString(value);
      console.log('Directiva: NO es número -> this.numero: ');
    }else {
      //this.numero = parseFloat(value);
      console.log('Directiva: ES número -> this.numero: ');
    }
    //this.el.value = this.currencyPipe.parse(value); // opossite of transform
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    console.log('Directiva (onBlur)value: ', value);
    //this.el.value = this.currencyPipe.transform(value);
  }

}
