import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlOnAlbumDeleteComponent } from './stl-on-album-delete.component';

describe('StlOnAlbumDeleteComponent', () => {
  let component: StlOnAlbumDeleteComponent;
  let fixture: ComponentFixture<StlOnAlbumDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StlOnAlbumDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StlOnAlbumDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
