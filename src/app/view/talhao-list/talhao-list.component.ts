import { Component, OnInit, Input } from '@angular/core';
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

  @Input() propid: string;

  private subscription: any;
  talhoes: any;
  prop: any;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService, private activeRoute: ActivatedRoute) {
    /*
    this.subscription = this.activeRoute.paramMap.subscribe(params => {
      if (params.get('propid')) {
        this.propid = params.get('propid');
      }
    });
    */
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

    });

    this.http.get('/api/propriedade/' + this.propid, httpOptions).subscribe(data => {
      console.log('data');
      console.log(data);

      this.prop = data;
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });

  }

}
