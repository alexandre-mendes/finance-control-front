import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRecordDebtorComponent } from './table-record-debtor.component';

describe('TableRecordDebtorComponent', () => {
  let component: TableRecordDebtorComponent;
  let fixture: ComponentFixture<TableRecordDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRecordDebtorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRecordDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
