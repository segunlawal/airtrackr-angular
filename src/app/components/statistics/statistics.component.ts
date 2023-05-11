import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Airports } from 'src/app/models/airports';
import { FlightsApiService } from 'src/app/services/flights-api.service';
import { UtilisService } from 'src/app/utils/utilis.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent {
  private airportInfoChangedSubscription: Subscription;

  rangeInfo: Array<number>;
  airportInfo: Array<Airports> = this.flightsService.getFlightsForAirports();

  constructor(
    public utilsService: UtilisService,
    public flightsService: FlightsApiService
  ) {
    this.airportInfoChangedSubscription =
      this.flightsService.airportInfoChanged.subscribe((newState) => {
        this.airportInfo = newState;
        // this.pageSlice = this.flights.slice(0, 10);
      });

    const currentDate = Date.now() / 1000;
    const begin = Math.floor(currentDate - 3600);
    const end = Math.floor(currentDate + 3600);
    this.rangeInfo = [begin, end];
  }

  ngOnDestroy() {
    // unsubscribe from the stateChanged subscription to prevent memory leaks
    this.airportInfoChangedSubscription.unsubscribe();
  }
}
