import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { SOCIAL_AUTH_SERVICE_CONFIG } from './app/social-login.token';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from './enviroment/enviroment';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth.interceptor'
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { firebaseConfig } from './enviroment/firebase_enviroment';


bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
   {
      provide: SOCIAL_AUTH_SERVICE_CONFIG,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId),
          },
        ],
      },
    },
    importProvidersFrom(SocialLoginModule),
    provideRouter(routes),
  ], 
});
