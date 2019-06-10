import {  Component } from '@angular/core';
import {   NavController } from 'ionic-angular';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
  dataarray: any;
  constructor(public navCtrl: NavController) {
    this.dataarray = [{ name: 'Jane', data: [1, 0, 4] },
    { name: 'John', data: [5, 7, 3] }]
  }
  ionViewDidLoad() {
    //var myChart = HighCharts.chart('container', {
    //  chart: {
    //    type: 'bar'
    //  },
    //  title: {
    //    text: 'Fruit Consumption'
    //  },
    //  xAxis: {
    //    categories: ['Apples', 'Bananas', 'Oranges']
    //  },
    //  yAxis: {
    //    title: {
    //      text: 'Fruit eaten'
    //    }
    //  },
    //  series: this.dataarray
    //});
  }
}
