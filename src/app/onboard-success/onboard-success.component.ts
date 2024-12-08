import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-onboard-success',
  standalone: true,
  imports: [],
  templateUrl: './onboard-success.component.html',
  styleUrl: './onboard-success.component.css'
})
export class OnboardSuccessComponent implements OnInit {

  accountId: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.accountId = params['accountId'];
      if (this.accountId) {
        // Call your backend to verify the session and update payment status
        this.paymentService.updateData(this.accountId).subscribe(
          (          response) => {
            if (response.accountId) {
              window.location.href = `http://localhost:4200/service-details??accountId=${response.accountId}`;// Redirect to the account URL
            } else {
              console.error('No account URL returned in the response.');
              // Handle the case where no URL is provided (optional)
            }
          },
          (          error) => {
            console.error('Error verifying payment:', error);
          }
        );
      }
    });
  }



  

}
