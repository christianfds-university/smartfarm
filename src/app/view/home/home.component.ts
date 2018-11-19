import { Component, OnInit } from '@angular/core';


class ButtonOption {
	constructor(
		public text: string,
		public link: string,
		public color: string) { }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options = [
  	new ButtonOption('Propriedade Rural', '/proprural', 'primary'),
    new ButtonOption('Cultivares', '/cultivar', 'primary'),
  ];
  // new ButtonOption('Equações', '/eq', 'primary')
  // new ButtonOption('Usuários', '#', 'accent')

  constructor() { }

  ngOnInit() {
  }

}
