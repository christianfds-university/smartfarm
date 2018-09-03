import { Component, OnInit } from '@angular/core';

class ButtonOption {
	constructor(
		public text: string,
		public link: string,
		public color: string){ }
}

@Component({
  selector: 'app-prop-rural',
  templateUrl: './prop-rural.component.html',
  styleUrls: ['./prop-rural.component.css']
})
export class PropRuralComponent implements OnInit {

  options = [
    // new ButtonOption("Talhão", "", "primary"),
    // new ButtonOption("Pontos de Coleta", "", "primary"),
    // new ButtonOption("Solo Análises", "", "primary"),
    // new ButtonOption("Safra Platio", "", "primary"),
    // new ButtonOption("Safra Estádios", "", "primary"),
    // new ButtonOption("Histórico Produtividade", "", "primary"),
    // new ButtonOption("Estações Agrometeorológicas", "", "primary"),
    // new ButtonOption("Link SDUM Zonas de Manejo", "", "primary"),
    // new ButtonOption("Link EarthEngine ", "", "primary"),
    // new ButtonOption("Link Drone", "", "primary"),
    // new ButtonOption("Clima", "", "primary"),
    // new ButtonOption("Evatranspiração", "", "primary"),
    // new ButtonOption("Balanço Hidríco/Estress Hídrico", "", "primary"),
    // new ButtonOption("Fotoperíodo Acumulado", "", "primary"),
    // new ButtonOption("Graus Dias Acumulado (GDD)", "", "primary"),
    // new ButtonOption("Estimativa Estádios ", "", "primary"),
    // new ButtonOption("Manejo Integrado Pragas e Doenças", "", "primary"),
    // new ButtonOption("Dados Pulverização", "", "primary"),
    // new ButtonOption("Potencial Produtivo Safra", "", "primary"),
    new ButtonOption("Sensores", "/sensors", "primary"),
    new ButtonOption("EarthEngine", "#", "primary"),
  	new ButtonOption("Drone", "#", "primary"),
  	new ButtonOption("Sala De Controle (Cockpit)", "/cockpit", "primary")
  ]

  constructor() { }

  ngOnInit() {
  }

}
