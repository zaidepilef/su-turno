import { TestBed } from '@angular/core/testing';

import { JumpService } from './jump.service';

describe('JumpService', () => {
  let service: JumpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JumpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
