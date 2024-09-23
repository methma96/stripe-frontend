import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/api/payments'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  createPaymentLink(): Observable<any> {
    // This will call the backend's createPaymentLink method
    return this.http.post(`${this.baseUrl}/create-payment-link`, {});
  }
}
