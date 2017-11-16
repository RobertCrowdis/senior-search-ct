import { TestBed, async, inject } from '@angular/core/testing';

import { CenterGuard } from './center.guard';

describe('CenterGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CenterGuard]
    });
  });

  it('should ...', inject([CenterGuard], (guard: CenterGuard) => {
    expect(guard).toBeTruthy();
  }));
});
