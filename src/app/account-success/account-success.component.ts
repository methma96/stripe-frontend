import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-account-success',
  standalone: true,
  imports: [],
  templateUrl: './account-success.component.html',
  styleUrl: './account-success.component.css'
})
export class AccountSuccessComponent implements OnInit{

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
        this.paymentService.refundPayment(this.sessionId).subscribe(
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
