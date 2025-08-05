import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumOwnerList } from './album-owner-list';

describe('AlbumOwnerList', () => {
  let component: AlbumOwnerList;
  let fixture: ComponentFixture<AlbumOwnerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumOwnerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumOwnerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
