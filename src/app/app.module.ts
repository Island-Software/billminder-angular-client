import { LOCALE_ID, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import '@angular/common/locales/global/pt';
import { DatePipe } from '@angular/common';

@NgModule({
    bootstrap: [],
    imports: [],
    providers: [
        DatePipe,
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'pt' },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
