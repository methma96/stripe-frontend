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
  createPaymentLink(priceId: string, serviceProviderId: string, amount: number, name:string): Observable<any> {
    const paymentLinkRequest = {
      priceId: priceId,
      serviceProviderId: serviceProviderId,
      amount: amount,
      jobName:name
    };

    return this.http.post<any>(`${this.baseUrl}/api/payments/create-payment-link`, paymentLinkRequest);
  }

   // Fetch services from the backend
   getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/services/`);
  }

  verifyPayment(sessionId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/payments/verify`, { sessionId });
  }

}
