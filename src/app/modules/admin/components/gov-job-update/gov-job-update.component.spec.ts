import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovJobUpdateComponent } from './gov-job-update.component';

describe('GovJobUpdateComponent', () => {
  let component: GovJobUpdateComponent;
  let fixture: ComponentFixture<GovJobUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovJobUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovJobUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
