import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-dashboard.component.html',
  styleUrl: './account-dashboard.component.css'
})
export class AccountDashboardComponent {

  inputText: string = ''; // For storing the input field value
  isProcessingButton1: boolean = false; // Tracks if Button 1 is processing
  isProcessingButton2: boolean = false; // Tracks if Button 2 is processing

  onButton1Click(): void {
    this.isProcessingButton1 = true;
    window.location.href = `http://localhost:4200/payments?accountId=${this.inputText}`;// Redirect to the account URL
    // Simulate processing
    setTimeout(() => {
      console.log('Button 1 processing completed');
      this.isProcessingButton1 = false;
    }, 2000); // 2-second delay to simulate processing
  }

  onButton2Click(): void {
    this.isProcessingButton2 = true;
    window.location.href = `http://localhost:4200/payouts?accountId=${this.inputText}`;// Redirect to the account URL

    // Simulate processing
    setTimeout(() => {
      console.log('Button 2 processing completed');
      this.isProcessingButton2 = false;
    }, 2000); // 2-second delay to simulate processing
  }

}
