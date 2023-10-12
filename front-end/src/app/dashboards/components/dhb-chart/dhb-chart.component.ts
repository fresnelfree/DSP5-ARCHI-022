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
      this.chart2()
  }

 
   data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];


  chart2(){
    const lineChar = new Chart('cht2',  {
       
      type: 'line',
      data: {
        labels: this.data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: this.data.map(row => row.count)
          }
        ]
      },
      options: {
        scales: {
           
        }
      }
    });
  }


  barChart() {
    const lineChar = new Chart('pie',  {
      type: 'bar',
      data: {
        labels: ['Infusion', 'Grenadine', 'The-vert', 'Pulsion', 'Sansation'],
        datasets: [{
          label: '# Les Gains',
          data: [12, 19, 23, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(255, 159, 64, 0.9)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
           
        }
      }
    });
  }
  


  afficherChart(){
    const lineChar = new Chart('c3',  {
      type: 'doughnut',
      data:{
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 500, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(50, 165, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        scales: {
           
        }
      }
    });
  
  }

    
 


}//fin
