import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from "chart.js";
import { ProjectService} from "../../../project/service/project.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  constructor(private readonly projectService: ProjectService) {
  }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.getProjects();
    this.reportLineByMonth();
    this.reportAreaByType();
  }

  getProjects(): void {
    this.projectService.getReportByMonth().subscribe(response => {
      const html = document.getElementById('myChart') as  HTMLCanvasElement;
      const ctx = html.getContext('2d');
      if (!ctx)  return;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
          datasets: [{
            label: 'Total Value',
            data: response.data.map(item => item.total_value),
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  reportLineByMonth(): void {
    this.projectService.getReportByMonth().subscribe(response => {
      const html = document.getElementById('myChartLine') as  HTMLCanvasElement;
      const ctx = html.getContext('2d');
      if (!ctx)  return;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: response.data.map(item => item.month),
          datasets: [{
            label: 'Total Value',
            data: response.data.map(item => item.total_value),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
      });
    });
  }

  reportAreaByType(): void {
    this.projectService.getProjectReportByType().subscribe(response => {
      console.log(response.data);
      const html = document.getElementById('myChartPolarArea') as  HTMLCanvasElement;
      const ctx = html.getContext('2d');
      if (!ctx)  return;

      new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: response.data.map(item => item.type),
          datasets: [{
            label: 'Projects Type',
            data: response.data.map(item => item.total),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
          }]
        },
      });
    });
  }
}
