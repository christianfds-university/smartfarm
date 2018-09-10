import { Component, OnInit } from '@angular/core';

class Equation {
	constructor(
		public position: number,
		public name: string,
		public equacao: string){}
}

@Component({
  selector: 'app-eq',
  templateUrl: './eq.component.html',
  styleUrls: ['./eq.component.css']
})
export class EqComponent implements OnInit {

  equations = [
  	new Equation(1, "Equação 1", "a+b"),
  	new Equation(2, "Equação 2", "a+b"),
  	new Equation(3, "Equação 3", "a+b"),
  	new Equation(4, "Equação 4", "a+b"),
    new Equation(6, "Equação 6", "a+b")
    new Equation(7, "Equação 7", "a+b")
    new Equation(8, "Equação 8", "a+b")
    new Equation(9, "Equação 9", "a+b")
    new Equation(10, "Equação 10", "a+b")
  	new Equation(11, "Equação 11", "a+b")
  ];

  constructor() { }

  ngOnInit() {
  }

}
