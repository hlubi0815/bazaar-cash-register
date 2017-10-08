import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReceiptComponent} from './receipt/receipt.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReceiptService} from "./receipt/receipt.service";
import {ReceiptAddItemComponent} from './receipt/receipt-add-item.component';
import {FocusDirective} from './focus.directive';
import {ReceiptResultComponent} from './receipt-result/receipt-result.component';
import {OnReturnDirective} from './on-return.directive';
import {HttpModule} from '@angular/http';
import {ReceiptOverviewComponent} from './receipt-overview/receipt-overview.component';
import {ReceiptListComponent} from './receipt/receipt-list.component';
import {DataService} from "./receipt/data.service";
import {ModalModule} from 'ngx-modialog';
import {BootstrapModalModule} from 'ngx-modialog/plugins/bootstrap';
import {ProviderComponent} from './provider/provider.component';
import {ProviderAddComponent} from './provider/provider-add.component';
import {ProviderListComponent} from './provider/provider-list.component';
import {ProviderService} from "./provider/provider.service";
import {HeaderComponent} from './header/header.component';
import {routing} from "./app.routing";
import {Ng2CompleterModule} from "ng2-completer";
import {ShowErrorsComponent} from './show-errors/show-errors.component';
import {BazaarComponent} from './bazaar/bazaar.component';
import {BazaarListComponent} from './bazaar/bazaar-list.component';
import {BazaarService} from "./bazaar/bazaar.service";
import {APP_BASE_HREF} from "@angular/common";
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent,
    ReceiptAddItemComponent,
    FocusDirective,
    ReceiptResultComponent,
    OnReturnDirective,
    ReceiptOverviewComponent,
    ReceiptListComponent,
    ProviderComponent,
    ProviderAddComponent,
    ProviderListComponent,
    HeaderComponent,
    ShowErrorsComponent,
    BazaarComponent,
    BazaarListComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    routing,
    Ng2CompleterModule
  ],
  providers: [ReceiptService, DataService, ProviderService, BazaarService, {
    provide: LOCALE_ID,
    useValue: "de-DE"
  }, {provide: APP_BASE_HREF, useValue: environment.baseHref}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
