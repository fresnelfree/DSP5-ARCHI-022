import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { ChartOptions, ChartType,  } from 'chart.js';
import {  BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables)
@Component({
  selector: 'app-dhb-chart',
  templateUrl: './dhb-chart.component.html',
  styleUrls: ['./dhb-chart.component.css']
})
export class DhbChartComponent implements OnInit {
  
  ngOnInit(): void {
      // this.afficherChart()
      // this.pieChart()
      this.barChart()
      this.test()
  }


  test(){
    const linechart = new Chart('pie', {
      type: 'line',
      data: {
          labels: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul" ],
          datasets: [
          {
              label: "Visit",
              borderColor: "rgba(153, 102, 255, 0.9)",
               
              backgroundColor: "rgba(255, 99, 132, 0.9)",
              data: [ 0, 2900, 5000, 3300, 6000, 3250, 0 ]
          },
          {
              label: "Bounce",
              borderColor: "rgba(245, 23, 66, 0.9)",
             
              backgroundColor: "rgba(245, 23, 66,.5)",
             
              data: [ 0, 4200, 4500, 1600, 4200, 1500, 4000 ]
          },
          {
              label: "Targeted",
              borderColor: "rgba(40, 169, 46, 0.9)",
             
              backgroundColor: "rgba(40, 169, 46, .5)",
              data: [1000, 5200, 3600, 2600, 4200, 5300, 0 ]
          }
          ]
      },
      options: {
          responsive: true,
          // tooltips: {
          //     mode: 'index',
          //     intersect: false
          // },
          hover: {
              mode: 'nearest',
              intersect: true
          }

      }
    });
  } //Fin test
 
   data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];




  barChart() {
    // const lineChar = new Chart('pie',  {
    //   type: 'bar',
    //   data: {
    //     labels: ['Infusion', 'Grenadine', 'The-vert', 'Pulsion', 'Sansation'],
    //     datasets: [{
    //       label: '# Les Gains',
    //       data: [12, 19, 23, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.9)',
    //         'rgba(54, 162, 235, 0.9)',
    //         'rgba(255, 206, 86, 0.9)',
    //         'rgba(75, 192, 192, 0.9)',
    //         'rgba(153, 102, 255, 0.9)',
    //         'rgba(255, 159, 64, 0.9)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
           
    //     }
    //   }
    // });
  }
  




}//fin
