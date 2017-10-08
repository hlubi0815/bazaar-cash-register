import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  isIn = false;   // store state
  constructor() {
  }

  ngOnInit() {
  }


  toggleState() { // click handler
    const bool = this.isIn;
    this.isIn = bool === false ? true : false;
  }
}
