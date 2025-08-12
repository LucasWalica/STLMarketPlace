import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlDetail } from './stl-detail';

describe('StlDetail', () => {
  let component: StlDetail;
  let fixture: ComponentFixture<StlDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StlDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StlDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
