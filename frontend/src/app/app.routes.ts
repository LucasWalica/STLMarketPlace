import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    {path:"", loadComponent: () => HomeComponent},
    {path:"login", loadComponent: () => LoginComponent},
    {path:"register", loadComponent: () => RegisterComponent},
    {path: "**", redirectTo: () => ""}
];
