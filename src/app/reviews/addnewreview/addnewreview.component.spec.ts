import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewreviewComponent } from './addnewreview.component';

describe('AddnewreviewComponent', () => {
  let component: AddnewreviewComponent;
  let fixture: ComponentFixture<AddnewreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddnewreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
