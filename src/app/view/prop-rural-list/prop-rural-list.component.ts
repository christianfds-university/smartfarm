import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';


class PropRural {
	constructor(
		public id: string,
		public name: string) { }
}

@Component({
	selector: 'app-prop-rural-list',
	templateUrl: './prop-rural-list.component.html',
	styleUrls: ['./prop-rural-list.component.css']
})
export class PropRuralListComponent implements OnInit {

	propriedades: any;

	constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) { }

	ngOnInit() {
		const httpOptions = {
			headers: new HttpHeaders({ 'Authorization': this.auth.getToken() })
		};
		this.http.get('/api/propriedade', httpOptions).subscribe(data => {
			// TODO
			// this.propriedades.push(data.id);



			console.log(this.propriedades);
		}, err => {
			if (err.status === 401) {
				this.router.navigate(['login']);
			}

			this.propriedades = [
				new PropRural('123', 'Propriedade debug Norte'),
				new PropRural('123', 'Propriedade debug Sul'),
				new PropRural('123', 'Propriedade debug Leste'),
				new PropRural('123', 'Propriedade debug Oeste'),
				new PropRural('123', 'Propriedade debug Nordeste')
			];
		});
	}

}
