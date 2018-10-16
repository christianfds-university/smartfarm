import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Angular Material
import { MatMenuModule,
         MatButtonModule,
         MatIconModule,
         MatCardModule,
         MatToolbarModule,
         MatGridListModule,
         MatExpansionModule,
         MatTableModule,
         MatListModule,
         MatFormFieldModule,
         MatInputModule } from '@angular/material';
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
// import { SensorsComponent } from './view/sensors/sensors.component';
import { PropRuralListComponent } from './view/prop-rural-list/prop-rural-list.component';
import { EqComponent } from './view/eq/eq.component';
import { LoginComponent } from './view/user-login/login.component';
import { RegisterComponent } from './view/user-register/register.component';
import { PropRuralRegisterComponent } from './view/prop-rural-register/prop-rural-register.component';
import { TalhaoComponent } from './view/talhao/talhao.component';
import { TalhaoRegComponent } from './view/talhao-reg/talhao-reg.component';
import { TalhaoListComponent } from './view/talhao-list/talhao-list.component';

const routes: Routes = [
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'home', component: HomeComponent },
{ path: 'proprural', component: PropRuralListComponent },
{ path: 'proprural-reg', component: PropRuralRegisterComponent},
{ path: 'proprural/:propid', component: PropRuralComponent },
{ path: 'proprural/:propid/cockpit', component: CockpitComponent },
// { path: 'proprural/:propid/sensors', component: SensorsComponent },
{ path: 'talhao/:propid', component: TalhaoListComponent },
{ path: 'talhao-reg/:propid', component: TalhaoRegComponent},
{ path: 'talhao/:propid/:talhaoid', component: TalhaoComponent },
{ path: 'eq', component: EqComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropRuralComponent,
    CockpitComponent,
    ButtongridComponent,
    GaugeComponent,
    // SensorsComponent,
    EqComponent,
    PropRuralListComponent,
    LoginComponent,
    RegisterComponent,
    PropRuralRegisterComponent,
    TalhaoComponent,
    TalhaoRegComponent,
    TalhaoListComponent
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
    NgxGaugeModule,
    NgxLineChartModule,
    ScrollToModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
