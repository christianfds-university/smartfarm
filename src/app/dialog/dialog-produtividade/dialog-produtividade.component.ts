import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication.service';
import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-dialog-produtividade',
  templateUrl: './dialog-produtividade.component.html',
  styleUrls: ['./dialog-produtividade.component.css']
})
export class DialogProdutividadeComponent implements OnInit {

  registerData = { data: new Date(), produtividade: '' };

  // tslint:disable-next-line:max-line-length
  constructor(public dialogRef: MatDialogRef<DialogProdutividadeComponent>, private http: HttpClient, private router: Router, private auth: AuthenticationService) {

    if (!this.auth.hasToken()) {
      this.router.navigate(['home']);
    }

  }

  ngOnInit() {
  }

  register() {
    this.dialogRef.close(this.registerData);
  }

}
