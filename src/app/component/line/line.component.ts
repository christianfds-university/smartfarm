import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit, OnChanges {

  @Input() value: number[];
  @Input() max_value: number;

  @Input() label: string;
  @Input() appendText: string;


  chart: Chart;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.chart = new Chart({
      chart: {
        type: 'line',
        height: '50%'
      },
      title: {
        text: this.label || ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: this.label
        }
      },
      series: [{
        name: this.label,
        data: this.value || []
      }],
      tooltip: {
        valueSuffix: ' ' + this.appendText,
        useHTML: true,
        valueDecimals: 2
      }
    });

    // Da subscribe pra chart.ref existir posteriormente
    this.chart.ref$.subscribe(() => { });
  }

  ngOnChanges(): void {
    if (this.chart) {
      if (this.chart.ref) {
        this.chart.addPoint(this.value[this.value.length - 1]);

        if (this.max_value > 1) {

          while (this.chart.ref.series[0].data.length > this.max_value) {
            this.chart.ref.series[0].data[0].remove();
          }

        }

        this.chart.ref.redraw();
      }
    }
  }

}
