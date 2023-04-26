import { Component, OnInit } from '@angular/core';
import { ComponentBase } from 'src/app/common/component-base';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ExamplesService } from '../services/examples.service';
import { AppValidators } from 'src/app/common/app-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-example-edit',
  templateUrl: './example-edit.component.html',
  styleUrls: ['./example-edit.component.scss'],
})
export class ExampleEditComponent extends ComponentBase implements OnInit {
  public form: FormGroup;
  public exampleId: string;
  public submitted = false;

  public get haveChanges(): boolean {
    return this.form.dirty;
  }

  constructor(
    private readonly _examplesService: ExamplesService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _errorHandler: ErrorHandlerService,
    private readonly _notificationService: NotificationService,
    public fb: FormBuilder
  ) {
    super();

    this.form = fb.group({
      email: [
        '',
        [Validators.required, Validators.maxLength(50), AppValidators.email],
      ],
      name: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  ngOnInit() {
    this.exampleId = this._route.snapshot.paramMap.get('id');

    if (this.exampleId) {
      this.setEditMode();

      this.get(this.exampleId);
    } else {
      this.setAddMode();
    }
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const model = this.form.getRawValue();

    if (this.exampleId) {
      this.registerRequest(
        this._examplesService.update(this.exampleId, model)
      ).subscribe(
        () => {
          this.form.markAsPristine();
          this.handleSuccess();
        },
        errorResponse => {
          this._errorHandler.handle(errorResponse);
        }
      );
    } else {
      this.registerRequest(this._examplesService.save(model)).subscribe(
        () => {
          this.form.markAsPristine();
          this.handleSuccess();
        },
        errorResponse => {
          this._errorHandler.handle(errorResponse);
        }
      );
    }
  }

  private get(exampleId: string) {
    this.registerRequest(this._examplesService.get(exampleId)).subscribe({
      next: queryResult => this.form.patchValue(queryResult),
      error: errorResponse => this._errorHandler.handle(errorResponse),
    });
  }

  private back() {
    this._router.navigate(['../'], { relativeTo: this._route });
  }

  private handleSuccess(): void {
    this._notificationService.success({ key: 'app.SAVE_SUCCESS' });
    this.back();
  }
}
