import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connected-account-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './connected-account-page.component.html',
  styleUrl: './connected-account-page.component.css'
})
export class ConnectedAccountPageComponent implements OnInit{
  accountForm: FormGroup;
  jobId: string | null = null;

  countries = [
    { name: 'United States', code: 'US' },
    { name: 'Canada', code: 'CA' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'Australia', code: 'AU' },
    { name: 'India', code: 'IN' }
    // Add more countries as needed
  ];

  constructor(private fb: FormBuilder,private paymentService: PaymentService, private route: ActivatedRoute) {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.jobId = params['jobId'];
      console.log(`Received job ID: ${this.jobId}`);
      // Additional logic can go here, like loading data related to the job ID
    });
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const { email, country } = this.accountForm.value;

      this.paymentService.createPaymentAccount(email, country, this.jobId).subscribe(
        response => {
          console.log('Account created successfully:', response);
          
          // Check if the response has an accountUrl and redirect
          if (response.accountUrl) {
            window.location.href = response.accountUrl; // Redirect to the account URL
          } else {
            console.error('No account URL returned in the response.');
            // Handle the case where no URL is provided (optional)
          }
        },
        error => {
          console.error('Error creating account:', error);
          // Handle error response (e.g., display an error message)
        }
      );
    }
  }


}
