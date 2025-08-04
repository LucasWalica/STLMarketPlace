import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlCard } from './stl-card';

describe('StlCard', () => {
  let component: StlCard;
  let fixture: ComponentFixture<StlCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StlCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StlCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
