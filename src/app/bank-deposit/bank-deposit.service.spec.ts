import { TestBed } from '@angular/core/testing';

import { BankDepositService } from './bank-deposit.service';

describe('BankDepositService', () => {
  let service: BankDepositService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankDepositService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
