import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCurrentAffairsComponent } from './user-current-affairs.component';

describe('UserCurrentAffairsComponent', () => {
  let component: UserCurrentAffairsComponent;
  let fixture: ComponentFixture<UserCurrentAffairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCurrentAffairsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCurrentAffairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
