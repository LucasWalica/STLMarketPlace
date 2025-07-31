import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlDetailComponent } from './stl-detail.component';

describe('StlDetailComponent', () => {
  let component: StlDetailComponent;
  let fixture: ComponentFixture<StlDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StlDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StlDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
