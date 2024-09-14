import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../service/project.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, of } from "rxjs";
import { ProjectData, Projects } from "./models/project.model";
import { DialogService } from "primeng/dynamicdialog";
import { ProjectAddEditComponent } from "./modals/project-add-edit/project-add-edit.component";


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  providers: [DialogService]
})
export class ProjectListComponent implements OnInit {
  projects !: ProjectData[];

  constructor(
      private readonly projectService: ProjectService,
      private readonly router: Router,
      private readonly builder: FormBuilder,
      private readonly dialog: DialogService,
  ) { }


  ngOnInit(): void {
    this.getProjects();
  }



  addProjectForm(): void {
    const ref = this.dialog.open(ProjectAddEditComponent,{
      header: 'Add Project',
    });
    ref.onClose.subscribe(project => {
      if(project) {
        this.projects.push(project);
      }
    });
  }

  updateProject(Project: ProjectData): void {
    const ref = this.dialog.open(ProjectAddEditComponent,{
      header: 'Update Project',
      data: Project
    });
    ref.onClose.subscribe(response => {
      if(response) {
        this.projects = this.projects.map(item=> {
          if(item.id === response.id) {
            console.log(response);
            return response;
          }
          return item;
        });
        console.log(this.projects)
      }
    });
  }


  getProjects(): void {
     this.projectService.getProjects().subscribe(response => {
       this.projects = response.data;
       console.log(response);
    });
  }

  deleteProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(response => {
      console.log(response);
      if(response.status === 204) {
        console.log('Project deleted successfully', response);
        this.projects = this.projects.filter(project => project.id !== id);
      }
    });
  }



}
