import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfomanceComponent } from './pages/performance/performance.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CustomeInterceptor } from './services/custome.interceptor';
import { SecurityModule } from './security/security.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientModule } from './client/client.module';
import { BankDepositModule } from './bank-deposit/bank-deposit.module';
import { InvestmentModule } from './investment/investment.module';
import { UsersModule } from './users/users.module';
import { QuotationHistoryModule } from './quotation-history/quotation-history.module';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        LayoutComponent,
        DashboardComponent,
        PerfomanceComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        SecurityModule,
        ClientModule,
        BankDepositModule,
        InvestmentModule,
        UsersModule,
        QuotationHistoryModule,
        BrowserAnimationsModule], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomeInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
