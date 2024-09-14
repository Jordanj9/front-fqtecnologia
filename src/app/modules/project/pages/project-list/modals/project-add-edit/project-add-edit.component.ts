import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from "../../../../service/project.service";
import { Router } from "@angular/router";
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: 'app-project-add-edit',
  templateUrl: './project-add-edit.component.html',
  styleUrls: ['./project-add-edit.component.css'],
})
export class ProjectAddEditComponent implements OnInit {
  from !: FormGroup;
  constructor(
      private readonly projectService: ProjectService,
      private readonly router: Router,
      private readonly builder: FormBuilder,
      private readonly ref : DynamicDialogRef,
      private readonly config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.from = this.buildForm();
    this.from.patchValue(this.config.data);
  }

  buildForm(): FormGroup {
    return this.builder.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      type: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  save(): void {
    if (this.from.value.id) {
      this.updateProject();
      return;
    }
    this.addProject();
  }

  addProject(): void {
    if (!this.from.valid) {
      this.from.markAllAsTouched();
      return;
    }
    this.projectService.saveProject(this.from.value).subscribe(response => {
      if(response.status === 204) {
        this.ref.close(response.data);
      }
    });
  }

  updateProject(): void {
    if (!this.from.valid) {
      this.from.markAllAsTouched();
      return;
    }
    this.projectService.updateProject(this.from.value).subscribe(response => {
      if(response.status === 200) {
        this.ref.close(response.data);
      }
    });
  }

}
