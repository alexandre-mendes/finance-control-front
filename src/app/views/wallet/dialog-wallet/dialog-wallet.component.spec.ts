import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWalletComponent } from './dialog-wallet.component';

describe('DialogWalletComponent', () => {
  let component: DialogWalletComponent;
  let fixture: ComponentFixture<DialogWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
