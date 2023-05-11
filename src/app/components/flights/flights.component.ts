import { Component, OnInit, ViewChild } from '@angular/core';
import { FlightsApiService } from 'src/app/services/flights-api.service';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight';
import { UtilisService } from 'src/app/utils/utilis.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
})
export class FlightsComponent implements OnInit {
  private stateChangedSubscription: Subscription;
  private displayChangedSubscription: Subscription;
  flights: Array<Flight> = this.flightsService.getFlights().slice(0, 10);
  displayInfo: Array<number> = this.flightsService.getDisplayInfo();
  username!: string;
  public pageSlice: Array<Flight> = this.flights.slice(0, 10);
  search!: string;

  updatePageSlice(): void {
    this.pageSlice = this.flights
      .filter((item) => {
        return this.search.toLowerCase() === ''
          ? item
          : item.callsign.toLowerCase().includes(this.search.toLowerCase());
      })
      .slice(0, 10);
  }

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
        this.pageSlice = this.flights.slice(0, 10);
      }
    );
    this.displayChangedSubscription =
      this.flightsService.displayInfoChanged.subscribe((newState) => {
        this.displayInfo = newState;
      });
  }
  ngOnInit(): void {}

  openDialog(): void {
    // Open search modal
    const isSmallScreen = window.matchMedia('(max-width: 640px)').matches;

    const width = isSmallScreen ? '90%' : '50%';
    this.dialog.open(SearchmodalComponent, {
      width: width,
    });
  }

  OnPageChange(event: PageEvent) {
    // Handle pagination
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.flights.length) {
      endIndex = this.flights.length;
    }
    this.pageSlice = this.flights.slice(startIndex, endIndex);
    this.updatePageSlice();
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
  modalLoad: boolean = false;

  getDifference(from: string, to: string): boolean {
    // Check if time difference is more than 2 hours
    const date1 = moment(from, 'YYYY-MM-DD HH:mm');
    const date2 = moment(to, 'YYYY-MM-DD HH:mm');
    const diffHours = date2.diff(date1, 'hours');
    return diffHours > 2;
  }
  async handleSearch() {
    this.disableButton = true;
    this.modalLoad = true;
    await this.flightsService.searchTimeRange(
      this.form.value.fromDate,
      this.form.value.toDate
    );
    this.dialogRef.close();
    this.modalLoad = false;
    this.toastr.success('Flights search successful');
    this.disableButton = false;
  }

  constructor(
    public dialogRef: MatDialogRef<SearchmodalComponent>,
    private toastr: ToastrService,
    public flightsService: FlightsApiService
  ) {}
}
