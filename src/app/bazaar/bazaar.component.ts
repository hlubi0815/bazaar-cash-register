import {Component, OnInit} from '@angular/core';
import {BazaarService} from "../_services/bazaar.service";

@Component({
  selector: 'app-bazaar',
  templateUrl: './bazaar.component.html',
  styles: []
})
export class BazaarComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: string[] = ['Einnahmen Gebühr', 'Einnahmen Prozent', 'Einnahmen Kuchenverkauf'];
  public doughnutChartData: number[] = [0, 0, 0];
  public doughnutChartType = 'doughnut';
  public dataReady = false;
  public providerCount = 0;
  providerSupportCount = 0;
  proivderNonSupportCount = 0;
  earnings_fee = 0;
  earningsNonSupporterPercentag = 0;
  total = 0;
  earningscake = 0;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private bs: BazaarService) {
  }

  ngOnInit() {
    /*this.bs.getSales().subscribe(
      (res) => {
        console.log("VALUE RECEIVED: ", res.earnings_fee);
        this.doughnutChartData[0] = res.earnings_fee;
        this.doughnutChartData[1] = res.earningsNonSupporterPercentag;
        this.doughnutChartData[2] = res.earningscake;
        this.earningscake = res.earningscake;
        this.providerCount = res.providerCount;
        this.providerSupportCount = res.providerSupportCount;
        this.proivderNonSupportCount = res.proivderNonSupportCount;
        this.total = res.total;
        this.earnings_fee = res.earnings_fee;
        this.earningsNonSupporterPercentag = res.earningsNonSupporterPercentag;
        this.dataReady = true;
      },
      (x) => {
        console.log("ERROR: " + x);
      },
      () => {
        console.log("Completed");
      }
    );
*/

  }

}
