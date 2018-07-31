import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatetwoComponent } from './templatetwo.component';

describe('TemplatetwoComponent', () => {
  let component: TemplatetwoComponent;
  let fixture: ComponentFixture<TemplatetwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatetwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
