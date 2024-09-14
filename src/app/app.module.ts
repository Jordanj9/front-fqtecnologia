import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from "./modules/auth/pages/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from './modules/auth/pages/signup/signup.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor} from "./auth.interceptor";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        DynamicDialogModule,
        BrowserAnimationsModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
