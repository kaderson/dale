import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdPosComponent } from './upd-pos.component';

describe('UpdPosComponent', () => {
  let component: UpdPosComponent;
  let fixture: ComponentFixture<UpdPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
