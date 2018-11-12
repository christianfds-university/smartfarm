import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, toArray } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { DialogUpdateEstadoFenComponent } from '../../dialog/dialog-update-estado-fen/dialog-update-estado-fen.component';
import { DialogColheitaComponent } from '../../dialog/dialog-colheita/dialog-colheita.component';
import { post } from 'selenium-webdriver/http';

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

  public Safra: any;
  public SafrasPassadas: any;
  public displayedColumnsSafras: string[] = ['data_ini', 'data_fim', 'cultivarnome'];

  public EstadoFenSafra: any;
  public EstadoFenSafraPassadas: any;
  public displayedColumnsEstadoFen: string[] = ['data', 'estadofen'];


  options = [];


  private subscription: any;
  private httpOptions: any;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService,
    private activeRoute: ActivatedRoute, public dialog: MatDialog, public snackBar: MatSnackBar) {

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
    };

    this.subscription = this.activeRoute.paramMap.subscribe(params => {
      if (params.get('propid') && params.get('talhaoid')) {

        this.PropId = params.get('propid');
        this.TalhaoId = params.get('talhaoid');

        this.options.push(new ButtonOption('Estações', '/sensors', 'primary'));
      }
    });

  }

  showSnack(x) {
    this.snackBar.open(x, 'x', {
      duration: 2000,
    });
  }

  openDialogColheita() {
    const dialogRef = this.dialog.open(DialogColheitaComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      const httpOptions = {
        'authorization': this.auth.getToken(),
        'data': {
          'data_fim': result.data,
          'produtividade': result.produtividade
        }
      };

      this.http.post('/api/safra/colheita/' + this.Safra._id, httpOptions).subscribe(resp => {
        const x = JSON.parse(JSON.stringify(resp));

        this.showSnack(x.msg);
        if (x.success) {
          this.updateSafra();
        }
      }, err => {
        this.showSnack(err.error.msg);
      });

    });
  }

  openDialogFenologia() {
    const dialogRef = this.dialog.open(DialogUpdateEstadoFenComponent, {
      width: '300px',
      data: { cultivarId: this.Safra.cultivar_id._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      const httpOptions = {
        'authorization': this.auth.getToken(),
        'data': {
          'data': result.date,
          'estado_fenologico_cultivar_id': result.estado_cultivar_id,
        }
      };

      this.http.post('/api/estadofenologicosafra/' + this.Safra._id, httpOptions).subscribe(resp => {
        const x = JSON.parse(JSON.stringify(resp));

        this.showSnack(x.msg);
        if (x.success) {
          this.updateEstadoFenologicoSafra();
        }
      }, err => {
        this.showSnack(err.error.msg);
      });

    });
  }

  updateEstadoFenologicoSafra() {
    this.http.get('/api/estadofenologicosafra/' + this.Safra._id, this.httpOptions).subscribe(fendata => {
      this.EstadoFenSafra = fendata[0];
      this.EstadoFenSafraPassadas = fendata;
    });
  }

  updateSafra() {
    this.http.get('/api/talhao/safra/' + this.TalhaoId, this.httpOptions).subscribe(data => {
      this.Safra = data[0];
      this.SafrasPassadas = data.slice(1);

      this.updateEstadoFenologicoSafra();
    });
  }

  ngOnInit() {

    this.http.get('/api/talhao/' + this.TalhaoId, this.httpOptions).subscribe(data => {
      this.Talhao = data;
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });

    this.updateSafra();
  }

}
