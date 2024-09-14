import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard.routing";
import { ReportComponent } from './pages/report/report.component';
@NgModule({
    declarations: [
        DashboardComponent,
        ReportComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
    ]
})
export class DashboardModule { }