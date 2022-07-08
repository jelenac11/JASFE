import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyRequest } from '../models/request/company-request.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  addCompanyRequest(company: CompanyRequest): Observable<any> {
    return this.http.post(`${environment.api_url}company`, company, { headers: this.headers, responseType: 'json' });
  }

  getCompanyRequests(): Observable<any> {
    return this.http.get(`${environment.api_url}companyRequests`, { responseType: 'json' });
  }

  approve(id: number, approveRequest: boolean): Observable<any> {
    return this.http.post(`${environment.api_url}company/approve`, {id: id, approve: approveRequest}, { headers: this.headers, responseType: 'json' });
  }
}
