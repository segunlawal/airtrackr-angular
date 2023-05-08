import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapAirplaneEnginesFill,
  bootstrapEyeFill,
  bootstrapEyeSlashFill,
} from '@ng-icons/bootstrap-icons';
import { matFlightTakeoffOutline } from '@ng-icons/material-icons/outline';
import { lucideBarChart3, lucideSettings } from '@ng-icons/lucide';
import { ionLogOutOutline } from '@ng-icons/ionicons';

import { ToastrModule } from 'ngx-toastr';
import { DashboardlayoutComponent } from './components/dashboard/dashboardlayout/dashboardlayout.component';
import { DashboardsidebarComponent } from './components/dashboard/dashboardsidebar/dashboardsidebar.component';
import { LogoutComponent } from './components/logout/logout.component';

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
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardlayoutComponent,
    DashboardsidebarComponent,
    LogoutComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
