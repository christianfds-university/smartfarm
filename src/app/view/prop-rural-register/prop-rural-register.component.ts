import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prop-rural-register',
  templateUrl: './prop-rural-register.component.html',
  styleUrls: ['./prop-rural-register.component.css']
})
export class PropRuralRegisterComponent implements OnInit {

  registerData = { nome: '', desc: '', dono: '', loc: { x: '', y: '' } };
  message = '';

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {
    if (!this.auth.hasToken()) {
      this.router.navigate(['home']);
    } else {
      this.registerData.dono = auth.getUserId();
    }
  }

  ngOnInit() {
  }

  register() {
    const httpOptions = {
      'authorization': this.auth.getToken(),
      'data': this.registerData
    };

    this.http.post('/api/propriedade', httpOptions).subscribe(resp => {
      const x = JSON.parse(JSON.stringify(resp));
      console.log(x);
      if (! x.success) {
        this.message = x.msg;
      } else {
        this.router.navigate(['proprural']);
      }
    }, err => {
      this.message = err.error.msg;
    });
  }
}
