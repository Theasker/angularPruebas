import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

import { AppComponent } from './app.component';
import { ThousandsPipe } from './thousands.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ThousandsPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue:"es-ES" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }