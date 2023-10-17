import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';
import { ChartOptions, ChartType,  } from 'chart.js';
import {  BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables)

@Component({
  selector: 'app-dhb-table1',
  templateUrl: './dhb-table1.component.html',
  styleUrls: ['./dhb-table1.component.css']
})
export class DhbTable1Component implements OnInit {
  ngOnInit(): void {
    // this.afficherChart()
    // this.pieChart()
    this.barChart()
    this.chart2()
  }

  data = [
    { year: "septembre", count: 10 },
    { year: "octobre", count: 20 },
    { year: "novembre", count: 15 },
    { year: "decembre", count: 25 },
    { year: "janvier", count: 22 },
  ];


  chart2(){
    const lineChar = new Chart('flotPie1',  {
       
      type: 'line',
      data: {
        labels: this.data.map(row => row.year),
        datasets: [
          {
            label: 'Les inscriptions',
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


  // 
    data2 = {
    datasets: [{
      label: 'First Dataset',
      data: [{
        x: 20,
        y: 30,
        r: 15
      }, {
        x: 40,
        y: 10,
        r: 10
      }],
      backgroundColor: 'rgb(255, 99, 132)'
    }]
  };

  barChart() {
    const lineChar = new Chart('flotLine5',  {
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
            'rgba(37, 226, 109, 0.61)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 3
        }]
      },
      options: {
        scales: {
        }
      }
    });
  }
}
