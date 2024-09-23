import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
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
    // Redirect to the Stripe checkout link
    window.location.href = 'https://buy.stripe.com/test_28ocOa0DT8TbgcoeUU';
  }
  

}
