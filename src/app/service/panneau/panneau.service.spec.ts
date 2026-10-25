import { TestBed } from '@angular/core/testing';

import { PanneauService } from './panneau.service';

describe('PanneauService', () => {
  let service: PanneauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanneauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
