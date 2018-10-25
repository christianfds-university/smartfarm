import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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
			this.router.navigate(['home']);
		}
	}

	ngOnInit() {
	}

	register() {
		if (this.registerData.email !== '' && this.registerData.nome !== '' && this.registerData.password !== '') {
			this.http.post('/api/register', this.registerData).subscribe(resp => {
				console.log(resp);
				this.router.navigate(['login']);
			}, err => {
				this.message = err.error.msg;
			});
		}
	}
}
