import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitySettingsComponent } from './university-settings.component';

describe('UniversitySettingsComponent', () => {
  let component: UniversitySettingsComponent;
  let fixture: ComponentFixture<UniversitySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
