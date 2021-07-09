import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecordDebtorComponent } from './dialog-record-debtor.component';

describe('DialogRecordDebtorComponent', () => {
  let component: DialogRecordDebtorComponent;
  let fixture: ComponentFixture<DialogRecordDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRecordDebtorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRecordDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
