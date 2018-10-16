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
		console.log('has token? ', this.auth.hasToken());
		if (this.auth.hasToken()) {
			this.message = 'tem token';
			// this.router.navigate(['home']);
		}
		this.message = 'não tem token';
	}

	ngOnInit() {
	}

	register() {
		if (this.registerData.email !== '' && this.registerData.nome !== '' && this.registerData.password !== '') {
			this.http.post('/api/register', this.registerData).subscribe(resp => {
				console.log(resp);
				this.message = 'registrou';
				// this.router.navigate(['login']);
			}, err => {
				this.message = err.error.msg;
			});
		}
	}
}
