import {Component, OnInit} from '@angular/core';
import {ReceiptItem} from '../_models/receipt-item.model';
import {ReceiptService} from '../_services/receipt.service';

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
