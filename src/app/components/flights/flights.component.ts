import { Component } from '@angular/core';
import { FlightsApiService } from 'src/app/services/flights-api.service';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight';
import { unixToGMT, unixToDate } from 'src/app/utils/utils';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
})
export class FlightsComponent {
  private stateChangedSubscription: Subscription;
  flights: Array<Flight> = this.flightsService.getFlights();
  username!: string;

  constructor(public flightsService: FlightsApiService) {
    const token: string | null = localStorage.getItem('openSkyToken');
    if (token !== null) {
      const name = token.split('@')[0];
      this.username = name.charAt(0).toUpperCase() + name.slice(1);
    }
    this.stateChangedSubscription = this.flightsService.stateChanged.subscribe(
      (newState) => {
        this.flights = newState;
      }
    );
  }

  unixToGMT(date: number): string {
    return unixToGMT(date);
  }
  unixToDate(date: number): string {
    return unixToDate(date);
  }

  ngOnDestroy() {
    // unsubscribe from the stateChanged subscription to prevent memory leaks
    this.stateChangedSubscription.unsubscribe();
  }
}
