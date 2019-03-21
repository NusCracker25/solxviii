import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshSTLComponent } from './mesh-stl.component';

describe('MeshSTLComponent', () => {
  let component: MeshSTLComponent;
  let fixture: ComponentFixture<MeshSTLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeshSTLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshSTLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
