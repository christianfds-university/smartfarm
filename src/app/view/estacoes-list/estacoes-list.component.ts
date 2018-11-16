import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

class EstacaoCtrl {
  constructor(
    public data: any,
    public api_data: any,
    public updater: any,
    public color: string,
    public link: string) { }
}

@Component({
  selector: 'app-estacoes-list',
  templateUrl: './estacoes-list.component.html',
  styleUrls: ['./estacoes-list.component.css']
})
export class EstacoesListComponent implements OnInit {

  @Input() talhao_id: string;

  private httpOptions: any;

  private data: EstacaoCtrl[];

  private tileSize = 70;
  private tileCount = 8;
  breakpoint: Number;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
    };

    this.data = [];
  }

  ngOnInit() {
    if (this.talhao_id !== undefined && this.talhao_id != null) {
      this.http.get('/api/estacao/' + this.talhao_id, this.httpOptions).subscribe(estacoes => {

        for (const est in estacoes) {
          if (est) {

            const d = null;
            d.data = est;
            d.updater = setInterval(() => {
              console.log('lolololololo');
            }, 10000);

            this.data.push(new EstacaoCtrl(d.data, null, d.updater, null, null));
          }
        }

        this.data.push(new EstacaoCtrl('data', null, 'updater', '#ccc', '.'));
      });
    }

    if (document.getElementById('grid').offsetWidth / this.tileSize > this.tileCount) {
      this.breakpoint = this.tileCount;
    } else {
      this.breakpoint = Math.ceil(document.getElementById('grid').offsetWidth / this.tileSize);
    }

  }

  onResize() {
    if (document.getElementById('grid').offsetWidth / this.tileSize > this.tileCount) {
      this.breakpoint = this.tileCount;
    } else {
      this.breakpoint = Math.ceil(document.getElementById('grid').offsetWidth / this.tileSize);
    }
    // this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 5;
  }


}
