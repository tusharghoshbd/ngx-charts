import { TestBed } from '@angular/core/testing';

import { NgxChartsService } from './ngx-charts.service';

describe('NgxChartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxChartsService = TestBed.get(NgxChartsService);
    expect(service).toBeTruthy();
  });
});
