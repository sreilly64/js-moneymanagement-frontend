import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountPreviewComponent } from './account-preview/account-preview.component';
import { RegisterComponent } from './register/register.component';
import { AccountSelectionComponent } from './account-selection/account-selection.component';
import { FormsModule }   from '@angular/forms';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AccountPreviewComponent,
    RegisterComponent,
    AccountSelectionComponent,
    TransferFundsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
