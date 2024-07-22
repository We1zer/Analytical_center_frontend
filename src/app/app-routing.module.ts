import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfomanceComponent } from './pages/performance/performance.component';
import { SecurityListComponent } from './security/security-list/security-list.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { BankDepositListComponent } from './bank-deposit/bank-deposit-list/bank-deposit-list.component';
import { InvestmentListComponent } from './investment/investment-list/investment-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { QuotationHistoryComponent } from './quotation-history/quotation-history/quotation-history.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'',
    redirectTo:'/securities',
    pathMatch:'full'
  },
  {
    path: 'securities', component: SecurityListComponent
  },
  {
     path:'dashboard',
     component: DashboardComponent
  },
  {
    path:'clients',
    component: ClientListComponent
 },
 {
  path:'bankDeposits',
  component: BankDepositListComponent
},
{
  path:'investments',
  component: InvestmentListComponent
},
{
  path:'users',
  component: UsersListComponent
},
{
  path:'quotations',
  component: QuotationHistoryComponent
},
{
  path:'performance',
  component: PerfomanceComponent
},
  {
    path:'**',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
