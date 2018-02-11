import {Component, Input, OnInit} from '@angular/core';
import {ProviderSettlement} from "../_models/provider-settlement.model";

@Component({
  selector: 'app-provider-settlement',
  templateUrl: './provider-settlement.component.html',
  styles: []
})
export class ProviderSettlementComponent implements OnInit {

  @Input() settlement: ProviderSettlement;

  constructor() {
  }

  ngOnInit() {
  }
}
