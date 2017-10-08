import {Component, OnInit} from '@angular/core';
import {ReceiptItem} from './receipt-item.model';
import {ReceiptService} from './receipt.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styles: []
})
export class ReceiptComponent implements OnInit {
  selectedReceiptItem: ReceiptItem;

  constructor(private rs: ReceiptService) {
  }

  onCleared() {
    this.selectedReceiptItem = null;
  }

  ngOnInit() {
    this.rs.createNewReceipt();
  }

}
