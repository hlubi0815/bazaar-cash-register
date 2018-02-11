import {ReceiptItem} from "./receipt-item.model";

export class ProviderSettlement {
  public roundDown: number;
  public showRounding: boolean;
  public grantTotal: number;
  public percentageCalc: number;
  public percentageOffCalc: number;

  constructor(public listnumber: string,
              public firstname: string,
              public lastname: string,
              public supporter: boolean,
              public items_sold: number,
              public items: ReceiptItem[],
              public fee: number,
              public percentageoff: number,
              public total: number) {

    this.showRounding = false;
    let amount = 0.0;
    if (this.supporter) {
      amount =  this.total - this.fee;
    } else {
      amount = ( this.total * ( (100 - this.percentageoff ) / 100 ) ) - this.fee;
    }
    this.grantTotal =  this.roundUp(amount, 1 );
    this.percentageCalc = ( this.total * (this.percentageoff / 100 ) );
    this.percentageOffCalc = this.total - ( this.total * (this.percentageoff / 100 ) );



  }

  roundUp(num, precision) {
    precision = Math.pow(10, precision);
    const retVal = Math.floor(num * precision) / precision;
    this.roundDown = (retVal - num);
    if (num !== retVal) {
      this.showRounding = true;
    }
    return retVal;
  }

}
