import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeVisualizer } from './three-visualizer';

describe('ThreeVisualizer', () => {
  let component: ThreeVisualizer;
  let fixture: ComponentFixture<ThreeVisualizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeVisualizer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreeVisualizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
