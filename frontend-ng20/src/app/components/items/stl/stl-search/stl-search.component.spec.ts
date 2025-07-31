import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlSearchComponent } from './stl-search.component';

describe('StlSearchComponent', () => {
  let component: StlSearchComponent;
  let fixture: ComponentFixture<StlSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StlSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StlSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
