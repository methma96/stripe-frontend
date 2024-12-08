import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { CutomerServiceRequestsComponent } from './cutomer-service-requests/cutomer-service-requests.component';
import { ProviderJobsComponent } from './provider-jobs/provider-jobs.component';
import { ConnectedAccountPageComponent } from './connected-account-page/connected-account-page.component';
import { AccountOnboardingComponent } from './account-onboarding/account-onboarding.component';
import { AccountPaymentsComponent } from './account-payments/account-payments.component';
import { AccountPayoutsComponent } from './account-payouts/account-payouts.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { OnboardSuccessComponent } from './onboard-success/onboard-success.component';
import { ServicePageComponent } from './service-page/service-page.component';

export const routes: Routes = [ { path: 'checkout', component: CheckoutComponent }, { path: 'return', component: PaymentSuccessComponent }, { path: 'customer-service-requests', component: CutomerServiceRequestsComponent }, { path: 'provider-job-requests', component: ProviderJobsComponent },{ path: 'create-account', component: ConnectedAccountPageComponent }, { path: 'onboard', component: AccountOnboardingComponent }, { path: 'payments', component: AccountPaymentsComponent }, { path: 'payouts', component: AccountPayoutsComponent },{ path: 'dashoboard', component: AccountDashboardComponent }, { path: 'onboarding-complete', component: OnboardSuccessComponent }, { path: 'service-details', component: ServicePageComponent }];
