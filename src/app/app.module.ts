import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, MatGridListModule, MatExpansionModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { NgxGaugeModule } from 'ngx-gauge';
import { NgxLineChartModule } from 'ngx-line-chart';

import { HomeComponent } from './view/home/home.component';
import { PropRuralComponent } from './view/prop-rural/prop-rural.component';
import { CockpitComponent } from './view/cockpit/cockpit.component';
import { ButtongridComponent } from './component/buttongrid/buttongrid.component';
import { GaugeComponent } from './component/gauge/gauge.component';
import { SensorsComponent } from './view/sensors/sensors.component';

// const routes: Routes = [
//   { path: 'create', component: CreateComponent },
//   { path: 'edit/:id', component: EditComponent },
//   { path: 'list', component: ListComponent },
//   { path: '', redirectTo: '/list', pathMatch: 'full'}
// ];

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'proprural', component: PropRuralComponent },
  { path: 'cockpit', component: CockpitComponent },
  { path: 'sensors', component: SensorsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropRuralComponent,
    CockpitComponent,
    ButtongridComponent,
    GaugeComponent,
    SensorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, MatGridListModule, MatExpansionModule,
    NgxGaugeModule,
    NgxLineChartModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }