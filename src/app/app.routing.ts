import {RouterModule, Routes} from "@angular/router";
import {ProviderComponent} from "./provider/provider.component";
import {ReceiptComponent} from "./receipt/receipt.component";
import {ReceiptOverviewComponent} from "./receipt-overview/receipt-overview.component";
import {BazaarComponent} from "./bazaar/bazaar.component";
import {ProviderSettlementOverviewComponent} from "./provider-settlement-overview/provider-settlement-overview.component";

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/receipt', pathMatch: 'full'},
  {path: 'bazaar', component: BazaarComponent},
  {path: 'provider', component: ProviderComponent},
  {path: 'receipt', component: ReceiptComponent},
  {path: 'receipt-overview', component: ReceiptOverviewComponent},
  {path: 'provider-settlement-overview', component: ProviderSettlementOverviewComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
