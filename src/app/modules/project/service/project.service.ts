import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { Projects } from "../pages/project-list/models/project.model";
import { ReportByMonth, ReportByType } from "../../dashboard/pages/report/models/reporbymonth";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private readonly http: HttpClient) { }

  getProjects(): Observable<Projects> {
    return this.http.get<Projects>(`${environment.host}/project`);
  }

  getReportByMonth(): Observable<ReportByMonth> {
    return this.http.get<ReportByMonth>(`${environment.host}/project/report/mouth`);
  }

  getProjectReportByType(): Observable<ReportByType>{
    return this.http.get<ReportByType>(`${environment.host}/project/report/type`);
  }

  saveProject(data: any): Observable<any> {
    return this.http.post(`${environment.host}/project`,data);
  }

  updateProject(data: any): Observable<any> {
    return this.http.put(`${environment.host}/project/update/${data.id}`,data);
  }

  deleteProject(id: any): Observable<any> {
    return this.http.delete(`${environment.host}/project/${id}/delete`);
  }
}
