import { TestBed } from '@angular/core/testing';

import { ReviewcategoryService } from './reviewcategory.service';

describe('ReviewcategoryService', () => {
  let service: ReviewcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
