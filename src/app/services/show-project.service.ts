import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getProject`);
  }

  updateStatus(recordId: string, buttonClicked: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/update/${recordId}`;
    const body = { button: buttonClicked };
    return this.http.patch(apiUrl, body);
  }

  searchProjects(searchTerm: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/search`;
    const params = new HttpParams().set('term', searchTerm);
    return this.http.get<any>(apiUrl, { params });
  }
}
