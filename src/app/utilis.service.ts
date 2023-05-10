import { Injectable } from '@angular/core';
import { Flight } from './models/flight';

@Injectable({
  providedIn: 'root',
})
export class UtilisService {
  unixToGMT(unixTime: number) {
    const date = new Date(unixTime * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const gmtTimeStr = `${hours}:${minutes} GMT`;
    return gmtTimeStr;
  }
  unixToDate(unixTime: number) {
    const date = new Date(unixTime * 1000);
    const dateStr = date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return dateStr;
  }
  filterFlights(flights: Array<Flight>) {
    return flights?.filter((flight) => {
      if (
        flight.estArrivalAirport === null ||
        flight.estDepartureAirport === null ||
        flight.callsign === null
      ) {
        return false;
      }
      return true;
    });
  }
}
