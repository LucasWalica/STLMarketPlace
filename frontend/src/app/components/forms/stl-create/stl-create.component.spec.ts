import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlCreateComponent } from './stl-create.component';

describe('StlCreateComponent', () => {
  let component: StlCreateComponent;
  let fixture: ComponentFixture<StlCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StlCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StlCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
