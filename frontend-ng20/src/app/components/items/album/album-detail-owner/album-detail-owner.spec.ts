import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetailOwner } from './album-detail-owner';

describe('AlbumDetailOwner', () => {
  let component: AlbumDetailOwner;
  let fixture: ComponentFixture<AlbumDetailOwner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumDetailOwner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumDetailOwner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
