import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRowComponent } from './item-row.component';

describe('ItemRowComponent', () => {
  let component: ItemRowComponent;
  let fixture: ComponentFixture<ItemRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
