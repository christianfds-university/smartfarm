import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Angular Material
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, MatGridListModule, MatExpansionModule, MatTableModule, MatListModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// Componentes gerais
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxLineChartModule } from 'ngx-line-chart';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// Meus componentes gerais
import { ButtongridComponent } from './component/buttongrid/buttongrid.component';
import { GaugeComponent } from './component/gauge/gauge.component';

// Componentes de paginas
import { HomeComponent } from './view/home/home.component';
import { PropRuralComponent } from './view/prop-rural/prop-rural.component';
import { CockpitComponent } from './view/cockpit/cockpit.component';
import { SensorsComponent } from './view/sensors/sensors.component';
import { PropRuralListComponent } from './view/prop-rural-list/prop-rural-list.component';
import { EqComponent } from './view/eq/eq.component';

// const routes: Routes = [
//   { path: 'create', component: CreateComponent },
//   { path: 'edit/:id', component: EditComponent },
//   { path: 'list', component: ListComponent },
//   { path: '', redirectTo: '/list', pathMatch: 'full'}
// ];

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'proprural', component: PropRuralListComponent },
  { path: 'proprural/:propid', component: PropRuralComponent },
  { path: 'proprural/:propid/cockpit', component: CockpitComponent },
  { path: 'proprural/:propid/sensors', component: SensorsComponent },
  { path: 'eq', component: EqComponent },
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
    SensorsComponent,
    EqComponent,
    PropRuralListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, MatGridListModule, MatExpansionModule, MatTableModule, MatListModule,
    NgxGaugeModule,
    NgxLineChartModule,
    ScrollToModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }