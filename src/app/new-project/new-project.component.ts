import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent {
  projectName: string = '';
  reason: string = '';
  type: string = '';
  division: string = '';
  category: string = '';
  priority: string = '';
  department: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  location: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router // Add this line to import the Router class
  ) {}

  saveProject() {
    const project = {
      projectName: this.projectName,
      reason: this.reason,
      type: this.type,
      division: this.division,
      category: this.category,
      priority: this.priority,
      department: this.department,
      startDate: this.startDate,
      endDate: this.endDate,
      location: this.location,
    };
    
    this.projectService.createProject(project)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/show-project']); // Navigate to the show project page on success
        },
        error => console.log(error)
      );
  }
}
