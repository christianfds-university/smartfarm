import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-gauge',
	templateUrl: './gauge.component.html',
	styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit {

    gaugeType = "semi";
	@Input() value: number;
	@Input() label: any;
	@Input() appendText: any;

	gaugeValue : any;
	gaugeLabel : any;
	gaugeAppendText : any;

	constructor() { }

	ngOnInit() {

		this.gaugeValue = this.value;
		this.gaugeLabel = this.label;
		this.gaugeAppendText = this.appendText;

	}

}