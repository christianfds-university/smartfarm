import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { AuthenticationService } from '../../authentication.service';

import { DialogEstacaoComponent } from '../../dialog/dialog-estacao/dialog-estacao.component';
import { ObjectUnsubscribedError } from 'rxjs';

class EstacaoCtrl {
  constructor(
    public data: any,
    public api_data: any,
    public is_on: boolean,
    public link: string) { }
}

@Component({
  selector: 'app-estacoes-list',
  templateUrl: './estacoes-list.component.html',
  styleUrls: ['./estacoes-list.component.css']
})
export class EstacoesListComponent implements OnInit, OnDestroy {

  @Input() talhao_id: string;

  private httpOptions: any;

  public listEstacao: EstacaoCtrl[];

  private estacaoOnBG = '#2ecc71';
  private estacaoOnFG = '#fff';
  private estacaoOffBG = '#d7dbdd';
  private estacaoOffFG = '#000';

  private EstacaoUpdateInterval: any;

  private tileSize = 70;
  private tileCount = 8;
  breakpoint: Number;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService,
    public snackBar: MatSnackBar, public dialog: MatDialog) {

    if (!this.auth.hasToken()) {
      this.router.navigate(['home']);
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
    };

    this.listEstacao = [];
  }

  updateAllEstacoesInfo() {
    for (const est in this.listEstacao) {
      if (est) {

        const int_i = est;
        const id_ext = this.listEstacao[int_i].data._id_ext;
        // Verifica conexão
        this.http.get('/api/out/estacoes/' + id_ext, this.httpOptions).subscribe(updated => {
          let dado: any;
          dado = updated;

          if (dado.erro == null) {

            this.listEstacao[int_i].api_data = dado.resultado;
            this.listEstacao[int_i].is_on = true;
          } else {

            this.listEstacao[int_i].is_on = false;
          }
        });
      }

    }

  }

  updateEstacao() {
    if (this.talhao_id !== undefined && this.talhao_id != null) {
      this.http.get('/api/estacao/talhao/' + this.talhao_id, this.httpOptions).subscribe(estacoes => {

        this.listEstacao = [];
        for (const est in estacoes) {
          if (est) {

            const data = estacoes[est];
            const i = this.listEstacao.length;

            this.http.get('/api/out/estacoes/' + data._id_ext, this.httpOptions).subscribe(updated => {
              let dado: any;
              dado = updated;

              if (dado.erro === null) {
                this.listEstacao.push(new EstacaoCtrl(data, dado.resultado, true, '/estacao/' + data._id));
              } else {
                this.listEstacao.push(new EstacaoCtrl(data, null, false, '/estacao/' + data._id));
              }
            });

          }
        }
      });
    }
  }

  ngOnInit() {
    this.listEstacao = [];
    this.updateEstacao();

    if (document.getElementById('grid').offsetWidth / this.tileSize > this.tileCount) {
      this.breakpoint = this.tileCount;
    } else {
      this.breakpoint = Math.ceil(document.getElementById('grid').offsetWidth / this.tileSize);
    }

    this.EstacaoUpdateInterval = setInterval(() => {
      this.updateAllEstacoesInfo();
    }, 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.EstacaoUpdateInterval);
  }

  showSnack(x) {
    this.snackBar.open(x, 'x', {
      duration: 2000,
    });
  }


  openDialogEstacao(isNew: boolean) {

    isNew = isNew === undefined ? true : isNew;

    const dialogRef = this.dialog.open(DialogEstacaoComponent, {
      width: '300px',
      data: {
        talhao_id: this.talhao_id,
        is_new: isNew
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);

      const httpOptions = {
        'authorization': this.auth.getToken(),
        'data': result
      };


      // Vincular com estação já criada
      if (result._id_ext != null) {

        this.http.post('/api/estacao', httpOptions).subscribe((resp) => {
          const x = JSON.parse(JSON.stringify(resp));

          if (x.success) {
            this.updateEstacao();
          }
          this.showSnack(x.msg);
        });

      }
      /*
      this.http.post('/api/estadofenologicosafra/' + this.Safra._id, httpOptions).subscribe(resp => {
        const x = JSON.parse(JSON.stringify(resp));

        this.showSnack(x.msg);
        if (x.success) {
          this.updateEstadoFenologicoSafra();
        }
      }, err => {
        this.showSnack(err.error.msg);
      });
      */
    });


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
