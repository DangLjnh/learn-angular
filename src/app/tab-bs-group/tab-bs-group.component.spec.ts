import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBsGroupComponent } from './tab-bs-group.component';

describe('TabBsGroupComponent', () => {
  let component: TabBsGroupComponent;
  let fixture: ComponentFixture<TabBsGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBsGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
