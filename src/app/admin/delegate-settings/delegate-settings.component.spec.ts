import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateSettingsComponent } from './delegate-settings.component';

describe('DelegateSettingsComponent', () => {
  let component: DelegateSettingsComponent;
  let fixture: ComponentFixture<DelegateSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
