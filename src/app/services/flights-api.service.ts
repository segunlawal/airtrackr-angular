import { Injectable, EventEmitter } from '@angular/core';
import axios from 'axios';
import { Flight } from '../models/flight';
import { ToastrService } from 'ngx-toastr';
import { UtilisService } from '../utils/utilis.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class FlightsApiService {
  private flights: Array<Flight> = [];
  stateChanged = new EventEmitter<Array<Flight>>();

  private displayInfo: Array<number> = [];
  displayInfoChanged = new EventEmitter<Array<number>>();

  private getDateRange() {
    const currentDate = Date.now() / 1000;
    const begin = Math.floor(currentDate - 7200);
    const end = Math.floor(currentDate);
    this.displayInfo = [begin, end];
    return { begin, end };
  }

  isLoading: boolean = false;

  constructor(
    private toastr: ToastrService,
    public utilsService: UtilisService
  ) {
    this.getDateRange();
  }

  getFlights() {
    const { begin, end } = this.getDateRange();
    this.isLoading = true;
    axios
      .get(
        `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`
      )
      .then((response) => {
        this.flights = response.data as Flight[];
        const filteredFlights = this.utilsService.filterFlights(this.flights);
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

  getDisplayInfo() {
    const { begin, end } = this.getDateRange();

    this.setDisplayInfo([begin, end]);
    return this.displayInfo;
  }
  setDisplayInfo(newState: Array<number>) {
    this.displayInfo = newState;
    this.displayInfoChanged.emit(newState);
  }

  async searchTimeRange(fromDate: string, toDate: string) {
    // Search within a time range
    const begin = moment(fromDate, 'YYYY-MM-DD HH:mm').unix();
    const end = moment(toDate, 'YYYY-MM-DD HH:mm').unix();

    try {
      const response = await fetch(
        `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`
      );

      const data = await response.json();
      this.flights = data as Flight[];
      const filteredFlights = this.utilsService.filterFlights(this.flights);
      this.setDisplayInfo([begin, end]);
      this.setFlights(filteredFlights);
    } catch (error) {
      // Handle error
    }
  }
}
