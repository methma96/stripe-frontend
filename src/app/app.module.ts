import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { PaymentService } from './services/payment.service';
import { CommonModule } from '@angular/common';
import { CutomerServiceRequestsComponent } from './cutomer-service-requests/cutomer-service-requests.component';
import { JobService } from './services/job.service';
import { ProviderJobsComponent } from './provider-jobs/provider-jobs.component';
import { ConnectedAccountPageComponent } from './connected-account-page/connected-account-page.component';
import { AccountOnboardingComponent } from './account-onboarding/account-onboarding.component';
import { AccountPaymentsComponent } from './account-payments/account-payments.component';
import { AccountPayoutsComponent } from './account-payouts/account-payouts.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { OnboardSuccessComponent } from './onboard-success/onboard-success.component';
import { ServicePageComponent } from './service-page/service-page.component';




@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    CutomerServiceRequestsComponent,
    ProviderJobsComponent,
    ConnectedAccountPageComponent,
    AccountOnboardingComponent,
    AccountPaymentsComponent,
    AccountPayoutsComponent,
    AccountDashboardComponent,
    OnboardSuccessComponent,
    ServicePageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    // <-- Ensure FormsModule is imported here
  ],
  providers: [PaymentService,JobService],  // Add PaymentService if it's not added already
  bootstrap: [AppComponent]
})
export class AppModule { }
