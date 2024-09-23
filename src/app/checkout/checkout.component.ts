import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  constructor(private paymentService: PaymentService, private router: Router){}

  totalAmount: number = 50 ;
  products = [
    {
      name: 'Tree shirt',
      description: 'Premium Shoes',
      quantity: 1,
      price: 20,
      imageUrl: '/assets/download.jfif' // replace with actual image path
    },
    {
      name: 'Nike Sliders',
      description: 'Comfortable everyday slippers',
      quantity: 1,
      price: 10,
      imageUrl: 'path_to_nike_image' // replace with actual image path
    }
  ];
 

  payNow() {
    this.paymentService.createPaymentLink().subscribe(
      (response: any) => {
        // Assuming the response contains the payment link URL
        if (response && response.paymentUrl) {
          window.location.href = response.paymentUrl; // Redirect to payment URL
        }
      },
      (error: any) => {
        console.error('Error creating payment link:', error);
      }
    );
  }
  

}
