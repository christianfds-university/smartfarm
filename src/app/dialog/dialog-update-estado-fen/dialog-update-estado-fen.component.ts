import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  cultivarId: String;
}

class EstadoFen {
  constructor(
    public id: string,
    public sigla: string,
    public nome: string) { }
}

@Component({
  selector: 'app-dialog-update-estado-fen',
  templateUrl: './dialog-update-estado-fen.component.html',
  styleUrls: ['./dialog-update-estado-fen.component.css']
})
export class DialogUpdateEstadoFenComponent implements OnInit {

  registerData = { date: new Date(), estado_cultivar_id: '' };

  estado_fen: any;

  // tslint:disable-next-line:max-line-length
  constructor(public dialogRef: MatDialogRef<DialogUpdateEstadoFenComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient, private router: Router, private auth: AuthenticationService) {

    if (!this.auth.hasToken()) {
      this.router.navigate(['home']);
    }

    console.log('input data');
    console.log(this.data);

  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.auth.getToken(),
        'userid': this.auth.getUserId()
      }),
    };

    this.http.get('/api/estadofenologicocultivar/' + this.data.cultivarId, httpOptions).subscribe(resp => {

      this.estado_fen = [];
      for (const k in resp) {
        if (resp !== null) {
          this.estado_fen.push(new EstadoFen(resp[k]._id, resp[k].sigla, resp[k].nome));
        }
      }
    });

  }

  register() {
    console.log(this.registerData);
    this.dialogRef.close(this.registerData);
  }

}
