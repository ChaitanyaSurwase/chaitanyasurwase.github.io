import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChartData } from '../interfaces/chart-data.interface';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private apiUrl = 'http://localhost:3000/chart/:department/:success';

  constructor(private http: HttpClient) { }

  getDepartmentSuccess(department: string): Observable<ChartData> {
    const url = `${this.apiUrl}/department-success/${department}`;
    return this.http.get<ChartData>(url);
  }
}
