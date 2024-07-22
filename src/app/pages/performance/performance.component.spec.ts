import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfomanceComponent } from './performance.component';

describe('PerfomanceComponent', () => {
  let component: PerfomanceComponent;
  let fixture: ComponentFixture<PerfomanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfomanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfomanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
