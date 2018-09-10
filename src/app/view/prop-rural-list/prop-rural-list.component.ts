import { Component, OnInit } from '@angular/core';

class PropRural {
	constructor(
		public id: string,
		public name: string){ }
}

@Component({
	selector: 'app-prop-rural-list',
	templateUrl: './prop-rural-list.component.html',
	styleUrls: ['./prop-rural-list.component.css']
})
export class PropRuralListComponent implements OnInit {

	propriedades = [
		new PropRural("123","Propriedade Norte"),
		new PropRural("123","Propriedade Sul"),
		new PropRural("123","Propriedade Leste"),
		new PropRural("123","Propriedade Oeste"),
		new PropRural("123","Propriedade Nordeste")
	]

	constructor() { }

	ngOnInit() {
	}

}
