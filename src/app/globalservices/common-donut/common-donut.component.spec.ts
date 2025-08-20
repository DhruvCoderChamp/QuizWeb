import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDonutComponent } from './common-donut.component';

describe('CommonDonutComponent', () => {
  let component: CommonDonutComponent;
  let fixture: ComponentFixture<CommonDonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDonutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
