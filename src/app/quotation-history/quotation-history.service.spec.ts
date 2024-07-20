import { TestBed } from '@angular/core/testing';

import { QuotationHistoryService } from './quotation-history.service';

describe('QuotationHistoryService', () => {
  let service: QuotationHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotationHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
