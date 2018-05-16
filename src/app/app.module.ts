import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { NgxMaskModule } from 'ngx-mask';
// Componentes
import { AppComponent } from './app.component';
// Módulos de máscara de terceros
import { Angular2TextMaskComponent } from './angular2-text-mask/angular2-text-mask.component';
import { NgxMaskComponent } from './ngx-mask/ngx-mask.component';
// Filtros propios
import { ThousandsPipe } from './pipes/thousands.pipe';
import { MyCurrencyPipe } from './pipes/my-currency.pipe';
// Directivas
import { MyCurrencyFormatterDirective } from './directivas/my-currency-formatter.directive';

@NgModule({
  declarations: [
    AppComponent,
    ThousandsPipe,
    MyCurrencyPipe,
    Angular2TextMaskComponent,
    NgxMaskComponent,
    MyCurrencyFormatterDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TextMaskModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    MyCurrencyFormatterDirective
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    MyCurrencyPipe,
    ThousandsPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }