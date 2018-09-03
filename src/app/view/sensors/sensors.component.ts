import { Component, OnInit } from '@angular/core';

class Sensor {
	constructor(
		public lat: string,
		public lon: string){ }
}

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

	sensores = [
		new Sensor("-456199987", "44519957"),
		new Sensor("-456199987", "44519957"),
		new Sensor("-456199987", "44519957"),
		new Sensor("-456199987", "44519957"),
		new Sensor("-456199987", "44519957")
	]

  constructor() { }

  ngOnInit() {
  }

}
