import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';

// Filtros propios
import { ThousandsPipe } from './pipes/thousands.pipe';

// Directivas
import { MyCurrencyFormatterDirective } from './directivas/my-currency-formatter.directive';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormsComponent,
    ThousandsPipe,
    MyCurrencyFormatterDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MyCurrencyFormatterDirective
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    ThousandsPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }