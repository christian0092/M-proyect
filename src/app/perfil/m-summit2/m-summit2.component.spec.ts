import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSummit2Component } from './m-summit2.component';

describe('MSummit2Component', () => {
  let component: MSummit2Component;
  let fixture: ComponentFixture<MSummit2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSummit2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSummit2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
