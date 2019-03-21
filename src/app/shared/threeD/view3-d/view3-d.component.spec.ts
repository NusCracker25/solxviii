import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { View3DComponent } from './view3-d.component';

describe('View3DComponent', () => {
  let component: View3DComponent;
  let fixture: ComponentFixture<View3DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ View3DComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(View3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
