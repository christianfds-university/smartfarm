import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, toArray } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';


class PropRural {
	constructor(
		public id: string,
		public nome: string,
		public desc: string) { }
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
			headers: new HttpHeaders({ 'Authorization': this.auth.getToken(), 'userid': this.auth.getUserId() }),
		};

		this.http.get('/api/propriedade', httpOptions).subscribe(data => {
			console.log('data');
			console.log(data);

			this.propriedades = [];
			for (const k in data) {
				if (data !== null) {
					this.propriedades.push(new PropRural(data[k]._id, data[k].nome, data[k].descricao));
				}
			}

		}, err => {
			if (err.status === 401) {
				this.router.navigate(['login']);
			}

			this.propriedades = [
				new PropRural('123', '123', 'Propriedade debug 1'),
				new PropRural('123', '123', 'Propriedade debug 2'),
				new PropRural('123', '123', 'Propriedade debug 3'),
				new PropRural('123', '123', 'Propriedade debug 4'),
				new PropRural('123', '123', 'Propriedade debug 5')
			];
		});
	}

}
