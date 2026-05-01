import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './core/nav/nav.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HomeComponent } from './core/home/home.component';
import { RegisterComponent } from './core/register/register.component';
import { BillTypeDetailComponent } from './bill-type/bill-type-detail/bill-type-detail.component';
import { SharedModule } from './modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { BillListComponent } from './bill/bill-list/bill-list.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import '@angular/common/locales/global/pt';
import { BillTypeListComponent } from './bill-type/bill-type-list/bill-type-list.component';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { BillRegisterComponent } from './bill/bill-register/bill-register.component';
import { BillTypeRegisterComponent } from './bill-type/bill-type-register/bill-type-register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BillEditComponent } from './bill/bill-edit/bill-edit.component';
import { PasswordInputComponent } from './forms/password-input/password-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';
import { EmailValidateComponent } from './email-validate/email-validate.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ReceivingTypeRegisterComponent } from './receiving-type/receiving-type-register/receiving-type-register.component';
import { ReceivingTypeListComponent } from './receiving-type/receiving-type-list/receiving-type-list.component';
import { ReceivingTypeDetailComponent } from './receiving-type/receiving-type-detail/receiving-type-detail.component';
import { ReceivingRegisterComponent } from './receiving/receiving-register/receiving-register.component';
import { ReceivingEditComponent } from './receiving/receiving-edit/receiving-edit.component';

@NgModule({ declarations: [
        AppComponent,
        BillListComponent,
        BillTypeListComponent,
        BillTypeDetailComponent,
        BillRegisterComponent,
        BillTypeRegisterComponent,
        BillEditComponent,
        HomeComponent,
        NavComponent,
        NotFoundComponent,
        RegisterComponent,
        PasswordInputComponent,
        ServerErrorComponent,
        TestErrorsComponent,
        TextInputComponent,
        EmailValidateComponent,
        UserEditComponent,
        ReceivingTypeRegisterComponent,
        ReceivingTypeListComponent,
        ReceivingTypeDetailComponent,
        ReceivingRegisterComponent,
        ReceivingEditComponent
    ],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        BsDatepickerModule.forRoot(),
        FontAwesomeModule,
        FormsModule,
        ModalModule.forRoot(),
        NgbModule,
        ReactiveFormsModule,
        SharedModule], providers: [
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'pt' },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
