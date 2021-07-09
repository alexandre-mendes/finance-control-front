import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericLoginComponent } from './generic-login.component';

describe('GenericLoginComponent', () => {
  let component: GenericLoginComponent;
  let fixture: ComponentFixture<GenericLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
