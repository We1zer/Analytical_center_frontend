import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityListComponent } from './security-list.component';

describe('SecurityListComponent', () => {
  let component: SecurityListComponent;
  let fixture: ComponentFixture<SecurityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityListComponent]
    });
    fixture = TestBed.createComponent(SecurityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
