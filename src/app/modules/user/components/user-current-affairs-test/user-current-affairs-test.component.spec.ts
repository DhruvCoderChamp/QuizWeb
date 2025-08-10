import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCurrentAffairsTestComponent } from './user-current-affairs-test.component';

describe('UserCurrentAffairsTestComponent', () => {
  let component: UserCurrentAffairsTestComponent;
  let fixture: ComponentFixture<UserCurrentAffairsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCurrentAffairsTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCurrentAffairsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
