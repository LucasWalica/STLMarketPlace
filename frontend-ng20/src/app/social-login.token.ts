// src/app/social-login.token.ts
import { InjectionToken } from '@angular/core';
import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

export const SOCIAL_AUTH_SERVICE_CONFIG = new InjectionToken<SocialAuthServiceConfig>('SocialAuthServiceConfig');
