import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import {
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatGridListModule,
  MatExpansionModule,
  MatTableModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatDialogModule,
  MatSnackBarModule,
  MAT_DATE_LOCALE
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// Componentes gerais
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxLineChartModule } from 'ngx-line-chart';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as solidGauge from 'highcharts/modules/solid-gauge.src';

// Meus componentes gerais
import { ButtongridComponent } from './component/buttongrid/buttongrid.component';
import { GaugeComponent } from './component/gauge/gauge.component';
import { LineComponent } from './component/line/line.component';

// Componentes de paginas
import { HomeComponent } from './view/home/home.component';
import { PropRuralComponent } from './view/prop-rural/prop-rural.component';
import { CockpitComponent } from './view/cockpit/cockpit.component';
// import { SensorsComponent } from './view/sensors/sensors.component';
import { PropRuralListComponent } from './view/prop-rural-list/prop-rural-list.component';
import { EqComponent } from './view/eq/eq.component';
import { LoginComponent } from './view/user-login/login.component';
import { RegisterComponent } from './view/user-register/register.component';
import { PropRuralRegisterComponent } from './view/prop-rural-register/prop-rural-register.component';
import { TalhaoComponent } from './view/talhao/talhao.component';
import { TalhaoRegComponent } from './view/talhao-reg/talhao-reg.component';
import { TalhaoListComponent } from './view/talhao-list/talhao-list.component';
import { CultivarComponent } from './view/cultivar/cultivar.component';
import { CultivarRegComponent } from './view/cultivar-reg/cultivar-reg.component';
import { CultivarListComponent } from './view/cultivar-list/cultivar-list.component';
import { SafraRegComponent } from './view/safra-reg/safra-reg.component';
import { SafraComponent } from './view/safra/safra.component';
import { EstacoesListComponent } from './view/estacoes-list/estacoes-list.component';
import { EstacaoComponent } from './view/estacao/estacao.component';

import { AuthenticationService } from './authentication.service';

import { DialogUpdateEstadoFenComponent } from './dialog/dialog-update-estado-fen/dialog-update-estado-fen.component';
import { DialogColheitaComponent } from './dialog/dialog-colheita/dialog-colheita.component';
import { DialogEstacaoComponent } from './dialog/dialog-estacao/dialog-estacao.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'proprural', component: PropRuralListComponent },
  { path: 'proprural-reg', component: PropRuralRegisterComponent },
  { path: 'proprural/:propid', component: PropRuralComponent },
  { path: 'proprural/:propid/cockpit', component: CockpitComponent },
  { path: 'talhao/:propid', component: TalhaoListComponent },
  { path: 'talhao-reg/:propid', component: TalhaoRegComponent },
  { path: 'talhao/:propid/:talhaoid', component: TalhaoComponent },
  { path: 'safra/:safraid', component: SafraComponent },
  { path: 'safra-reg/:talhaoid', component: SafraRegComponent },
  { path: 'estacao/:estacaoid', component: EstacaoComponent },
  { path: 'cultivar', component: CultivarListComponent },
  { path: 'cultivar-reg', component: CultivarRegComponent },
  { path: 'cultivar/:cultivarid', component: CultivarComponent },
  { path: 'eq', component: EqComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropRuralComponent,
    CockpitComponent,
    ButtongridComponent,
    GaugeComponent,
    EqComponent,
    PropRuralListComponent,
    LoginComponent,
    RegisterComponent,
    PropRuralRegisterComponent,
    TalhaoComponent,
    TalhaoRegComponent,
    TalhaoListComponent,
    CultivarComponent,
    CultivarRegComponent,
    CultivarListComponent,
    SafraRegComponent,
    SafraComponent,
    DialogUpdateEstadoFenComponent,
    DialogColheitaComponent,
    EstacoesListComponent,
    DialogEstacaoComponent,
    EstacaoComponent,
    LineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
      MatMenuModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatToolbarModule,
      MatGridListModule,
      MatExpansionModule,
      MatTableModule,
      MatListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatSidenavModule,
      MatNativeDateModule,
      MatDatepickerModule,
      MatDialogModule,
      MatSnackBarModule,
    ChartModule,
    NgxGaugeModule,
    NgxLineChartModule,
    ScrollToModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthenticationService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, solidGauge] }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogUpdateEstadoFenComponent,
    DialogColheitaComponent,
    DialogEstacaoComponent
  ]
})
export class AppModule { }
