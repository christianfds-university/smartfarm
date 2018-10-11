import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

	loginData = { email: '', password: '' };
	message = '';
	data: any;

	@Output() loginChanged: EventEmitter<any> = new EventEmitter();

	constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {
		if (this.auth.hasToken()) {
			this.router.navigate(['home']);
		}

	}

	ngOnInit() {
	}

	login() {
		this.http.post('/api/login', this.loginData).subscribe(resp => {
			this.data = resp;

			this.auth.saveToken(this.data.token);
			this.auth.saveUserId(this.data.userid);
			this.loginChanged.emit(null);
			this.router.navigate(['home']);
		}, err => {
			this.message = err.error.msg;
		});
	}

}
