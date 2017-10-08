import {Receipt} from './receipt.model';
import {EventEmitter, Injectable} from '@angular/core';
import {ReceiptItem} from './receipt-item.model';
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
    const body = {"id": uuid, "bazaarid": 1, "createdat": this.ISODateString(new Date())};
    this.http.post(this.baseUrl + 'receipt/create.php', body, {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        this.receipt = new Receipt(body.id, body.bazaarid);
        this.receipt.createdat = body.createdat;
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
      'id': item.id,
      'receiptid': this.receipt.receiptId,
      'listnumber': item.listnumber,
      'itemnumber': item.itemnumber,
      'amount': item.amount
    };
    console.log(body);
    this.http.post(this.baseUrl + 'receiptitem/create.php', body, {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
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

    const body = {"id": item.id};
    this.http.post(this.baseUrl + 'receiptitem/delete.php', body, {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        this.receipt.items.splice(this.receipt.items.indexOf(item), 1);
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
    this.pushTotal();
  }

  deleteAllItems() {
    this.receipt.items.length = 0;
    this.createNewReceipt();
    this.pushTotal();
    console.log('cleared');
  }

  editItem(oldItem: ReceiptItem, newItem: ReceiptItem) {
//    this.receipt.items[this.receipt.items.indexOf(oldItem)] = newItem;

    this.receipt.items.splice(this.receipt.items.indexOf(oldItem), 1, newItem);


    const body = {"id": oldItem.id};
    this.http.post(this.baseUrl + 'receiptitem/delete.php', body, {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (result) => {
        console.log("EDIT DELETE OLD VALUE RECEIVED: ", result);
        const newBody = {
          "id": newItem.id,
          "receiptid": this.receipt.receiptId,
          "listnumber": newItem.listnumber,
          "itemnumber": newItem.itemnumber,
          "amount": newItem.amount
        };
        this.http.post(this.baseUrl + 'receiptitem/create.php', newBody, {headers: this.getHeaders(),})
          .map(
            (res: Response) => res.json()
          ).subscribe(
          (res) => {
            console.log("EDIT CREATE NEW VALUE RECEIVED: ", res);
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

    this.pushTotal();
  }


  getAllReceipts(): Receipt[] {
    const receipts: Receipt[] = [];
    this.http.get(this.baseUrl + 'receipt/read.php', {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res.records);
        for (const entr of res.records) {
          const receipt: Receipt = new Receipt(entr.receiptId, entr.bazaarId);
          receipt.createdat = entr.createdat;
          receipt.sum = entr.sum;
          receipts.push(entr);

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
    this.http.get(this.baseUrl + 'receiptitem/read-items-of-receipt.php?id=' + receiptId, {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res.records);
        for (const entr of res.records) {
          const receiptItem: ReceiptItem = new ReceiptItem(entr.listnumber, entr.amount);
          receiptItem.id = entr.id;
          receiptItems.push(entr);

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
    const body = {"id": this.receipt.receiptId, "bazaarid": 1, "createdat": this.receipt.createdat, "settled": 1};
    console.log(body);
    this.http.post(this.baseUrl + 'receipt/update.php', body, {headers: this.getHeaders(),})
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
