import { TestBed } from '@angular/core/testing';

import { AuthApiServiceTsService } from './auth-api.service.ts.service';

describe('AuthApiServiceTsService', () => {
  let service: AuthApiServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
