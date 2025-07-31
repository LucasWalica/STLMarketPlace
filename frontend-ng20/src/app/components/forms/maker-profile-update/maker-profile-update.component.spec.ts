import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerProfileUpdateComponent } from './maker-profile-update.component';

describe('MakerProfileUpdateComponent', () => {
  let component: MakerProfileUpdateComponent;
  let fixture: ComponentFixture<MakerProfileUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakerProfileUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakerProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
