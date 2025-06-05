import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; 
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { NgCircleProgressModule } from 'ng-circle-progress';

registerLocaleData(localeRu);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    importProvidersFrom( 
      NgCircleProgressModule.forRoot({
        radius: 60,
        outerStrokeWidth: 10,
        innerStrokeWidth: 5,
        outerStrokeColor: '#78C000',
        innerStrokeColor: '#C7E596',
        animationDuration: 1000
      })
    )
  ]
}).catch(err => console.error(err));
