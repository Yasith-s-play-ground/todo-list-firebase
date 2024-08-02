import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ng-todo-list-59c31",
    "appId":"1:1002148304886:web:5d59b2a5f3d4baa767d9d7",
    "storageBucket":"ng-todo-list-59c31.appspot.com",
    "apiKey":"AIzaSyB_eFdjV9rTiPwjNXbWdDnUteF0DweIjnE",
    "authDomain":"ng-todo-list-59c31.firebaseapp.com",
    "messagingSenderId":"1002148304886"})),
    provideAuth(() => getAuth()),
  provideFirestore(()=>getFirestore())]
};
