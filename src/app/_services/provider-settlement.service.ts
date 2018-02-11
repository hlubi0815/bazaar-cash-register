import {EventEmitter, Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {environment} from '../../environments/environment';
import {ProviderSettlement} from "../_models/provider-settlement.model";

@Injectable()
export class ProviderSettlementService {
  private baseUrl = environment.apiUrl;
  pushedSettlements = new EventEmitter<ProviderSettlement[]>();


  constructor(private http: Http, public modal: Modal) {
    console.log("init");
    // this.getAllProviders();
  }


  getAllProviders() {
    return this.http.get(this.baseUrl + 'settlement', {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
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
