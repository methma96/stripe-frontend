import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css'],
})
export class AccountDashboardComponent {
  accountForm: FormGroup; // Form group for managing the form controls
  isProcessingButton1: boolean = false; // Tracks if Button 1 is processing
  isProcessingButton2: boolean = false; // Tracks if Button 2 is processing

  constructor() {
    // Initialize the form group with a FormControl
    this.accountForm = new FormGroup({
      accountId: new FormControl('', [Validators.required]), // FormControl with validation
    });
  }

  // Getter for the account ID value
  get accountId(): string {
    return this.accountForm.get('accountId')?.value;
  }

  onButton1Click(): void {
    if (this.accountForm.invalid) return;

    this.isProcessingButton1 = true;
    const accountId = this.accountId; // Retrieve the input value from the form group
    window.location.href = `http://localhost:4200/payments?accountId=${accountId}`;

    // Simulate processing
    setTimeout(() => {
      console.log('Button 1 processing completed');
      this.isProcessingButton1 = false;
    }, 2000); // 2-second delay to simulate processing
  }

  onButton2Click(): void {
    if (this.accountForm.invalid) return;

    this.isProcessingButton2 = true;
    const accountId = this.accountId; // Retrieve the input value from the form group
    window.location.href = `http://localhost:4200/payouts?accountId=${accountId}`;

    // Simulate processing
    setTimeout(() => {
      console.log('Button 2 processing completed');
      this.isProcessingButton2 = false;
    }, 2000); // 2-second delay to simulate processing
  }
}
