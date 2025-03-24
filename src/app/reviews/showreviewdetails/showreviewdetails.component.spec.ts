import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowreviewdetailsComponent } from './showreviewdetails.component';

describe('ShowreviewdetailsComponent', () => {
  let component: ShowreviewdetailsComponent;
  let fixture: ComponentFixture<ShowreviewdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowreviewdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowreviewdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
