import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTestListComponent } from './category-test-list.component';

describe('CategoryTestListComponent', () => {
  let component: CategoryTestListComponent;
  let fixture: ComponentFixture<CategoryTestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryTestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryTestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
