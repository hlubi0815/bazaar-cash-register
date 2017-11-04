import {Component, OnInit} from '@angular/core';
import {ProviderSettlementService} from "../provider-settlement/provider-settlement.service";
import {ProviderSettlement} from "../provider-settlement/provider-settlement.model";

@Component({
  selector: 'app-provider-settlement-overview',
  templateUrl: './provider-settlement-overview.component.html',
  styles: [`
    .settlement {
      page-break-inside: avoid;
    }
  `]
})
export class ProviderSettlementOverviewComponent implements OnInit {

  settlements_columnA: ProviderSettlement[] = [];
  settlements_columnB: ProviderSettlement[] = [];
  settlements_columnC: ProviderSettlement[] = [];

  counter_constructor = 0;
  counter_oninit = 0;

  constructor(private ss: ProviderSettlementService) {
  }

  ngOnInit() {
    this.ss.getAllProviders().subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res.records);
        const settlements: ProviderSettlement[] = [];
        let itemCount = 0;
        for (const entr of res.records) {
          itemCount = itemCount + entr.items.length + 6;
          const settlement: ProviderSettlement = new ProviderSettlement(
            entr.listnumber,
            entr.firstname,
            entr.lastname,
            entr.supporter,
            entr.items_sold,
            entr.items,
            entr.fee,
            entr.percentageoff,
            entr.total
          );
          settlements.push(settlement);
        }
        const count = Math.floor(itemCount / 3);
        let outputItemCount = 0;
        for (const settlement of settlements) {
          outputItemCount = outputItemCount + settlement.items.length + 6;
          if (outputItemCount <= count) {
            this.settlements_columnA.push(settlement);
          } else if (outputItemCount > count && outputItemCount < count + count) {
            this.settlements_columnB.push(settlement);
          } else {
            this.settlements_columnC.push(settlement);
          }
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
  }
}
