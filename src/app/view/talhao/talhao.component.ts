import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, toArray } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';

class ButtonOption {
  constructor(
    public text: string,
    public link: string,
    public color: string) { }
}

@Component({
  selector: 'app-talhao',
  templateUrl: './talhao.component.html',
  styleUrls: ['./talhao.component.css']
})
export class TalhaoComponent implements OnInit {

  public PropId: string;
  public TalhaoId: string;
  public Talhao: any;
  options = [];


  private subscription: any;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService, private activeRoute: ActivatedRoute) {
    this.subscription = this.activeRoute.paramMap.subscribe(params => {
      if (params.get('propid') && params.get('talhaoid')) {

        this.PropId = params.get('propid');
        this.TalhaoId = params.get('talhaoid');

        this.options.push(new ButtonOption('Sensores', '/sensors', 'primary'));
        this.options.push(new ButtonOption('Safras Passadas', '', 'primary'));

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

    this.http.get('/api/talhao/' + this.TalhaoId, httpOptions).subscribe(data => {
      console.log('data');
      console.log(data);

      this.Talhao = data;

    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });

  }

}
