import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, toArray } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';

class Talhao {
  constructor(
    public id: string,
    public nome: string,
    public x: number,
    public y: number,
    public numero: number) { }
}


@Component({
  selector: 'app-talhao-list',
  templateUrl: './talhao-list.component.html',
  styleUrls: ['./talhao-list.component.css']
})
export class TalhaoListComponent implements OnInit {


  private subscription: any;
  talhoes: any;
  propid: string;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService, private activeRoute: ActivatedRoute) {

    this.subscription = this.activeRoute.paramMap.subscribe(params => {
      if (params.get('propid')) {
        this.propid = params.get('propid');
      }
    });

  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId(),
        'propid': this.propid
      }),
    };

    this.http.get('/api/talhao', httpOptions).subscribe(data => {
      console.log('data');
      console.log(data);

      this.talhoes = [];
      for (const k in data) {
        if (data !== null) {
          this.talhoes.push(new Talhao(data[k]._id, data[k].nome, data[k].location.coordinates[0], data[k].location.coordinates[1], 1));
        }
      }

      // DEBUG
      if (this.talhoes.length === 0) {
        this.talhoes = [
          new Talhao('', 'Nenhum Talhão Registrado', 0, 0, 0)
        ];

      }

    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }

      this.talhoes = [
        new Talhao('', '1231', 1, 1, 1),
        new Talhao('', '1232', 2, 2, 2),
        new Talhao('', '1233', 3, 3, 3),
        new Talhao('', '1234', 4, 4, 4),
        new Talhao('', '1235', 5, 5, 5)
      ];
    });
  }

}
