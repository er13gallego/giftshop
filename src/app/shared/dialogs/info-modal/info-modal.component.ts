import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { first } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExamplesService } from 'src/app/examples/services/examples.service';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss']
})
export class InfoModalComponent implements OnInit {

  name: string;

  constructor(public dialogRef: MatDialogRef<InfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _examplesService: ExamplesService,
    private _errorHandler: ErrorHandlerService) {
      this.name = this.data.name;
     }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close({
      res: false
    });
  }

  delete() {
    console.log(this.data.id);
    
    this._examplesService.delete(this.data.id, 'product')
    .pipe(first())
    .subscribe(res => {
      this.dialogRef.close({
        res: true
      })
    }, err => {
      this._errorHandler.handle(err);
    });
  }

}
