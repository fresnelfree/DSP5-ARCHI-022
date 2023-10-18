import { Component, OnInit } from '@angular/core';
import { getRelativePosition } from 'chart.js/helpers';
import {Chart} from 'chart.js/auto';

@Component({
  selector: 'app-cp-chart-bar1',
  templateUrl: './cp-chart-bar1.component.html',
  styleUrls: ['./cp-chart-bar1.component.css']
})
export class CpChartBar1Component implements OnInit{

      ngOnInit(): void {
        // this.barChart()
        // this.lineChart()
        this.mixedChart()
    }

    public data1 = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    barChart(){ 
      const chart = new Chart("barChart", {
        type: 'bar',
        data: {
          labels: this.data1.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.data1.map(row => row.count)
            }
          ]
        },
        options: {
          animation: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          }
        },
      });
    }



    lineChart(){ 
      const chart = new Chart("barChart", {
        type: 'line',
        data: {
          labels: this.data1.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.data1.map(row => row.count)
            }
          ]
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: {
               
              // type: 'category',
              //   labels: ['Octobre', 'Novembre', 'Decembre']
              
            },
            y: {
                // stacked: false,
                // suggestedMin: 50,
                // suggestedMax: 100
                max: 5,
            min: 0,
            ticks: {
                stepSize: 0.5
            }
            }
          },
          animation: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          }
        }, //Fin option
      });
    }


   mixedChart(){
    const mixedChart = new Chart("barChart", {
      data: {
          datasets: [{
              type: 'polarArea',
              label: 'Bar Dataset',
              data: [10, 20, 30, 40],
              order: 1
          }, {
              type: 'line',
              label: 'Line Dataset',
              data: [50, 50, 50, 50],
              order: 2
          }],
          labels: ['January', 'February', 'March', 'April']
      },
      options: {
        indexAxis: 'y',
        scales: {
         myScale: {
        type: 'logarithmic',
        position: 'right', // `axis` is determined by the position as `'y'`
      }
        },
        animation: false,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        }
       },//Fin option
     });
   }

 } //Fin c

 
