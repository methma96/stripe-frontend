import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  // Method to create payment link with required parameters
  createPaymentLink( serviceProviderId: string, amount: number, name:string, currency:string): Observable<any> {
    const paymentLinkRequest = {
      serviceProviderId: serviceProviderId,
      amount: amount,
      jobName:name,
      currency:currency
    };

    return this.http.post<any>(`${this.baseUrl}/api/payments/create-payment-link`, paymentLinkRequest);
  }

  // Method to create payment link with required parameters
  createPaymentAccount(email: string ): Observable<any> {
    const connectAccountRequest = {
      email: email
    
    };

    return this.http.post<any>(`${this.baseUrl}/api/user/create-connected-account`, connectAccountRequest);
  }

   // Fetch services from the backend
   getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/services/`);
  }

  updateService(accountId: string, serviceName: string, amount : number): Observable<any> {
    const serviceRequest = {
      serviceProviderId: accountId,
      description:serviceName,
      amount:amount
    };
    return this.http.post<any>(`${this.baseUrl}/api/services/update-service`,serviceRequest);
  }

  verifyPayment(sessionId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/payments/verify`, { sessionId });
  }

  updateData(accountId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/payments/onboard-success`, { accountId });
  }

  refundPayment(jobId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/payments/refund`, { jobId });
  }


}
