import { Component } from '@angular/core';
import { TabStateService } from 'src/app/services/tabstate.service';

interface Link {
  id: number;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-dashboardsidebar',
  templateUrl: './dashboardsidebar.component.html',
})
export class DashboardsidebarComponent {
  selectedLink: string = 'Flights';
  tabState: string;
  links: Link[] = [
    { id: 1, path: 'Flights', icon: 'matFlightTakeoffOutline' },
    { id: 2, path: 'Statistics', icon: 'lucideBarChart3' },
    { id: 3, path: 'Settings', icon: 'lucideSettings' },
  ];
  // links For mobile
  mobileOrder: Array<number> = [1, 0, 2];
  mobileLinks = this.mobileOrder.map((i) => this.links[i]);

  constructor(private tabStateService: TabStateService) {
    this.tabState = this.tabStateService.getState();
  }

  handleTabClick(tab: string) {
    // set service to active tab
    this.selectedLink = tab;
    this.tabStateService.setState(tab);
  }
}
