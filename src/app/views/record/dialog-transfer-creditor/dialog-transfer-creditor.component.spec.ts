import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransferCreditorComponent } from './dialog-transfer-creditor.component';

describe('DialogTransferCreditorComponent', () => {
  let component: DialogTransferCreditorComponent;
  let fixture: ComponentFixture<DialogTransferCreditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTransferCreditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransferCreditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
