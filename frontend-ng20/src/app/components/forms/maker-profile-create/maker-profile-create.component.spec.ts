import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerProfileCreateComponent } from './maker-profile-create.component';

describe('MakerProfileCreateComponent', () => {
  let component: MakerProfileCreateComponent;
  let fixture: ComponentFixture<MakerProfileCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakerProfileCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakerProfileCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
