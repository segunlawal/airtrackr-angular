import { Component, OnDestroy } from '@angular/core';
import { TabStateService } from '../../services/tabstate.service';
import { Subscription } from 'rxjs';
import { FlightsComponent } from 'src/app/components/flights/flights.component';
import { StatisticsComponent } from 'src/app/components/statistics/statistics.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {
  activeTab: string = this.tabStateService.getState();
  private stateChangedSubscription: Subscription;

  tabs = [
    { name: 'Flights', component: FlightsComponent },
    { name: 'Statistics', component: StatisticsComponent },
    { name: 'Settings', component: SettingsComponent },
  ];

  constructor(private tabStateService: TabStateService) {
    this.stateChangedSubscription = this.tabStateService.stateChanged.subscribe(
      (newState) => {
        this.activeTab = newState;
      }
    );
  }
  ngOnDestroy() {
    // unsubscribe from the stateChanged subscription to prevent memory leaks
    this.stateChangedSubscription.unsubscribe();
  }
}
