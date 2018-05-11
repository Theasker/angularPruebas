import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular2TextMaskComponent } from './angular2-text-mask.component';

describe('Angular2TextMaskComponent', () => {
  let component: Angular2TextMaskComponent;
  let fixture: ComponentFixture<Angular2TextMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Angular2TextMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Angular2TextMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
