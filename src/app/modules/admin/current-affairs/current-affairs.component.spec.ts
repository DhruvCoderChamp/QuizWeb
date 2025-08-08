import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentAffairsComponent } from './current-affairs.component';

describe('CurrentAffairsComponent', () => {
  let component: CurrentAffairsComponent;
  let fixture: ComponentFixture<CurrentAffairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentAffairsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentAffairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
