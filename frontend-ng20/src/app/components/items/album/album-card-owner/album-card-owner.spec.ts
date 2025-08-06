import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCardOwner } from './album-card-owner';

describe('AlbumCardOwner', () => {
  let component: AlbumCardOwner;
  let fixture: ComponentFixture<AlbumCardOwner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumCardOwner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumCardOwner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
