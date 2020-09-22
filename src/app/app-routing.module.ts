import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardGuard } from './services/guards/auth-guard.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { UserResolverService } from './services/user-resolver/user-resolver.service';
import { RegisterComponent } from './register/register.component';
import { AccountSelectionComponent} from './account-selection/account-selection.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard], resolve: {user: UserResolverService} },
  {path: 'register', component: RegisterComponent},
  {path: 'transfers', component: TransferFundsComponent, canActivate: [AuthGuardGuard], resolve: {user: UserResolverService} },
  {path: 'account-selection', component: AccountSelectionComponent, canActivate: [AuthGuardGuard], resolve: {user: UserResolverService} },
  {path: 'account-settings', component: AccountSettingsComponent, canActivate: [AuthGuardGuard], resolve: {user: UserResolverService} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
