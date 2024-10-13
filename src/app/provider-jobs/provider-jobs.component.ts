import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-provider-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './provider-jobs.component.html',
  styleUrl: './provider-jobs.component.css'
})
export class ProviderJobsComponent implements OnInit {

  jobs: any; // Array to hold job data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchJobs(0);
  }

   // Track approved jobs by their ID
   approvedJobs: string[] = [];

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

approveJob(jobId: string): void {
  // Call your backend API with the job ID

  if (!this.approvedJobs.includes(jobId)) {
    this.approvedJobs.push(jobId);
    console.log(`Job ${jobId} approved.`);
  }
  const apiUrl = `http://localhost:8080/api/jobs/${jobId}/complete`; // Backend API endpoint

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

refreshJobs(): void {
  // Optionally refresh the job list after action (add your job fetching logic here)
  // this.http.get<Job[]>('/api/jobs').subscribe(data => this.jobs = data);
  console.log('Job list refreshed');
}

}
