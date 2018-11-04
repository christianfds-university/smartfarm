import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from './authentication.service';
import { MatSnackBar } from '@angular/material';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [AuthenticationService]
})
export class AppComponent implements OnDestroy {
	title = 'App';
	loggedin = false;

	mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;

	// tslint:disable-next-line:max-line-length
	constructor(private _location: Location, private http: HttpClient, private router: Router, private auth: AuthenticationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public snackBar: MatSnackBar) {
		this.loggedin = auth.hasToken();

		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	loginChanged($event) {
		this.loggedin = this.auth.hasToken();
	}

	changeOfRoutes() {
		this.loggedin = this.auth.hasToken();

		if (!this.auth.hasToken()) {
			// this.router.navigate(['login']);
			this.loggedin = false;
		}
	}

	backClicked() {
		this._location.back();
	}

	logout() {
		this.auth.logout();
		this.router.navigate(['login']);
		this.loggedin = false;
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}

}
