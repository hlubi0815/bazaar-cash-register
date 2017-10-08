import {UUID} from "angular2-uuid";

export class ReceiptItem {
  public id: string;
  public itemnumber: string;

  constructor(public listnumber: number, public amount: number) {
    this.id = UUID.UUID();
  }
}
