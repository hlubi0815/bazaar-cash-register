import {EventEmitter, Injectable} from '@angular/core';
import {ReceiptItem} from "../_models/receipt-item.model";
import {Receipt} from "../_models/receipt.model";

@Injectable()
export class DataService {

  pushedSelectedItem = new EventEmitter<ReceiptItem>();
  pushedReceipt = new EventEmitter<Receipt>();

  constructor() {
  }

  pushSelectedItem(item: ReceiptItem) {
    this.pushedSelectedItem.emit(item);
  }

  pushReceipt(item: Receipt) {
    this.pushedReceipt.emit(item);
  }
}
