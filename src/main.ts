import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { appRoutingProviders } from './app/app-routing.module';


import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { CustomTranslateLoader } from './app/custom-translate-loader';
import { HttpClient } from '@angular/common/http';

export function CustomLoaderFactory(http: HttpClient): TranslateLoader {
  return new CustomTranslateLoader(http);
}

bootstrapApplication(AppComponent, {
  providers: [
    appRoutingProviders,
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'de',
        loader: {
          provide: TranslateLoader,
          useFactory: CustomLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    appConfig.providers
  ]
}).catch(err => console.error(err));
