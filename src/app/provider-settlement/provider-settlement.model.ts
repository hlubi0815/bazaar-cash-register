import {ReceiptItem} from "../receipt/receipt-item.model";

export class ProviderSettlement {
  constructor(public listnumber: string,
              public firstname: string,
              public lastname: string,
              public supporter: boolean,
              public items_sold: number,
              public items: ReceiptItem[],
              public fee: number,
              public percentageoff: number,
              public total: number) {
  }

  getPercentage() {
    return ( this.total * (this.percentageoff / 100 ) );
  }

  getPercentageOff() {
    return this.total - ( this.total * (this.percentageoff / 100 ) );
  }

  getGrantTotal() {
    if (this.supporter) {
      return this.total - this.fee;
    } else {
      return ( this.total * ( (100 - this.percentageoff ) / 100 ) ) - this.fee;
    }
  }

}
