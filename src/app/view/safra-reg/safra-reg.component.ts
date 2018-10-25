import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { environment } from 'src/environments/environment';

class TipoCultivar {
  constructor(
    public id: string,
    public nome: string) { }
}

class Cultivares {
  constructor(
    public id: string,
    public nome: string) { }
}

class EstadoFen {
  constructor(
    public id: string,
    public sigla: string,
    public nome: string) { }
}

@Component({
  selector: 'app-safra-reg',
  templateUrl: './safra-reg.component.html',
  styleUrls: ['./safra-reg.component.css']
})
export class SafraRegComponent implements OnInit {

  registerData = { data_ini: '', cultivar_id: '', talhao_id: '', estado_fen_id: '' };
  message = '';

  tipo_cultivar: any;
  tipo_cultivar_selection: any;

  cultivares: any;
  estado_fen: any;

  talhaoid: string;
  propid: string;

  private subscription: any;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService,
    private activeRoute: ActivatedRoute, private _location: Location) {

    if (!this.auth.hasToken()) {
      this.router.navigate(['home']);
    }

    this.subscription = this.activeRoute.paramMap.subscribe(params => {
      if (params.get('talhaoid')) {

        this.registerData.talhao_id = params.get('talhaoid');
        this.talhaoid = params.get('talhaoid');

      }
    });
  }

  updateEstadoFen() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
    };

    this.http.get('/api/estadofenologicocultivar/' + this.registerData.cultivar_id, httpOptions).subscribe(data => {
      console.log('estado fen cultivar data');
      console.log(data);

      this.estado_fen = [];

      for (const k in data) {
        if (data !== null) {
          this.estado_fen.push(new EstadoFen(data[k]._id, data[k].sigla, data[k].nome));
        }
      }

      if (this.estado_fen.length > 0) {
        this.registerData.estado_fen_id = this.estado_fen[0].id;
      } else {
        this.registerData.estado_fen_id = '';
      }

    });

  }

  updateCultivares() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
    };

    this.http.get('/api/cultivar/tipo/' + this.tipo_cultivar_selection, httpOptions).subscribe(data => {
      console.log('cultivar data');
      console.log(data);

      this.cultivares = [];

      for (const k in data) {
        if (data !== null) {
          this.cultivares.push(new Cultivares(data[k]._id, data[k].nome));
        }
      }

      if (this.cultivares.length > 0) {
        this.registerData.cultivar_id = this.cultivares[0].id;
      } else {
        this.registerData.cultivar_id = '';
      }

      this.estado_fen = [];
      this.updateEstadoFen();
    });
  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      })
    };

    this.http.get('/api/tipocultivar', httpOptions).subscribe(data => {
      console.log('data');
      console.log(data);

      this.tipo_cultivar = [];
      for (const k in data) {
        if (data !== null) {
          this.tipo_cultivar.push(new TipoCultivar(data[k]._id, data[k].nome));
        }
      }

      if (this.tipo_cultivar.length > 0) {
        this.tipo_cultivar_selection = this.tipo_cultivar[0].id;
      }

    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });

    // this.http.get('/api/propid')
  }

  register() {
    const httpOptions = {
      'authorization': this.auth.getToken(),
      'data': this.registerData
    };

    console.log(this.registerData);


    this.http.post('/api/safra', httpOptions).subscribe(resp => {
      const x = JSON.parse(JSON.stringify(resp));
      console.log(x);
      if (!x.success) {
        this.message = x.msg;
      } else {
        this._location.back();
        // this.router.navigate(['/talhao',,]);
      }
    }, err => {
      this.message = err.error.msg;
    });
  }

}
