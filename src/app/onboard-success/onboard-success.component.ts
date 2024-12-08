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
      const rawAccountId = this.route.snapshot.queryParamMap.get('accountId');
      if (rawAccountId) {
        try {
          // Parse the JSON string if necessary
          const parsed = JSON.parse(rawAccountId);
          this.accountId = parsed.accountId; // Extract the actual account ID
        } catch (error) {
          console.error('Invalid accountId format:', error);
          this.accountId = rawAccountId; // Fallback if it's not JSON
        }
      }
    
      if (this.accountId) {
        // Call your backend to verify the session and update payment status
        this.paymentService.updateData(this.accountId).subscribe(
          (          response) => {
            if (response.accountId) {
              window.location.href = `http://localhost:4200/service-details?accountId=${this.accountId}`;// Redirect to the account URL
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
