import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buttongrid',
  templateUrl: './buttongrid.component.html',
  styleUrls: ['./buttongrid.component.css']
})
export class ButtongridComponent implements OnInit {

  @Input() data: any[];
  breakpoint: Number;

  private tileSize = 170;
  private tileCount = 5;

  constructor() { }

  ngOnInit() {
    if (document.getElementById('grid').offsetWidth / this.tileSize > this.tileCount) {
      this.breakpoint = this.tileCount;
    } else {
      this.breakpoint = Math.ceil(document.getElementById('grid').offsetWidth / this.tileSize);
    }
  }

  onResize() {
    if (document.getElementById('grid').offsetWidth / this.tileSize > this.tileCount) {
      this.breakpoint = this.tileCount;
    } else {
      this.breakpoint = Math.ceil(document.getElementById('grid').offsetWidth / this.tileSize);
    }
    // this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 5;
  }

}
