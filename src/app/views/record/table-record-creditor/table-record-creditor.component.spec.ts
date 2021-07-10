import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRecordCreditorComponent } from './table-record-creditor.component';

describe('TableRecordCreditorComponent', () => {
  let component: TableRecordCreditorComponent;
  let fixture: ComponentFixture<TableRecordCreditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRecordCreditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRecordCreditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
