import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:8080'; // Update this URL according to your API

  constructor(private http: HttpClient) {}

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/services`);
  }

  getServiceJobs(customerID: number): Observable<any[]> {
    // Create an instance of HttpParams to pass the query parameter
    const params = new HttpParams().set('customerID', customerID.toString());

    // Pass the params object to the request
    return this.http.get<any[]>(`${this.apiUrl}/api/jobs/`, { params });
  }
}
