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
  safraId: String;
}

@Component({
  selector: 'app-dialog-colheita',
  templateUrl: './dialog-colheita.component.html',
  styleUrls: ['./dialog-colheita.component.css']
})
export class DialogColheitaComponent implements OnInit {

  registerData = { date: new Date(), estado_cultivar_id: '' };

  // tslint:disable-next-line:max-line-length
  constructor(public dialogRef: MatDialogRef<DialogColheitaComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient, private router: Router, private auth: AuthenticationService) {

    if (!this.auth.hasToken()) {
      this.router.navigate(['home']);
    }

    console.log('input data');
    console.log(this.data);

  }

  ngOnInit() {
  }

  register() {
    console.log(this.registerData);
    this.dialogRef.close(this.registerData);
  }

}
