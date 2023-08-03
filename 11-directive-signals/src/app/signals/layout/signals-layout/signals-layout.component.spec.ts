import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsLayoutComponent } from './signals-layout.component';

describe('SignalsLayoutComponent', () => {
  let component: SignalsLayoutComponent;
  let fixture: ComponentFixture<SignalsLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignalsLayoutComponent]
    });
    fixture = TestBed.createComponent(SignalsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
