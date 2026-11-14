import { TestBed } from '@angular/core/testing';

import { HighestRoleService } from './highest-role.service';

describe('HighestRoleService', () => {
  let service: HighestRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighestRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
