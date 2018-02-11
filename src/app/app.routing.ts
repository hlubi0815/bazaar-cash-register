import {RouterModule, Routes} from "@angular/router";
import {ProviderComponent} from "./provider/provider.component";
import {ReceiptComponent} from "./receipt/receipt.component";
import {ReceiptOverviewComponent} from "./receipt-overview/receipt-overview.component";
import {BazaarComponent} from "./bazaar/bazaar.component";
import {ProviderSettlementOverviewComponent} from "./provider-settlement-overview/provider-settlement-overview.component";
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';


const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/receipt', pathMatch: 'full'},
  {path: 'bazaar', component: BazaarComponent},
  {path: 'provider', component: ProviderComponent},
  {path: 'receipt', component: ReceiptComponent},
  {path: 'receipt-overview', component: ReceiptOverviewComponent},
  {path: 'provider-settlement-overview', component: ProviderSettlementOverviewComponent},
//  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
