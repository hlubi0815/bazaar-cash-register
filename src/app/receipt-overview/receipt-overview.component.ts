import {Component, OnInit} from '@angular/core';
import {ReceiptService} from "../_services/receipt.service";
import {Receipt} from "../_models/receipt.model";
import {DataService} from "../_services/data.service";

@Component({
  selector: 'app-receipt-overview',
  templateUrl: './receipt-overview.component.html',
  styles: []
})
export class ReceiptOverviewComponent implements OnInit {

  receipts: Receipt[] = [];
  receipt: Receipt;


  constructor(private rs: ReceiptService, private ds: DataService) {
  }

  onSelectItem(selectedReceipt: Receipt) {
    console.log(selectedReceipt);
    this.receipt = selectedReceipt;
    this.ds.pushReceipt(selectedReceipt);
  }

  onCleared() {
    this.receipt = null;
  }


  ngOnInit() {
    this.receipt = {receiptId: null, bazaarId: null, items: null, createdat: null, sum: null};
    this.receipts = this.rs.getAllReceipts();

  }
}
