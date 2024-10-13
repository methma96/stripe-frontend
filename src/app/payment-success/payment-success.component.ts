import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service'; // Import your payment service

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  sessionId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      if (this.sessionId) {
        // Call your backend to verify the session and update payment status
        this.paymentService.verifyPayment(this.sessionId).subscribe(
          (          response) => {
            console.log('Payment verified successfully:', response);
            // You can redirect to another page or show a success message
          },
          (          error) => {
            console.error('Error verifying payment:', error);
          }
        );
      }
    });
  }
}
