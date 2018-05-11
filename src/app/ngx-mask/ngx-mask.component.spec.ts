import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMaskComponent } from './ngx-mask.component';

describe('NgxMaskComponent', () => {
  let component: NgxMaskComponent;
  let fixture: ComponentFixture<NgxMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
