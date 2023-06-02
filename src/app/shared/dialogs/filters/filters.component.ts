import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ExamplesService } from 'src/app/examples/services/examples.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  filters: any;

  constructor(public dialogRef: MatDialogRef<FiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _examplesService: ExamplesService,
    private _errorHandler: ErrorHandlerService) {
      console.log(this.data);
      
      this.filters = this.data;
    }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close({
      res: false
    });
  }
}
