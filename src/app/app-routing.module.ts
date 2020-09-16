import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardGuard } from './services/guards/auth-guard.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AccountSelectionComponent} from './account-selection/account-selection.component';


const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'account-selection', component: AccountSelectionComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
