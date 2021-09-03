import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerListHouseComponent } from './manager-list-house.component';

describe('ManagerListHouseComponent', () => {
  let component: ManagerListHouseComponent;
  let fixture: ComponentFixture<ManagerListHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerListHouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerListHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
