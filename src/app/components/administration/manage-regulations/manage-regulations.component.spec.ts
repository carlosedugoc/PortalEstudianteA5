import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRegulationsComponent } from './manage-regulations.component';

describe('ManageRegulationsComponent', () => {
  let component: ManageRegulationsComponent;
  let fixture: ComponentFixture<ManageRegulationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRegulationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRegulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
