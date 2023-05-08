import { TestBed } from '@angular/core/testing';

import { TabstateService } from './tabstate.service';

describe('TabstateService', () => {
  let service: TabstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
