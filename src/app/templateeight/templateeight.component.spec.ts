import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateeightComponent } from './templateeight.component';

describe('TemplateeightComponent', () => {
  let component: TemplateeightComponent;
  let fixture: ComponentFixture<TemplateeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
