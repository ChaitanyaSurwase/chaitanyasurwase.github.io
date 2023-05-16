import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalProjectCount: number = 0;
  projectCounts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProjectCounts();
  }

  getProjectCounts() {
    this.http.get<any[]>('http://localhost:3000/count').subscribe(data => {
      this.totalProjectCount = this.calculateTotalCount(data);
      this.projectCounts = data;
    });
  }

  calculateTotalCount(projectCounts: any[]): number {
    let totalCount = 0;
    for (const count of projectCounts) {
      totalCount += count.count;
    }
    return totalCount;
  }
  
}
