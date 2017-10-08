import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Modal} from 'ngx-modialog/plugins/bootstrap';
import {Bazaar} from "./bazaar.model";
import {environment} from "../../environments/environment";


@Injectable()
export class BazaarService {

  private baseUrl = environment.apiUrl;
  public bazaars: Bazaar[] = [];

  constructor(private http: Http, public modal: Modal) {
  }


  getAllProviders(): Bazaar[] {
    const bazaars: Bazaar[] = [];
    this.http.get(this.baseUrl + 'bazaar/read.php', {headers: this.getHeaders(),})
      .map(
        (res: Response) => res.json()
      ).subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res.records);

        for (const entr of res.records) {
          const bazaar: Bazaar = new Bazaar(entr.bazaarid, entr.name, entr.bazaardate, entr.listnumber_start, entr.listnumber_end);
          bazaars.push(bazaar);
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
    this.bazaars = bazaars;
    return bazaars;

  }

  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }


}
