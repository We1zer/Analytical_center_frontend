import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDepositListComponent } from './bank-deposit-list.component';

describe('BankDepositListComponent', () => {
  let component: BankDepositListComponent;
  let fixture: ComponentFixture<BankDepositListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankDepositListComponent]
    });
    fixture = TestBed.createComponent(BankDepositListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
