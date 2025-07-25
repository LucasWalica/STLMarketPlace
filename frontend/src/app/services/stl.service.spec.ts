import { TestBed } from '@angular/core/testing';

import { StlService } from './stl.service';

describe('StlService', () => {
  let service: StlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
