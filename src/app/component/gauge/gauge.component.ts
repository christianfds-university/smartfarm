import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
	selector: 'app-gauge',
	templateUrl: './gauge.component.html',
	styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit, OnChanges {

	@Input() min: number;
	@Input() max: number;
	@Input() value: number;

	@Input() label: string;
	@Input() appendText: string;


	chart: Chart;

	constructor(private el: ElementRef) {
	}

	ngOnInit() {
		this.chart = new Chart({
			chart: {
				type: 'solidgauge',
				height: '100%'
			},
			title: {
				text: this.label || ''
			},
			pane: {
				center: ['50%', '85%'],
				size: '100%',
				startAngle: -90,
				endAngle: 90,
				background: {
					backgroundColor: '#EEE',
					innerRadius: '60%',
					outerRadius: '100%',
					shape: 'arc'
				}
			},
			credits: {
				enabled: false
			},
			// yAxis: {
			// 	min: -30,
			// 	max: 100,
			// 	title: {
			// 		text: this.label
			// 	},
			// },
			yAxis: {
				min: this.min || 0,
				max: this.max || 100,
				stops: [
					[0.1, '#55BF3B'], // green
					[0.5, '#DDDF0D'], // yellow
					[0.9, '#DF5353'] // red
				],
				lineWidth: 0,
				minorTickInterval: null,
				tickAmount: 2
			},
			series: [{
				name: this.label,
				data: [this.value || 10]
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
				this.chart.ref.series[0].setData([this.value]);
				// this.chart.ref.chartHeight = this.el.nativeElement.offsetHeight;
				// this.chart.ref.chartWidth = this.el.nativeElement.offsetWidth;

				this.chart.ref.redraw();
			}
		}
	}

}
