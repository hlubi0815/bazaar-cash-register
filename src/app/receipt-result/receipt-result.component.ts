import {Component, OnInit} from '@angular/core';
import {ReceiptService} from "../receipt/receipt.service";

@Component({
  selector: 'app-receipt-result',
  templateUrl: './receipt-result.component.html',
  styles: []
})
export class ReceiptResultComponent implements OnInit {

  total = 0.0;

  constructor(private rs: ReceiptService) {
  }

  onSettle() {
    this.rs.settleReceipt();
    this.rs.deleteAllItems();
  }

  onDiscard() {
    this.rs.deleteAllItems();
  }

  ngOnInit() {
    this.rs.pushedTotal.subscribe(
      (data: number) => this.total = data
    );
  }

}
