import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
// import {
//   ApexAxisChartSeries,
//   ApexChart,
//   ApexXAxis,
//   ApexDataLabels,
//   ApexTitleSubtitle
// } from "ng-apexcharts";
//
// export type ChartOptions = {
//   series: ApexAxisChartSeries;
//   xaxis: ApexXAxis;
//   chart: ApexChart;
//   datalabels: ApexDataLabels;
//   title: ApexTitleSubtitle;
// };

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // public chartOptions: Partial<ChartOptions>;

  constructor(private readonly authService: AuthService, private readonly router: Router) {
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: 'Projects',
    //       data: [10, 15, 5, 25, 20, 10, 40, 15, 25, 20]
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: 'line'
    //   },
    //   title: {
    //     text: 'Projects Overview'
    //   },
    //   xaxis: {
    //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
    //   }
    // };
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
