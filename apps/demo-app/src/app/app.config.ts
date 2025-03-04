import { ApplicationConfig, model, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { NGGC_API_CONFIG, NgGCSupportedModels } from '@ryanvvb/ng-gc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    {
      provide: NGGC_API_CONFIG,
      useValue: {
        apiKey: process.env.NG_GC_GEMINI_API_KEY,
        model: NgGCSupportedModels[1].name,
      }
    }
  ],
};
