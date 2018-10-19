import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { environment } from 'src/environments/environment';

class TipoCultivar {
  constructor(
    public id: string,
    public nome: string) { }
}

@Component({
  selector: 'app-cultivar-reg',
  templateUrl: './cultivar-reg.component.html',
  styleUrls: ['./cultivar-reg.component.css']
})
export class CultivarRegComponent implements OnInit {

  registerData = { nome: '', tipo_cultivar_id: '' };
  message = '';

  tipo_cultivar: any;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {
    if (!this.auth.hasToken()) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
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

      console.log(this.tipo_cultivar);

    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });

  }

  register() {
    const httpOptions = {
      'authorization': this.auth.getToken(),
      'data': this.registerData
    };

    this.http.post('/api/cultivar', httpOptions).subscribe(resp => {
      const x = JSON.parse(JSON.stringify(resp));
      console.log(x);
      if (!x.success) {
        this.message = x.msg;
      } else {
        this.router.navigate(['cultivar']);
      }
    }, err => {
      this.message = err.error.msg;
    });
  }

}
