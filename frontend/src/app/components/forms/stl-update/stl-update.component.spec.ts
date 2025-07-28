import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlUpdateComponent } from './stl-update.component';

describe('StlUpdateComponent', () => {
  let component: StlUpdateComponent;
  let fixture: ComponentFixture<StlUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StlUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StlUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
