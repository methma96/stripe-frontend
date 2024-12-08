import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.css'
})
export class ServicePageComponent implements OnInit {
  accountForm: FormGroup;
  accountId: any;

  
  constructor(private fb: FormBuilder,private paymentService: PaymentService, private route: ActivatedRoute) {
    this.accountForm = this.fb.group({
      serviceName: ['', Validators.required],
      amount: ['', Validators.required]
      
    });
  }

  ngOnInit(): void {
  
    this.accountId = this.route.snapshot.queryParamMap.get('accountId');

  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      const { serviceName  } = this.accountForm.value;
      const { amount  } = this.accountForm.value;
     
      if(this.accountId){
        this.paymentService.updateService(this.accountId,serviceName, amount).subscribe(
          response => {
            console.log('Account created successfully:', response);
            
            // Check if the response has an accountUrl and redirect
            if (response.accountId) {
              window.location.href = `http://localhost:4200/checkout`;// Redirect to the account URL
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

}
