import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { LOCALE_ID } from '@angular/core';
// import localeEs from '@angular/common/locales/es';
// import { registerLocaleData } from '@angular/common';
// registerLocaleData(localeEs);

import { FormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';

// Filtros propios
import { ThousandsPipe } from './pipes/thousands.pipe';

// Directivas
import { MyCurrencyFormatterDirective } from './directivas/my-currency-formatter.directive';
import { InputTextNumberComponent } from './input-text-number/input-text-number.component';
import { RatingInputComponent } from './rating-input/rating-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ThousandsPipe,
    MyCurrencyFormatterDirective,
    InputTextNumberComponent,
    RatingInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  exports: [
    MyCurrencyFormatterDirective
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'es-ES' },
    ThousandsPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }