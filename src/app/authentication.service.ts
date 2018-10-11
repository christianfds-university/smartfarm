import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
	private token: string;
	private userId: string;

	constructor(private http: HttpClient, private router: Router) {}

	public getToken(): string {
		if (!this.token) {
			this.token = localStorage.getItem('jwtToken');
		}
		return this.token;
	}

	public hasToken(): boolean {
		return this.getToken() !== undefined && this.getToken() !== null;
	}

	public saveToken(token: string): void {
		localStorage.setItem('jwtToken', token);
		this.token = token;
	}

	public logout(): void {
		this.token = '';
		this.userId = '';
		window.localStorage.removeItem('jwtToken');
	}

	public getUserId(): string {
		if (!this.userId) {
			this.userId = localStorage.getItem('userId');
		}
		return this.userId;
	}

	public saveUserId(userId: string) {
		localStorage.setItem('userId', userId);
		this.userId = userId;
	}

}
