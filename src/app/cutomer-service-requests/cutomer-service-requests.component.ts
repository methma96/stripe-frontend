import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-cutomer-service-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cutomer-service-requests.component.html',
  styleUrl: './cutomer-service-requests.component.css'
})
export class CutomerServiceRequestsComponent implements OnInit {

  jobs: any; // Array to hold job data

  constructor(private http: HttpClient,private router: Router, private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.fetchJobs(0);
  }

  // Fetch jobs from the backend
  fetchJobs(customerID: number) {
    const url = `http://localhost:8080/api/jobs/?customerID=${customerID}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.jobs = data; // Assign the fetched jobs to the jobs array
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
}

approvedJobs: string[] = [];
refundedJobs: string[] = [];
disputedJobs: string[] = [];


triggerAction(jobId: string): void {
  // Call your backend API with the job ID
  if (!this.approvedJobs.includes(jobId)) {
    this.approvedJobs.push(jobId);
    console.log(`Job ${jobId} approved.`);
  }
  const apiUrl = `http://localhost:8080/api/jobs/${jobId}/approve`; // Backend API endpoint

  this.http.post(apiUrl, {}).pipe(
    catchError((error) => {
      console.error('Error approving payment:', error);
      return of(`Payment approval failed for job ID: ${jobId}`);
    })
  ).subscribe(response => {
    console.log('Payment approved and transferred for job ID:', jobId);
    // You can add further actions here, such as refreshing the job list
    this.refreshJobs();
  });
}

refundPayment(jobId: string): void {
  // Logic for refunding payment
      // Navigate to ConnectedAccountPageComponent with jobId as a query parameter
      if (!this.refundedJobs.includes(jobId)) {
        this.refundedJobs.push(jobId);
        this.paymentService.refundPayment(jobId).subscribe(
          (response) => {
            console.log('Refund success:', response);
          },
          (error) => {
            console.error('Refund failed:', error);
          }
        );
        
        console.log(`Job ${jobId} approved.`);
       
      }
}



refreshJobs(): void {
  // Optionally refresh the job list after action (add your job fetching logic here)
  // this.http.get<Job[]>('/api/jobs').subscribe(data => this.jobs = data);
  console.log('Job list refreshed');
}
}
