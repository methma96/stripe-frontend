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
  createPaymentLink(priceId: string, serviceProviderId: string, amount: number, name:string, currency:string): Observable<any> {
    const paymentLinkRequest = {
      priceId: priceId,
      serviceProviderId: serviceProviderId,
      amount: amount,
      jobName:name,
      currency:currency
    };

    return this.http.post<any>(`${this.baseUrl}/api/payments/create-payment-link`, paymentLinkRequest);
  }

  // Method to create payment link with required parameters
  createPaymentAccount(email: string, countryCode: string, currency:string, accountHolderName:string, accountNumber:string,routingNumber:string  ): Observable<any> {
    const connectAccountRequest = {
      email: email,
      countryCode: countryCode,
      bankCountry: countryCode,
      currency:currency,
      accountHolderName: accountHolderName,
      accountNumber:accountNumber,
      routingNumber:routingNumber

    };

    return this.http.post<any>(`${this.baseUrl}/api/user/create-connected-account`, connectAccountRequest);
  }

   // Fetch services from the backend
   getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/services/`);
  }

  verifyPayment(sessionId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/payments/verify`, { sessionId });
  }

  refundPayment(jobId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/payments/refund`, { jobId });
  }

  disputePayment(jobId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/payments/refund`, { jobId });
  }

}
