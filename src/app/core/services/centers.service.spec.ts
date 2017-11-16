import { TestBed, inject } from '@angular/core/testing';

import { CentersService } from './centers.service';

describe('CentersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CentersService]
    });
  });

  it('should be created', inject([CentersService], (service: CentersService) => {
    expect(service).toBeTruthy();
  }));
});
