import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatefourComponent } from './templatefour.component';

describe('TemplatefourComponent', () => {
  let component: TemplatefourComponent;
  let fixture: ComponentFixture<TemplatefourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatefourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatefourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
