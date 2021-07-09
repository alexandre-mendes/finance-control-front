import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentDebtorComponent } from './dialog-payment-debtor.component';

describe('DialogPaymentDebtorComponent', () => {
  let component: DialogPaymentDebtorComponent;
  let fixture: ComponentFixture<DialogPaymentDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentDebtorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
