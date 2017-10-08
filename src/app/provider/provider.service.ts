import {EventEmitter, Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Provider} from "./provider.model";
import {environment} from '../../environments/environment';


@Injectable()
export class ProviderService {
  pushedSelectedProvider = new EventEmitter<Provider>();
  addedProviderEvent = new EventEmitter<Provider>();
  nextFreelistnumberEvent = new EventEmitter<number>();

  private baseUrl = environment.apiUrl;
  public providers: Provider[] = [];

  constructor(private http: Http, public modal: Modal) {
    this.providers = this.getAllProviders();
  }


  addItem(provider: Provider) {
    const body = {
      "bazaarid": 1, "listnumber": provider.listnumber, "firstname": provider.firstname,
      "lastname": provider.lastname, "phonenumber": provider.phonenumber, "email": provider.email,
      "supporter": provider.supporter
    };
    console.log(body);
    this.http.post(this.baseUrl + 'provider/create.php', body, {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        this.providers.push(provider);
        this.providers.sort((a: Provider, b: Provider) => {
          if (a.listnumber < b.listnumber) {
            return -1;
          }
          if (a.listnumber > b.listnumber) {
            return 1;
          }
          return 0;
        });
        this.addedProviderEvent.emit(provider);
        this.nextFreelistnumberEvent.emit(res.nextFreelistnumber);
      },
      (x) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + x);
        this.modal.alert()
          .size('lg')
          .showClose(true)
          .title('Achtung ')
          .body(`
            <h4>Verkäufer konnte nicht hinzugef&uuml;gt werden</h4>
            <b>Ursachen</b>
            <ul>
                <li>` + x + `</li>
            </ul>`).open();

      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("Completed");
      }
    );
  }

  editItem(oldProvider: Provider, newProvider: Provider) {

    const body = {
      "bazaarid": 1, "listnumber": newProvider.listnumber, "firstname": newProvider.firstname,
      "lastname": newProvider.lastname, "phonenumber": newProvider.phonenumber, "email": newProvider.email,
      "supporter": newProvider.supporter
    };
    console.log(body);
    this.http.post(this.baseUrl + 'provider/update.php', body, {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        this.providers.splice(this.providers.indexOf(oldProvider), 1, newProvider);
      },
      (x) => {
        /* this function is executed when there's an ERROR */
        console.log("ERROR: " + x);
        this.modal.alert()
          .size('lg')
          .showClose(true)
          .title('Achtung ')
          .body(`
            <h4>Verkäufer konnte nicht ge&auml:ndert werden</h4>
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

  deleteItem(provider: Provider) {
    const body = {"bazaarid": "1", "listnumber": provider.listnumber};
    console.log(body);
    this.http.post(this.baseUrl + 'provider/delete.php', body, {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        this.providers.splice(this.providers.indexOf(provider), 1);
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


  getAllProviders(): Provider[] {
    const providers: Provider[] = [];
    this.http.get(this.baseUrl + 'provider/read.php', {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res.records);
        this.nextFreelistnumberEvent.emit(res.nextFreelistnumber);
        for (const entr of res.records) {
          const provider: Provider = new Provider(entr.bazaarid,
            entr.listnumber, entr.firstname, entr.lastname, entr.phonenumber, entr.email, entr.supporter);
          providers.push(provider);
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
    this.providers = providers;
    return providers;

  }

  pushSelectedProvider(provider: Provider) {
    this.pushedSelectedProvider.emit(provider);
  }

  getProviders() {
    return this.providers;
  }

  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

}
