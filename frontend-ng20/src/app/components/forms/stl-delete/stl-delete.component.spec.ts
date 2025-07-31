import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlDeleteComponent } from './stl-delete.component';

describe('StlDeleteComponent', () => {
  let component: StlDeleteComponent;
  let fixture: ComponentFixture<StlDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StlDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StlDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
