/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlgoliaService } from './algolia.service';

describe('AlgoliaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlgoliaService]
    });
  });

  it('should ...', inject([AlgoliaService], (service: AlgoliaService) => {
    expect(service).toBeTruthy();
  }));
});
