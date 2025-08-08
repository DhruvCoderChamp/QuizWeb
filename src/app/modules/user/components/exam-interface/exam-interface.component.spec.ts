import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamInterfaceComponent } from './exam-interface.component';

describe('ExamInterfaceComponent', () => {
  let component: ExamInterfaceComponent;
  let fixture: ComponentFixture<ExamInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
