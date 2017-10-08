import {Component, OnInit} from '@angular/core';
import {Provider} from "./provider.model";
import {ProviderService} from "./provider.service";

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styles: []
})
export class ProviderListComponent implements OnInit {
  providers: Provider[] = [];

  constructor(private ps: ProviderService) {
  }

  onSelectItem(selectedProvider: Provider) {
    console.log("onSelectItem" + selectedProvider);
    this.ps.pushSelectedProvider(selectedProvider);
  }


  ngOnInit() {
    this.providers = this.ps.getAllProviders();

    this.ps.pushedSelectedProvider.subscribe(
      (data: Provider) => {
        this.providers = this.ps.getProviders();
      }
    );
    this.ps.addedProviderEvent.subscribe(
      (data: Provider) => {
        this.providers = this.ps.getProviders();
      }
    );
  }

}
