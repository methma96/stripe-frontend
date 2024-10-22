import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { loadStripe, Stripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
 
  checkoutForm: FormGroup;  // Define a FormGroup
  services: any[] = [];      // Array to hold services
  selectedPriceId='';
  selectedServiceId='';
  amount=0;
  serviceProviderId='';
  selectedServiceName='';
  clientSecret: string | null = null;
  safeUrl: SafeResourceUrl | undefined;
  stripe: Stripe | null = null;
  isProcessing : boolean = false;


  constructor(private paymentService: PaymentService, private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.checkoutForm = this.fb.group({
      selectedServiceId: ['']  // Initialize form control for the service
    });
  }

  ngOnInit(){
    // Fetch services from backend
    this.initializeStripe();
    this.paymentService.getServices().subscribe(
      (data) => {
        this.services = data;  // Populate services with fetched data
      },
      (error) => {
        console.error('Error fetching services', error);
      }
    );
  }

  onServiceChange(event: Event): void {
    // Get the selected service ID from the form control
    const selectedServiceId = this.checkoutForm.get('selectedServiceId')?.value;
    
    // Find the selected service in the array based on the selected service ID
    const selectedService = this.services.find(service => service.id === selectedServiceId);
    
    if (selectedService) {
      this.selectedPriceId = selectedService.priceId; // Assuming each service has a priceId
      this.selectedServiceName=selectedService.name;
      this.amount=selectedService.amount;
      this.serviceProviderId=selectedService.serviceProviderID;
    }
  }
  
  async initializeStripe(){
    this.stripe= await loadStripe('pk_test_51Pv9zYIhwUT0ZWX41pej2W8IpYIXoYsOEZ9PBIEBfHqCep3INEGWs11w66ecrIQQjQdi9KpLLbyhH4qR7quBYKT300WSeHoZmU');
  }
  

  // Handle payment logic, now using the selected service ID
  async payNow(): Promise<void> {
    const selectedServiceId = this.checkoutForm.get('selectedServiceId')?.value;
    const selectedService = this.services.find(service => service.id === selectedServiceId);
    if (selectedService) {
      this.selectedPriceId = selectedService.priceId; // Assuming each service has a priceId.
      this.selectedServiceName=selectedService.name;
      this.amount=selectedService.amount;
      this.serviceProviderId=selectedService.serviceProviderID;
    }

  
    if (!selectedServiceId || !this.selectedPriceId) {
      alert('Please select a service');
      return;
    }

    this.isProcessing = true;  // To show loading UI

  
    this.paymentService.createPaymentLink(this.selectedPriceId, this.serviceProviderId, this.amount, this.selectedServiceName).subscribe(
      async (response: any) => {
        // Assuming the response contains the payment link URL
        if (response && response.clientSecret) {
          this.clientSecret = response.clientSecret;  // Set the payment URL for iframe
          const checkout = await this.stripe?.initEmbeddedCheckout({
          fetchClientSecret:async () => this.clientSecret!});
        
          // Mount Checkout
          if(checkout){
          checkout.mount('#checkout');
          this.isProcessing = false;
          }
          
        } else {
          console.error('No payment URL returned from server');
          this.isProcessing = false;
        }
      },
      (error: any) => {
        console.error('Error creating payment link:', error);
        this.isProcessing = false;
      }
    );

    
  }
  
}
