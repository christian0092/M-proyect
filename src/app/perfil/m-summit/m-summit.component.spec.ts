import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSummitComponent } from './m-summit.component';

describe('MSummitComponent', () => {
  let component: MSummitComponent;
  let fixture: ComponentFixture<MSummitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSummitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSummitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
