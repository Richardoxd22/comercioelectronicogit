import { TestBed } from '@angular/core/testing';

import { DeliverymodeService } from './deliverymode.service';

describe('DeliverymodeService', () => {
  let service: DeliverymodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverymodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
