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


  countries = [
   
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Canada', code: 'CA' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Italy', code: 'IT' },
    { name: 'Japan', code: 'JP' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Malta', code: 'MT' },
    { name: 'Mexico ', code: 'MX' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Norway', code: 'NO' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Romania', code: 'RO' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Thailand', code: 'TH' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' }
    // Add more countries as needed
  ];

  constructor(private fb: FormBuilder,private paymentService: PaymentService, private route: ActivatedRoute) {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      serviceName: ['', Validators.required],
      amount: ['', Validators.required],
      
    });
  }

  ngOnInit(): void {
  
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const { email  } = this.accountForm.value;

      this.paymentService.createPaymentAccount(email).subscribe(
        response => {
          console.log('Account created successfully:', response);
          
          // Check if the response has an accountUrl and redirect
          if (response.accountId) {
            window.location.href = `http://localhost:4200/onboard?accountId=${response.accountId}`;// Redirect to the account URL
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
