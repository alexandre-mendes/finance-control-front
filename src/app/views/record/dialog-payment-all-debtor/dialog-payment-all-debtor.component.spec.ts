import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentAllDebtorComponent } from './dialog-payment-all-debtor.component';

describe('DialogPaymentAllDebtorComponent', () => {
  let component: DialogPaymentAllDebtorComponent;
  let fixture: ComponentFixture<DialogPaymentAllDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentAllDebtorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentAllDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
