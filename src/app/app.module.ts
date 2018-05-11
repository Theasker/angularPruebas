import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);

import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { NgxMaskModule } from 'ngx-mask'

import { AppComponent } from './app.component';
import { ThousandsPipe } from './pipes/thousands.pipe';
import { Angular2TextMaskComponent } from './angular2-text-mask/angular2-text-mask.component';
import { NgxMaskComponent } from './ngx-mask/ngx-mask.component';

@NgModule({
  declarations: [
    AppComponent,
    ThousandsPipe,
    Angular2TextMaskComponent,
    NgxMaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TextMaskModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue:"es-ES" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }