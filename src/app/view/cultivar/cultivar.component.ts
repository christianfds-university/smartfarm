import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, toArray } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-cultivar',
  templateUrl: './cultivar.component.html',
  styleUrls: ['./cultivar.component.css']
})
export class CultivarComponent implements OnInit {

  public cultivarId: string;
  public cultivar: any;
  private subscription: any;

  public myEstados: any;
  public myTipoEstados: any;

  displayedColumns: string[] = ['sigla', 'nome'];

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService, private activeRoute: ActivatedRoute) {
    this.subscription = this.activeRoute.paramMap.subscribe(params => {
      if (params.get('cultivarid')) {

        this.cultivarId = params.get('cultivarid');

      }
    });
  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
    };

    this.http.get('/api/cultivar/' + this.cultivarId, httpOptions).subscribe(data => {
      this.cultivar = data;
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });

    this.http.get('/api/estadofenologicocultivar/' + this.cultivarId, httpOptions).subscribe(data => {
      this.myEstados = data;
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });

    this.http.get('/api/estadofenologico/' + this.cultivarId, httpOptions).subscribe(data => {
      this.myTipoEstados = data;
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });

  }

}
