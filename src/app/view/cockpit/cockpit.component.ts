import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-cockpit',
	templateUrl: './cockpit.component.html',
	styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

	DataSetTemp = [{
		name: 'Temperatura',
		points: [
		{x:  1, y: 10},
		{x:  2, y: 12},
		{x:  3, y: 16},
		{x:  4, y: 15},
		{x:  5, y: 16},
		{x:  6, y: 17},
		{x:  7, y: 19},
		{x:  8, y: 20},
		{x:  9, y: 21},
		{x: 10, y: 21},
		{x: 11, y: 21},
		{x: 12, y: 19},
		{x: 13, y: 19},
		{x: 14, y: 18},
		{x: 15, y: 17},
		{x: 16, y: 16},
		{x: 17, y: 15},
		{x: 18, y: 13},
		{x: 19, y: 10}
		]
	}];
	DataSetUmidade = [{
		name: 'Umidade',
		points: [
		{x:  1, y: 10},
		{x:  2, y: 12},
		{x:  3, y: 16},
		{x:  4, y: 15},
		{x:  5, y: 16},
		{x:  6, y: 17},
		{x:  7, y: 19},
		{x:  8, y: 20},
		{x:  9, y: 21},
		{x: 10, y: 21},
		{x: 11, y: 21},
		{x: 12, y: 19},
		{x: 13, y: 19},
		{x: 14, y: 18},
		{x: 15, y: 17},
		{x: 16, y: 16},
		{x: 17, y: 15},
		{x: 18, y: 13},
		{x: 19, y: 10}
		]
	}];

	formatXAxisValue(value: number) {
		return ``;
	}

	constructor() { }

	ngOnInit() {
	}

}
