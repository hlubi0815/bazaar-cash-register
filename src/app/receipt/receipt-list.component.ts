import {Component, OnInit} from '@angular/core';
import {Receipt} from "./receipt.model";
import {ReceiptItem} from "./receipt-item.model";
import {ReceiptService} from "./receipt.service";
import {DataService} from "./data.service";

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list.component.html',
  styles: []
})
export class ReceiptListComponent implements OnInit {
  receiptItems: ReceiptItem[] = [];


  constructor(private rs: ReceiptService, private ds: DataService) {
  }

  onSelectItem(selectedReceiptItem: ReceiptItem) {
    console.log("onSelectItem" + selectedReceiptItem);
    this.ds.pushSelectedItem(selectedReceiptItem);
  }


  ngOnInit() {
    this.rs.pushReceipt.subscribe(
      (data: Receipt) => this.receiptItems = data.items
    );
    this.ds.pushedReceipt.subscribe(
      (data: Receipt) => {
        // this.receiptItems = data.items
        this.receiptItems = this.rs.getAllItemsOfaReceipt(data.receiptId);
      }
    );
  }

}
