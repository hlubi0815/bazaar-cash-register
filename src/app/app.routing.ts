import {RouterModule, Routes} from "@angular/router";
import {ProviderComponent} from "./provider/provider.component";
import {ReceiptComponent} from "./receipt/receipt.component";
import {ReceiptOverviewComponent} from "./receipt-overview/receipt-overview.component";
import {BazaarComponent} from "./bazaar/bazaar.component";

const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/bazaar', pathMatch: 'full'},
  {path: 'bazaar', component: BazaarComponent},
  {path: 'provider', component: ProviderComponent},
  {path: 'receipt', component: ReceiptComponent},
  {path: 'receipt-overview', component: ReceiptOverviewComponent}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
