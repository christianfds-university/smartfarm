import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-talhao-reg',
  templateUrl: './talhao-reg.component.html',
  styleUrls: ['./talhao-reg.component.css']
})
export class TalhaoRegComponent implements OnInit {

  registerData = { nome: '', propid: '', loc: { x: '', y: '' } };
  message = '';

  private subscription: any;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService, private activeRoute: ActivatedRoute) {
    this.subscription = this.activeRoute.paramMap.subscribe(params => {
      if (!this.auth.hasToken() && !params.get('propid')) {
        this.router.navigate(['home']);
      } else {
        this.registerData.propid = params.get('propid');
      }
    });
  }

  ngOnInit() {

  }

  register() {
    // TODO upload de kml
    const httpOptions = {
      'authorization': this.auth.getToken(),
      'data': this.registerData
    };

    this.http.post('/api/talhao', httpOptions).subscribe(resp => {
      const x = JSON.parse(JSON.stringify(resp));
      console.log(x);
      if (!x.success) {
        this.message = x.msg;
      } else {
        this.router.navigate(['talhao', this.registerData.propid]);
      }
    }, err => {
      this.message = err.error.msg;
    });

  }

}
