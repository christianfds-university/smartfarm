import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [AuthenticationService]
})
export class AppComponent {
	title = 'App';
	loggedin = false;

	constructor (private _location: Location, private http: HttpClient, private router: Router, private auth: AuthenticationService) {
		this.loggedin = auth.hasToken();
	}

	loginChanged ($event) {
		this.loggedin = this.auth.hasToken();
	}

	changeOfRoutes () {
		this.loggedin = this.auth.hasToken();

		if (!this.auth.hasToken()) {
			this.router.navigate(['login']);
			this.loggedin = false;
		}
	}

	backClicked () {
		this._location.back();
	}
	logout () {
		this.auth.logout();
		this.router.navigate(['login']);
		this.loggedin = false;
	}
}
