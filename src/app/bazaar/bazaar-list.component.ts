import {Component, OnInit} from '@angular/core';
import {Bazaar} from "./bazaar.model";
import {BazaarService} from "./bazaar.service";

@Component({
  selector: 'app-bazaar-list',
  templateUrl: './bazaar-list.component.html',
  styles: []
})
export class BazaarListComponent implements OnInit {

  bazaars: Bazaar[] = [];

  constructor(private bs: BazaarService) {
  }

  onSelectItem(selectedBazaar: Bazaar) {
    console.log("onSelectItem" + selectedBazaar);
    localStorage.setItem("selectedBazaar", JSON.stringify(selectedBazaar));
    // this.ps.pushSelectedProvider(selectedProvider);
  }


  ngOnInit() {
    this.bazaars = this.bs.getAllProviders();


  }

}
