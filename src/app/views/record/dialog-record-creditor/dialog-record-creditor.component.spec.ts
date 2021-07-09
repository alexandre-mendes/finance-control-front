import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecordCreditorComponent } from './dialog-record-creditor.component';

describe('DialogRecordCreditorComponent', () => {
  let component: DialogRecordCreditorComponent;
  let fixture: ComponentFixture<DialogRecordCreditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRecordCreditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRecordCreditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
