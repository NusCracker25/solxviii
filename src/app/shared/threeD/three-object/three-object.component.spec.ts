import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeObjectComponent } from './three-object.component';

describe('ThreeObjectComponent', () => {
  let component: ThreeObjectComponent;
  let fixture: ComponentFixture<ThreeObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
