import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlOwnerDetail } from './stl-owner-detail';

describe('StlOwnerDetail', () => {
  let component: StlOwnerDetail;
  let fixture: ComponentFixture<StlOwnerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StlOwnerDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StlOwnerDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
