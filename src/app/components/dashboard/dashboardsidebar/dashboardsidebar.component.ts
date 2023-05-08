import { Component } from '@angular/core';

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
  links: Link[] = [
    { id: 1, path: 'Flights', icon: 'matFlightTakeoffOutline' },
    { id: 2, path: 'Statistics', icon: 'lucideBarChart3' },
    { id: 3, path: 'Settings', icon: 'lucideSettings' },
  ];
  // links For mobile
  mobileOrder: Array<number> = [1, 0, 2];
  mobileLinks = this.mobileOrder.map((i) => this.links[i]);

  handleTabClick(tab: string) {
    this.selectedLink = tab;
    // setSelectedLink(tab); set context/service in this case
  }
}
