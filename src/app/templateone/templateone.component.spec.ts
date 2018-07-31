import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateoneComponent } from './templateone.component';

describe('TemplateoneComponent', () => {
  let component: TemplateoneComponent;
  let fixture: ComponentFixture<TemplateoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
