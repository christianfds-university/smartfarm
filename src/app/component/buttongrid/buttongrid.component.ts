import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buttongrid',
  templateUrl: './buttongrid.component.html',
  styleUrls: ['./buttongrid.component.css']
})
export class ButtongridComponent implements OnInit {

  @Input() data: any[];

  constructor() { }

  ngOnInit() {
  }

}
