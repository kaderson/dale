import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplypositionComponent } from './applyposition.component';

describe('ApplypositionComponent', () => {
  let component: ApplypositionComponent;
  let fixture: ComponentFixture<ApplypositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplypositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplypositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
