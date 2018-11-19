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
  talhao_id: string;
  is_new: boolean;
}

@Component({
  selector: 'app-dialog-estacao',
  templateUrl: './dialog-estacao.component.html',
  styleUrls: ['./dialog-estacao.component.css']
})
export class DialogEstacaoComponent implements OnInit {

  registerData = { _id_ext: null, nome: null, desc: null, lat: null, lon: null, talhao_id: null };

  public regNew: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(public dialogRef: MatDialogRef<DialogEstacaoComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient, private router: Router, private auth: AuthenticationService) {

    if (!this.auth.hasToken()) {
      this.router.navigate(['home']);
    }
    console.log('in data');
    console.log(this.data);

    this.regNew = this.data.is_new;
  }

  ngOnInit() {
  }

  register() {
    this.registerData.talhao_id = this.data.talhao_id;

    console.log(this.registerData);
    this.dialogRef.close(this.registerData);
  }

}
