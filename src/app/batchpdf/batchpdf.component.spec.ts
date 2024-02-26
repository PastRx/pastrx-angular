import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchpdfComponent } from './batchpdf.component';

describe('BatchpdfComponent', () => {
  let component: BatchpdfComponent;
  let fixture: ComponentFixture<BatchpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchpdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
