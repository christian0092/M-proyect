import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerRequestFormComponent } from './partner-request-form.component';

describe('PartnerRequestFormComponent', () => {
  let component: PartnerRequestFormComponent;
  let fixture: ComponentFixture<PartnerRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
