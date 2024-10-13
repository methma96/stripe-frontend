import { Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { CutomerServiceRequestsComponent } from './cutomer-service-requests/cutomer-service-requests.component';
import { ProviderJobsComponent } from './provider-jobs/provider-jobs.component';

export const routes: Routes = [ { path: 'checkout', component: CheckoutComponent }, { path: 'return', component: PaymentSuccessComponent }, { path: 'customer-service-requests', component: CutomerServiceRequestsComponent }, { path: 'provider-job-requests', component: ProviderJobsComponent }];
