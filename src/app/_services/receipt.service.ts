import {Receipt} from '../_models/receipt.model';
import {EventEmitter, Injectable} from '@angular/core';
import {ReceiptItem} from '../_models/receipt-item.model';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {UUID} from 'angular2-uuid';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {environment} from '../../environments/environment';


@Injectable()
export class ReceiptService {

  private baseUrl = environment.apiUrl;
  private receipt: Receipt;
  pushedTotal = new EventEmitter<number>();
  pushReceipt = new EventEmitter<Receipt>();

  constructor(private http: Http, public modal: Modal) {
  }

  createNewReceipt() {
    const uuid = UUID.UUID();
    const body = {};
    this.http.post(this.baseUrl + 'receipt', body, {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        this.receipt = new Receipt(res.id, res.bazaar_id);
        this.receipt.createdat = res.created_at;
        this.pushReceipt.emit(this.receipt);
      },
      (x) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + x);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("Completed");
      }
    );
  }

  pushTotal() {
    let sum = 0;
    for (const item of this.receipt.items) {
      sum = sum + item.amount;
    }
    console.log(sum);
    this.pushedTotal.emit(sum);
  }

  getItems() {
    return this.receipt.items;
  }

  addItem(item: ReceiptItem) {

    const body = {
      'sale_number': item.listnumber,
      'item_number': item.itemnumber,
      'amount': item.amount
    };
    console.log(body);
    this.http.post(this.baseUrl + 'receipt/' + this.receipt.receiptId + '/item', body, {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        item.id = res.id;
        this.receipt.items.push(item);
        this.pushTotal();
      },
      (x) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + x);
        this.modal.alert()
          .size('lg')
          .showClose(true)
          .title('Achtung ')
          .body(`
            <h4>Artikel konnte nicht hinzugef&uuml;gt werden</h4>
            <b>Ursachen:</b>
            <ul>
                <li>\` + x + \`</li>
            </ul>`).open();

      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("Completed");
      }
    );

  }

  deleteItem(item: ReceiptItem) {


    this.http.delete(this.baseUrl + 'receipt/' + this.receipt.receiptId + '/item/' + item.id , {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        this.receipt.items.splice(this.receipt.items.indexOf(item), 1);
        this.pushTotal();
      },
      (x) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + x);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("Completed");
      }
    );
  }

  deleteAllItems() {
    this.receipt.items.length = 0;
    this.createNewReceipt();
    this.pushTotal();
    console.log('cleared');
  }

  editItem(oldItem: ReceiptItem, newItem: ReceiptItem) {

    this.receipt.items.splice(this.receipt.items.indexOf(oldItem), 1, newItem);

    const body = {
      "sale_number": newItem.listnumber,
      "item_number": newItem.itemnumber,
      "amount": newItem.amount
    };
    this.http.put(this.baseUrl + 'receipt/' + this.receipt.receiptId + '/item/' + oldItem.id,
      body, {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (result) => {
        console.log("STATUS UPDATE RECEIVED: ", result);
        this.pushTotal();
      },
      (x) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + x);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("Completed");
      }
    );

  }


  getAllReceipts(): Receipt[] {
    const receipts: Receipt[] = [];
    this.http.get(this.baseUrl + 'receipt', {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        for (const entr of res) {
          const receipt: Receipt = new Receipt(entr.id, entr.bazaar_id);
          receipt.createdat = entr.created_at;
          receipt.sum = entr.sum;
          receipts.push(receipt);

        }

      },
      (x) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + x);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("Completed");
      }
    );
    return receipts;
  }

  getAllItemsOfaReceipt(receiptId: string): ReceiptItem[] {
    const receiptItems: ReceiptItem[] = [];
    this.http.get(this.baseUrl + 'receipt/' + receiptId + '/item', {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        for (const entr of res) {
          const receiptItem: ReceiptItem = new ReceiptItem(entr.sale_number, entr.amount);
          receiptItem.id = entr.id;
          receiptItems.push(receiptItem);
        }

      },
      (x) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + x);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("Completed");
      }
    );
    return receiptItems;
  }

  settleReceipt() {
    const body = {};
    console.log(body);
    this.http.post(this.baseUrl + 'receipt/' + this.receipt.receiptId + '/settle', body, {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
      },
      (x) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + x);
      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("Completed");
      }
    );
  }


  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  ISODateString(d) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }

    return d.getFullYear() + '-'
      + pad(d.getMonth() + 1) + '-'
      + pad(d.getDate()) + ' '
      + pad(d.getHours()) + ':'
      + pad(d.getMinutes()) + ':'
      + pad(d.getSeconds());
  }


}
