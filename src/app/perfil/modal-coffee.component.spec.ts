import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoffeeComponent } from './modal-coffee.component';

describe('ModalCoffeeComponent', () => {
  let component: ModalCoffeeComponent;
  let fixture: ComponentFixture<ModalCoffeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCoffeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
