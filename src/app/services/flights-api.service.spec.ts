import { TestBed } from '@angular/core/testing';

import { FlightsApiService } from './flights-api.service';

describe('FlightsApiService', () => {
  let service: FlightsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
