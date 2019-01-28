import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermDetailComponent } from './term-detail.component';

describe('TermDetailComponent', () => {
  let component: TermDetailComponent;
  let fixture: ComponentFixture<TermDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
