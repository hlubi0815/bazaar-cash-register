import {UUID} from "angular2-uuid";

export class ReceiptItem {
  public id: string;
  public itemnumber: string;
  public description: string;

  constructor(public listnumber: number, public amount: number) {
  }
}
