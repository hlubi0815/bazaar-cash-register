import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';


import {AppComponent} from './app.component';
import {ReceiptComponent} from './receipt/receipt.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ReceiptService} from "./_services/receipt.service";
import {ReceiptAddItemComponent} from './receipt/receipt-add-item.component';
import {FocusDirective} from './focus.directive';
import {ReceiptResultComponent} from './receipt-result/receipt-result.component';
import {OnReturnDirective} from './on-return.directive';
import {HttpModule} from '@angular/http';
import {ReceiptOverviewComponent} from './receipt-overview/receipt-overview.component';
import {ReceiptListComponent} from './receipt/receipt-list.component';
import {DataService} from "./_services/data.service";
import {ModalModule} from 'ngx-modialog';
import {bootstrap4Mode, BootstrapModalModule} from 'ngx-modialog/plugins/bootstrap';
import {ProviderComponent} from './provider/provider.component';
import {ProviderAddComponent} from './provider/provider-add.component';
import {ProviderListComponent} from './provider/provider-list.component';
import {ProviderService} from "./_services/provider.service";
import {HeaderComponent} from './header/header.component';
import {routing} from "./app.routing";
import {ShowErrorsComponent} from './show-errors/show-errors.component';
import {BazaarComponent} from './bazaar/bazaar.component';
import {BazaarListComponent} from './bazaar/bazaar-list.component';
import {BazaarService} from "./_services/bazaar.service";
import {APP_BASE_HREF} from "@angular/common";
import {environment} from '../environments/environment';
import {ChartsModule} from "ng2-charts";
import {ProviderSettlementComponent} from './provider-settlement/provider-settlement.component';
import {ProviderSettlementService} from "./_services/provider-settlement.service";
import {ProviderSettlementOverviewComponent} from './provider-settlement-overview/provider-settlement-overview.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

registerLocaleData(localeDe);
bootstrap4Mode();

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
    ProviderSettlementComponent,
    ProviderSettlementOverviewComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    routing,
    ChartsModule,
    NgbModule.forRoot()
  ],
  providers: [ AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    }, ReceiptService, DataService, ProviderService, BazaarService, ProviderSettlementService, {
    provide: LOCALE_ID,
    useValue: "de-DE"
  }, {provide: APP_BASE_HREF, useValue: environment.baseHref}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
