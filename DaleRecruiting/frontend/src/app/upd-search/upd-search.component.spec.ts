import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdSearchComponent } from './upd-search.component';

describe('UpdSearchComponent', () => {
  let component: UpdSearchComponent;
  let fixture: ComponentFixture<UpdSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
