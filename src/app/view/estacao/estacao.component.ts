import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { AuthenticationService } from '../../authentication.service';

import { DialogEstacaoComponent } from '../../dialog/dialog-estacao/dialog-estacao.component';
import { ObjectUnsubscribedError } from 'rxjs';
import { DialogUpdateEstadoFenComponent } from '../../dialog/dialog-update-estado-fen/dialog-update-estado-fen.component';

@Component({
  selector: 'app-estacao',
  templateUrl: './estacao.component.html',
  styleUrls: ['./estacao.component.css']
})
export class EstacaoComponent implements OnInit, OnDestroy {

  private EstacaoID: any;

  public Safra: any;
  public Estacao: any;
  private EstadoFen: any;
  private EstadoFenPassados: any;

  private estacaoOnBG = '#2ecc71';
  private estacaoOnFG = '#fff';
  private estacaoOffBG = '#d7dbdd';
  private estacaoOffFG = '#000';

  // tslint:disable-next-line:max-line-length
  private tipos = [{ 'id': 1, 'nome': 'Temperatura do Ar', 'unidade': '°C' }, { 'id': 2, 'nome': 'Umidade do Ar', 'unidade': 'g/Kg' }, { 'id': 3, 'nome': 'Temperatura do solo 5cm', 'unidade': '°C' }, { 'id': 4, 'nome': 'Temperatura do solo 20cm', 'unidade': '°C' }, { 'id': 5, 'nome': 'Temperatura do solo 30cm', 'unidade': '°C' }, { 'id': 6, 'nome': 'Umidade do Solo', 'unidade': 'g/Kg' }, { 'id': 7, 'nome': 'Pressao', 'unidade': 'mATM' }, { 'id': 8, 'nome': 'Chuva', 'unidade': 'g/Kg' }, { 'id': 9, 'nome': 'Velocidade do Vento', 'unidade': 'm/s' }, { 'id': 10, 'nome': 'Direcao do Vento', 'unidade': '' }, { 'id': 11, 'nome': 'Luminosidade', 'unidade': 'lx' }, { 'id': 12, 'nome': 'RSSI', 'unidade': '' }, { 'id': 13, 'nome': 'Tensao Bateria', 'unidade': 'V' }];
  private updateChartsInterval: any;
  public chartsData = new Array(this.tipos.length);

  private max = 50;

  private subscription: any;
  private httpOptions: any;

  public displayedColumnsEstadoFen: string[] = ['data', 'estadofen'];

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService,
    public snackBar: MatSnackBar, public dialog: MatDialog, private activeRoute: ActivatedRoute) {

    if (!this.auth.hasToken()) {
      this.router.navigate(['home']);
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
    };

    this.subscription = this.activeRoute.paramMap.subscribe(params => {
      if (params.get('estacaoid')) {

        this.EstacaoID = params.get('estacaoid');

      }
    });

  }

  showSnack(x) {
    this.snackBar.open(x, 'x', {
      duration: 2000,
    });
  }

  openDialogFenologia() {
    if (this.Safra) {

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

        this.http.post('/api/estadofenologicoestacao/' + this.EstacaoID + '/safra/' + this.Safra._id, httpOptions).subscribe(resp => {
          const x = JSON.parse(JSON.stringify(resp));

          this.showSnack(x.msg);
          if (x.success) {
            this.updateEstadoFenologicoEstacao();
          }
        }, err => {
          this.showSnack(err.error.msg);
        });

      });
    }
  }

  updateEstadoFenologicoEstacao() {
    this.http.get('/api/estadofenologicoestacao/' + this.EstacaoID + '/safra/' + this.Safra._id, this.httpOptions).subscribe(fendata => {
      this.EstadoFen = fendata[0];
      this.EstadoFenPassados = fendata;
    });
  }

  updateEstacao() {
    this.http.get('/api/estacao/' + this.EstacaoID, this.httpOptions).subscribe(res => {
      const x = JSON.parse(JSON.stringify(res));

      this.http.get('/api/out/estacoes/' + x._id_ext, this.httpOptions).subscribe(resp => {

        const d = JSON.parse(JSON.stringify(resp));

        if (d.erro == null) {
          this.Estacao = d.resultado;

          this.chartUpdate();
        } else {
          this.showSnack('Falha ao obter dados da estação');
        }

      });

      this.http.get('/api/talhao/safra/' + x.talhao_id, this.httpOptions).subscribe(safra => {

        if (safra) {
          this.Safra = safra[0];

          // tslint:disable-next-line:max-line-length
          this.http.get('/api/estadofenologicoestacao/' + this.EstacaoID + '/safra/' + this.Safra._id, this.httpOptions).subscribe(estfen => {
            if (estfen) {
              this.EstadoFen = estfen[0];
              this.EstadoFenPassados = estfen.slice(1);
            }
          });
        }
      });
    });
  }

  chartUpdate() {
    if (this.Estacao) {
      // tslint:disable-next-line:max-line-length
      try {

        this.http.get('/api/out/estacoes/' + this.Estacao.id + '/sensores', this.httpOptions).subscribe(data => {
          let nData: any;
          nData = data;

          if (nData.erro == null) {

            let sens: any;
            for (sens in nData.resultado) {
              if (sens) {

                const retorno = nData.resultado[sens].dados_sensor;
                const leitura = retorno.ultima_leitura;

                if (retorno !== undefined) {

                  const n = retorno.id_tipo_sensor;

                  if (this.chartsData[n - 1] === undefined) {
                    this.chartsData[n - 1] = [[new Date(leitura.data_hora).getTime(), leitura.leitura]];

                    // this.chartsData[n - 1] = this.chartsData[n - 1].slice();
                  } else if (new Date(leitura.data_hora).getTime() !== this.chartsData[n - 1][this.chartsData[n - 1].length - 1][0]) {
                    this.chartsData[n - 1].push([new Date(leitura.data_hora).getTime(), leitura.leitura]);

                    // Força atualização do angular
                    if (this.chartsData[n - 1].length > this.max) {
                      this.chartsData[n - 1] = this.chartsData[n - 1].slice(this.chartsData[n - 1].length - this.max);
                    } else {
                      this.chartsData[n - 1] = this.chartsData[n - 1].slice();
                    }
                  }

                }
              }
            }
          }
        });
      } catch (err) {
      }
    }
  }

  ngOnInit() {
    this.updateEstacao();

    this.updateChartsInterval = setInterval(() => {
      this.chartUpdate();
    }, 10000);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

    clearInterval(this.updateChartsInterval);
  }

}
