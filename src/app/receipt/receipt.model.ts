import {ReceiptItem} from './receipt-item.model';

export class Receipt {

  public items: ReceiptItem[] = [];
  public createdat: string;
  public sum: number;

  constructor(public receiptId: string, public bazaarId: number) {
  }


}
