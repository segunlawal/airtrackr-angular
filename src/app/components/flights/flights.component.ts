import { Component, ViewChild } from '@angular/core';
import { FlightsApiService } from 'src/app/services/flights-api.service';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight';
import { UtilisService } from 'src/app/utilis.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
})
export class FlightsComponent {
  private stateChangedSubscription: Subscription;
  private displayChangedSubscription: Subscription;
  flights: Array<Flight> = this.flightsService.getFlights();
  displayInfo: Array<number> = this.flightsService.getDisplayInfo();
  username!: string;
  time1 = this.utilsService.unixToGMT(this.displayInfo[0]);
  time2 = this.utilsService.unixToGMT(this.displayInfo[1]);
  date1 = this.utilsService.unixToDate(this.displayInfo[0]);
  date2 = this.utilsService.unixToDate(this.displayInfo[1]);

  constructor(
    public flightsService: FlightsApiService,
    public utilsService: UtilisService,
    public dialog: MatDialog
  ) {
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
    this.displayChangedSubscription =
      this.flightsService.displayInfoChanged.subscribe((newState) => {
        this.displayInfo = newState;
      });
  }

  openDialog(): void {
    const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;

    const width = isSmallScreen ? '90%' : '50%';
    this.dialog.open(SearchmodalComponent, {
      width: width,
    });
  }

  isSameDay(displayInfo: Array<number>) {
    //Check if dates are the same day
    const date1 = new Date(displayInfo[0] * 1000);
    const date2 = new Date(displayInfo[1] * 1000);
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  ngOnDestroy() {
    // unsubscribe from the stateChanged subscription to prevent memory leaks
    this.stateChangedSubscription.unsubscribe();
    this.displayChangedSubscription.unsubscribe();
  }
}

// Modal
@Component({
  selector: 'app-searchmodal',
  templateUrl: 'searchmodal.html',
})
export class SearchmodalComponent {
  fromDate: string = moment()
    .set({ hour: 0, minute: 0 })
    .format('YYYY-MM-DD HH:mm');
  toDate: string = moment()
    .set({ hour: 0, minute: 0 })
    .format('YYYY-MM-DD HH:mm');
  @ViewChild('myForm') form!: NgForm;
  disableButton: boolean = false;
  searchSuccess: boolean = false;
  // flights: Array<Flight> = this.flightsService.getFlights();

  getDifference(from: string, to: string): boolean {
    // Check if time difference is more than 2 hours
    const date1 = moment(from, 'YYYY-MM-DD HH:mm');
    const date2 = moment(to, 'YYYY-MM-DD HH:mm');
    const diffHours = date2.diff(date1, 'hours');
    return diffHours > 2;
  }
  async handleSearch() {
    this.disableButton = true;
    await this.flightsService.searchTimeRange(
      this.form.value.fromDate,
      this.form.value.toDate
    );
    this.dialogRef.close();
    this.toastr.success('Flights search successful');
    this.disableButton = false;
  }

  constructor(
    public dialogRef: MatDialogRef<SearchmodalComponent>,
    private toastr: ToastrService,
    public flightsService: FlightsApiService
  ) {}
}
