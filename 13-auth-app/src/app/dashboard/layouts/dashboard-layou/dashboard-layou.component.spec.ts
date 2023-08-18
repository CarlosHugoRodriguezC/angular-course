import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLayouComponent } from './dashboard-layou.component';

describe('DashboardLayouComponent', () => {
  let component: DashboardLayouComponent;
  let fixture: ComponentFixture<DashboardLayouComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLayouComponent]
    });
    fixture = TestBed.createComponent(DashboardLayouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
