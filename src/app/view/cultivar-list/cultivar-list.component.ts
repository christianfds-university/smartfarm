import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, toArray } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';

class Cultivar {
  constructor(
    public id: string,
    public nome: string,
    public tipo: string) { }
}

class TipoCultivar {
  constructor(
    public id: string,
    public nome: string) { }
}

@Component({
  selector: 'app-cultivar-list',
  templateUrl: './cultivar-list.component.html',
  styleUrls: ['./cultivar-list.component.css']
})
export class CultivarListComponent implements OnInit {

  tipo_cultivar: any;

  cultivares_all: any;
  cultivares: any;

  filter: string;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {
  }

  applyFilter() {
    console.log('Aplicando filtro', this.filter);
    if (this.filter === '' || this.filter === undefined) {
      this.cultivares = this.cultivares_all;
    } else {
      this.cultivares = [];
      for (let i = 0; i < this.cultivares_all.length; i++) {
        if (this.filter === this.cultivares_all[i].tipo) {
          this.cultivares.push(this.cultivares_all[i]);
        }
      }
    }

    if (this.cultivares.length === 0) {
      this.cultivares.push(new Cultivar('', 'Nenhum Cultivar Registrado', ''));
    }
  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
    };
    this.filter = '';

    this.http.get('/api/cultivar', httpOptions).subscribe(data => {
      console.log('data');
      console.log(data);

      this.cultivares_all = [];
      for (const k in data) {
        if (data !== null) {
          this.cultivares_all.push(new Cultivar(data[k]._id, data[k].nome, data[k].tipo_cultivar_id.nome));
        }
      }

      if (this.cultivares_all.length === 0) {
        this.cultivares_all = [
          new Cultivar('', 'Nenhum Cultivar Registrado', '')
        ];
      }

      this.applyFilter();

    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });

    this.http.get('/api/tipocultivar', httpOptions).subscribe(data => {
      console.log('data');
      console.log(data);

      this.tipo_cultivar = [];
      for (const k in data) {
        if (data !== null) {
          this.tipo_cultivar.push(new TipoCultivar(data[k]._id, data[k].nome));
        }
      }

    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });
  }
}
