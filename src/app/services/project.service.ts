import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createProject(project: any) {
    const url = `${this.API_URL}/newProject`;
    return this.http.post(url, project);
  }

}