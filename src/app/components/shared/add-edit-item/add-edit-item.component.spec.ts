import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditItemComponent } from './add-edit-item.component';

describe('AddEditItemComponent', () => {
  let component: AddEditItemComponent;
  let fixture: ComponentFixture<AddEditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
