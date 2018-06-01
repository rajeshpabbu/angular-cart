import { TestBed, inject } from '@angular/core/testing';

import { GlobalLoaderService } from './global-loader.service';

describe('GlobalLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalLoaderService]
    });
  });

  it('should be created', inject([GlobalLoaderService], (service: GlobalLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
