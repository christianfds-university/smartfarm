import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError, toArray } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { MatSnackBar, MatDialog } from '@angular/material';

import { DialogProdutividadeComponent } from '../../dialog/dialog-produtividade/dialog-produtividade.component';

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

  public myProdutividade: any;

  displayedColumns: string[] = ['sigla', 'nome'];
  displayedColumnsProd: string[] = ['data', 'produtividade'];

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService,
    private activeRoute: ActivatedRoute, public dialog: MatDialog, public snackBar: MatSnackBar) {

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

    this.updateProdutividade();
  }

  updateProdutividade() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
    };

    this.http.get('/api/produtividadecultivar/' + this.cultivarId, httpOptions).subscribe(resp => {

        this.myProdutividade = resp;

      });
  }

  showSnack(x) {
    this.snackBar.open(x, 'x', {
      duration: 2000,
    });
  }

  openDialogProdutividade() {
    const dialogRef = this.dialog.open(DialogProdutividadeComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      const httpOptions = {
        'authorization': this.auth.getToken(),
        'data': {
          'data': result.data,
          'produtividade': result.produtividade,
          'estado_fenologico_cultivar_id': result.estado_cultivar_id,
        }
      };

      this.http.post('/api/produtividadecultivar/' + this.cultivarId, httpOptions).subscribe(resp => {
        const x = JSON.parse(JSON.stringify(resp));

        this.showSnack(x.msg);
        if (x.success) {
          this.updateProdutividade();
        }
      }, err => {
        this.showSnack(err.error.msg);
      });

    });
  }

}
