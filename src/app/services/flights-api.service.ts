import { Injectable, EventEmitter } from '@angular/core';
import axios from 'axios';
import { Flight } from '../models/flight';
import { ToastrService } from 'ngx-toastr';
import { filterFlights } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class FlightsApiService {
  private flights: Array<Flight> = [];
  stateChanged = new EventEmitter<Array<Flight>>();
  isLoading: boolean = false;

  constructor(private toastr: ToastrService) {}

  getFlights() {
    const currentDate = Date.now() / 1000;
    const begin = Math.floor(currentDate - 7200);
    const end = Math.floor(currentDate);
    this.isLoading = true;
    axios
      .get(
        `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`
      )
      .then((response) => {
        this.flights = response.data as Flight[];
        const filteredFlights = filterFlights(this.flights);
        this.setFlights(filteredFlights);
        this.isLoading = false;
      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
    return [];
  }
  setFlights(newState: Array<Flight>) {
    this.flights = newState;
    this.stateChanged.emit(newState);
  }
}
