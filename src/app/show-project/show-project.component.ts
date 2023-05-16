import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/show-project.service';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent implements OnInit {
  projects: any[] = [];
  searchTerm: string = '';
  selectedColumn: string = ''; // Add this line
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  // getProjects(): void {
  //   this.projectService.getProjects().subscribe((data: any[]) => {
  //     this.projects = data;
  //   });
  // }
  getProjects(): void {
    this.projectService.getProjects().subscribe((data: any[]) => {
      this.projects = data;
      this.totalPages = Math.ceil(this.projects.length / this.itemsPerPage);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      this.goToPage(1); // Add this line to set the current page to 1 initially
    });
  }
  
  

  updateStatus(recordId: string, buttonClicked: string): void {
    this.projectService.updateStatus(recordId, buttonClicked).subscribe(
      (response: any) => {
        const updatedStatus = response.status;
        const projectToUpdate = this.projects.find((project) => project._id === recordId);
        if (projectToUpdate) {
          projectToUpdate.status = updatedStatus;
        }
      },
      (error) => {
        console.error('An error occurred while updating the status:', error);
      }
    );
  }

  searchProjects(): void {
    this.projectService.searchProjects(this.searchTerm).subscribe((data: any[]) => {
      this.projects = data.filter((project) => {
        // Convert all fields to lowercase for case-insensitive search
        const projectName = project.projectName.toLowerCase();
        const reason = project.reason.toLowerCase();
        const type = project.type.toLowerCase();
        const division = project.division.toLowerCase();
        const category = project.category.toLowerCase();
        const priority = project.priority.toLowerCase();
        const department = project.department.toLowerCase();
        const location = project.location.toLowerCase();
        const status = project.status.toLowerCase();
        
        // Check if any field contains the search term
        return (
          projectName.includes(this.searchTerm.toLowerCase()) ||
          reason.includes(this.searchTerm.toLowerCase()) ||
          type.includes(this.searchTerm.toLowerCase()) ||
          division.includes(this.searchTerm.toLowerCase()) ||
          category.includes(this.searchTerm.toLowerCase()) ||
          priority.includes(this.searchTerm.toLowerCase()) ||
          department.includes(this.searchTerm.toLowerCase()) ||
          location.includes(this.searchTerm.toLowerCase()) ||
          status.includes(this.searchTerm.toLowerCase())
        );
      });
    });
  }
  
  sortProjects(selectedColumn: string): void {
    if (selectedColumn) {
      this.projects.sort((a, b) => {
        const valueA = a[selectedColumn]?.toLowerCase();
        const valueB = b[selectedColumn]?.toLowerCase();
  
        if (valueA < valueB) {
          return -1;
        }
        
        if (valueA > valueB) {
          return 1;
        }
        
        return 0;
      });
    }
  }
  getPaginatedProjects(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.projects.length);
    return this.projects.slice(startIndex, endIndex);
  }
  goToPage(page: number): void {
    this.currentPage = page;
  }
    
}
