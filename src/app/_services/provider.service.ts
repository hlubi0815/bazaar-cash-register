import {EventEmitter, Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule, Modal, bootstrap4Mode } from 'ngx-modialog/plugins/bootstrap';

import {Provider} from '../_models/provider.model';
import {environment} from '../../environments/environment';
import {forEach} from "@angular/router/src/utils/collection";


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
      "salenumber": [provider.listnumber], "firstName": provider.firstname,
      "lastName": provider.lastname, "phone": provider.phonenumber, "email": provider.email,
      "supporter": provider.supporter, "registration_channel": 0
    };
    console.log(body);
    this.http.post(this.baseUrl + 'bazaar/upcoming/user?XDEBUG_SESSION_START=123', body, {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        this.providers.push(provider);
        this.providers.sort(function(obj1, obj2) {
          // Ascending: first age less than the previous
          return obj1.listnumber - obj2.listnumber;
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
      "old_salenumber": [oldProvider.listnumber], "salenumber": [newProvider.listnumber], "firstName": newProvider.firstname,
      "lastName": newProvider.lastname, "phone": newProvider.phonenumber, "email": newProvider.email,
      "supporter": newProvider.supporter
    };
    console.log(body);
    this.http.put(this.baseUrl + 'bazaar/upcoming/user?XDEBUG_SESSION_START=123', body, {headers: this.getHeaders(), })
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
          .body('<h4>Verkäufer konnte nicht ge&auml;ndert werden</h4><b>Ursachen:</b><ul><li>' + x + '</li></ul>').open();

      },
      () => {
        /* this function is executed when the observable ends (completes) its stream */
        console.log("Completed");
      }
    );


  }

  deleteItem(provider: Provider) {
    this.http.delete(this.baseUrl + 'bazaar/upcoming/user/' + provider.listnumber + '?XDEBUG_SESSION_START=123',
       {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
        this.nextFreelistnumberEvent.emit(res.nextFreelistnumber);
        this.providers.splice(this.providers.indexOf(provider), 1);
        this.providers.sort(function(obj1, obj2) {
          // Ascending: first age less than the previous
          return obj1.listnumber - obj2.listnumber;
        });
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
    this.http.get(this.baseUrl + 'bazaar/upcoming/users', {headers: this.getHeaders(), })
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res);
         this.nextFreelistnumberEvent.emit(res.nextFreelistnumber);
        for (const user of res.users) {
          let reg_channel = '';
          if (user.registration_channel === 0) {
            reg_channel = 'per Telefon';
          } else {
            reg_channel = 'Online';
          }

          const provider: Provider = new Provider(res.id,
            user.pivot.sale_number, user.firstName, user.lastName, user.phone, user.email, user.supporter, reg_channel );
          providers.push(provider);
        }
        providers.sort(function(obj1, obj2) {
          // Ascending: first age less than the previous
          return obj1.listnumber - obj2.listnumber;
        });
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
