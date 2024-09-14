import { ProjectListComponent } from "./pages/project-list/project-list.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProjectRoutingModule } from "./project.routing";
import { ProjectAddEditComponent} from "./pages/project-list/modals/project-add-edit/project-add-edit.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
      ProjectListComponent,
      ProjectAddEditComponent
    ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
      ReactiveFormsModule
  ]
})
export class ProjectModule { }