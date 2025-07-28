import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCreateComponent } from './download-create.component';

describe('DownloadCreateComponent', () => {
  let component: DownloadCreateComponent;
  let fixture: ComponentFixture<DownloadCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
