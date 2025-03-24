import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetreviewsComponent } from './getreviews.component';

describe('GetreviewsComponent', () => {
  let component: GetreviewsComponent;
  let fixture: ComponentFixture<GetreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetreviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
