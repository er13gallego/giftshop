import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleEditComponent } from './example-edit.component';

describe('ExampleEditComponent', () => {
  let component: ExampleEditComponent;
  let fixture: ComponentFixture<ExampleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
