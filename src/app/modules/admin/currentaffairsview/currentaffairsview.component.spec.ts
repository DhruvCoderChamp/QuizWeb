import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentaffairsviewComponent } from './currentaffairsview.component';

describe('CurrentaffairsviewComponent', () => {
  let component: CurrentaffairsviewComponent;
  let fixture: ComponentFixture<CurrentaffairsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentaffairsviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentaffairsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
