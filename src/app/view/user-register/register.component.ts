import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerData = { email: '', nome: '', password: '' };
	message = '';

	constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {
		if (this.auth.hasToken()) {
			this.router.navigate(['home']);
		}
	}

	ngOnInit() {
	}

	register() {
		this.http.post('/api/register', this.registerData).subscribe(resp => {
			console.log(resp);
			this.router.navigate(['login']);
		}, err => {
			this.message = err.error.msg;
		});
	}

}
