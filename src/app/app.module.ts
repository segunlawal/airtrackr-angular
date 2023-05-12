// Angular Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Components
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {
  FlightsComponent,
  SearchmodalComponent,
} from './components/flights/flights.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardlayoutComponent } from './components/dashboard/dashboardlayout/dashboardlayout.component';
import { DashboardsidebarComponent } from './components/dashboard/dashboardsidebar/dashboardsidebar.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { LoadingspinnerComponent } from './components/loadingspinner/loadingspinner.component';

// Icons
import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapAirplaneEnginesFill,
  bootstrapEyeFill,
  bootstrapEyeSlashFill,
} from '@ng-icons/bootstrap-icons';
import { matFlightTakeoffOutline } from '@ng-icons/material-icons/outline';
import { lucideBarChart3, lucideSettings } from '@ng-icons/lucide';
import { ionLogOutOutline } from '@ng-icons/ionicons';

// Libraries
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardlayoutComponent,
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorpageComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardlayoutComponent,
    DashboardsidebarComponent,
    LogoutComponent,
    FlightsComponent,
    StatisticsComponent,
    SettingsComponent,
    SearchmodalComponent,
    ErrorpageComponent,
    LoadingspinnerComponent,
  ],
  imports: [
    BrowserModule,
    NgIconsModule.withIcons({
      bootstrapAirplaneEnginesFill,
      bootstrapEyeFill,
      bootstrapEyeSlashFill,
      matFlightTakeoffOutline,
      lucideBarChart3,
      lucideSettings,
      ionLogOutOutline,
    }),
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
    }),
    MatDialogModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
