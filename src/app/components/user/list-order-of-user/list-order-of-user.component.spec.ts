import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrderOfUserComponent } from './list-order-of-user.component';

describe('ListOrderOfUserComponent', () => {
  let component: ListOrderOfUserComponent;
  let fixture: ComponentFixture<ListOrderOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrderOfUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrderOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
