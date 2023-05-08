import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabStateService } from '../../services/tabstate.service';
import { Subscription } from 'rxjs';
import { FlightsComponent } from 'src/app/components/flights/flights.component';
import { StatisticsComponent } from 'src/app/components/statistics/statistics.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private tabStateService: TabStateService,
    private router: Router
  ) {
    this.stateChangedSubscription = this.tabStateService.stateChanged.subscribe(
      (newState) => {
        this.activeTab = newState;
      }
    );
  }
  activeTab: string = this.tabStateService.getState();
  private stateChangedSubscription: Subscription;

  ngOnInit() {
    // Check for authentication
    const token = localStorage.getItem('openSkyToken');
    if (!token) {
      this.router.navigateByUrl('/');
    }
  }

  tabs = [
    { name: 'Flights', component: FlightsComponent },
    { name: 'Statistics', component: StatisticsComponent },
    { name: 'Settings', component: SettingsComponent },
  ];

  ngOnDestroy() {
    // unsubscribe from the stateChanged subscription to prevent memory leaks
    this.stateChangedSubscription.unsubscribe();
  }
}
