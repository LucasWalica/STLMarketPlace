import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlOnAlbumCreateComponent } from './stl-on-album-create.component';

describe('StlOnAlbumCreateComponent', () => {
  let component: StlOnAlbumCreateComponent;
  let fixture: ComponentFixture<StlOnAlbumCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StlOnAlbumCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StlOnAlbumCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
